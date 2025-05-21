import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  Button,
  Modal,
  message,
  Row,
  Spin,
  Typography,
  Result,
  Space,
  Collapse,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  DollarCircleFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import {
  useDeleteContractMutation,
  useGetByIdQuery,
  useUpdateContractMutation,
} from "../../entities/Contracts/Services/ContractApi";
import { ContractEditForm } from "widgets/ContractEditForm";

import { useSelector } from "react-redux";
import { selectLanguage, selectUser } from "../../redux/userSlice/userSlice";
import { OfferModal } from "../../widgets/OfferModal/OfferModal";
import {
  useCancelAgreementMutation,
  useCreateAgreementMutation,
  useGetByExporterMutation,
  useGetByImporterMutation,
  useSubAgreementMutation,
} from "../../entities/Agreement/Services/AgreementApi";
import { ContractList } from "../../widgets/Agreements/Agreement";
import { IContract } from "shared/libs";
import { ContractDescription } from "widgets/ContractDescription";
import { textes } from "shared/Languages/Language";
import { country, tnveds } from "../../assets/x";
const { Title, Text } = Typography;

interface IcreateAgreementData {
  contractId: number;
  importerId: number;
  offerPrice: number;
}

interface EditContractForm {
  title: string;
  sum: number;
  description: string;
  tnvedId: string;
  countryId: string;
  image: string;
}
const { Panel } = Collapse;
export const ContractPage: React.FC = () => {
  const currentLang = useSelector(selectLanguage);
  const text = textes[currentLang];
  const { id } = useParams();
  const [createTrigger, { isLoading: isCreateAgreementLoading }] =
    useCreateAgreementMutation();
  const [deleteTrigger] = useDeleteContractMutation();
  const [update] = useUpdateContractMutation();
  const [getAgreements, { data: agreementsExporter = [] }] =
    useGetByExporterMutation();
  const [getAgreementsOnImporter, { data: agreementsImporter = [] }] =
    useGetByImporterMutation();
  const [subAgreement, { isLoading: isSubAgreementLoading }] =
    useSubAgreementMutation();
  const [cancelAgreement, { isLoading: isCancelAgreementLoading }] =
    useCancelAgreementMutation();
  const user = useSelector(selectUser);
  const {
    data: contractData,
    isLoading: isDataLoading,
    isError,
    refetch,
  } = useGetByIdQuery(id);
  const [contract, setContract] = useState<IContract | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isOfferModalVisible, setIsOfferModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onAccept = async (data) => {
    await subAgreement(data);
  };
  const onReject = async (data) => {
    cancelAgreement(data);
  };
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<EditContractForm>();

  useEffect(() => {
    if (contractData) {
      setContract(contractData);
      reset({
        title: contractData.title,
        sum: contractData.sum,
        description: contractData.description,
        tnvedId: contractData.tnvedId,
        countryId: contractData.countryId,
        image: contractData.image,
      });
    }
  }, [contractData, reset]);

  useEffect(() => {
    if (contractData?.id) {
      if (user.role === "EXPORTER") {
        getAgreements({ contractId: contractData.id });
      }
      if (user.role === "IMPORTER") {
        getAgreementsOnImporter({ contractId: contractData.id });
      }
    }
  }, [user, contractData]);

  useEffect(() => {
    if (!isCreateAgreementLoading) {
      refetch();
    }
    if (contractData?.id) {
      if (user.role === "EXPORTER") {
        getAgreements({ contractId: contractData.id });
      }
      if (user.role === "IMPORTER") {
        getAgreementsOnImporter({ contractId: contractData.id });
      }
    }
  }, [
    isCreateAgreementLoading,
    refetch,
    isCancelAgreementLoading,
    isSubAgreementLoading,
    user.role,
    getAgreements,
    getAgreementsOnImporter,
    isSubAgreementLoading,
  ]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    reset({
      title: contract?.title,
      sum: contract?.sum,
      description: contract?.description,
      tnvedId: contract?.tnvedId,
      countryId: contract?.countryId,
      image: contract?.image,
    });
  };

  const onSubmit = async (data: EditContractForm) => {
    setIsSubmitting(true);
    try {
      const updatedContract = {
        id: Number(id),
        ...data,
      };
      const newInfoContract = await update(updatedContract);
      console.log(newInfoContract);
      setContract(newInfoContract.data);
      setIsEditing(false);
      message.success("Контракт успешно обновлен");
    } catch (error) {
      message.error("Ошибка при обновлении контракта");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteTrigger({ id: Number(id) });
      navigate("/home");
    } catch (error) {
      message.error("Ошибка при удалении контракта");
    } finally {
      setIsSubmitting(false);
      setIsDeleteModalVisible(false);
    }
  };

  const handleOfferSubmit = async (data: IcreateAgreementData) => {
    try {
      await createTrigger(data);
      navigate(".", { replace: true });
    } catch (error) {
      console.error("Ошибка при создании предложения:", error);
    }
  };

  if (isDataLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <Spin size="large" tip="Загрузка данных контракта..." />
      </div>
    );
  }

  if (isError || !contract) {
    return (
      <div style={{ padding: "24px" }}>
        <Result
          status="404"
          title="Контракт не найден"
          subTitle={`Контракт с ID ${id} не существует или был удален`}
          extra={
            <Button type="primary" onClick={() => navigate("/home")}>
              Вернуться к списку контрактов
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "24px" }}
      >
        <Title level={2} style={{ marginBottom: 0 }}>
          {text.contractDetails}: {contract.title}
        </Title>
        {user.role === "IMPORTER" &&
          user.id === contractData.authorId &&
          contract.status !== "DONE" && (
            <div>
              {!isEditing ? (
                <Space>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={handleEdit}
                  >
                    {text.edit}
                  </Button>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => setIsDeleteModalVisible(true)}
                  >
                    {text.delete}
                  </Button>
                </Space>
              ) : (
                <Space>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSubmit(onSubmit)}
                    loading={isSubmitting}
                  >
                    {text.save}
                  </Button>
                  <Button
                    icon={<CloseOutlined />}
                    onClick={handleCancelEdit}
                    disabled={isSubmitting}
                  >
                    {text.cancel}
                  </Button>
                </Space>
              )}
            </div>
          )}
      </Row>

      <Spin spinning={isSubmitting} tip={text.savingChanges}>
        <Card
          bordered={false}
          style={{
            borderRadius: 8,
            boxShadow:
              "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
          }}
        >
          {!isEditing ? (
            <ContractDescription contract={contract} />
          ) : (
            <ContractEditForm
              control={control}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              isLoading={false}
              showButton={false}
            />
          )}
        </Card>
      </Spin>
      {user.role === "EXPORTER" && agreementsExporter.length === 0 && (
        <Row justify="end">
          <Button
            type="primary"
            icon={<DollarCircleFilled />}
            onClick={() => setIsOfferModalVisible(true)}
            style={{ background: "#52c41a", borderColor: "#52c41a" }}
          >
            {text.commercialOffer}
          </Button>
        </Row>
      )}

      <OfferModal
        contract={contract}
        visible={isOfferModalVisible}
        onCancel={() => setIsOfferModalVisible(false)}
        onSubmit={handleOfferSubmit}
      />
      <Modal
        title={
          <span>
            <ExclamationCircleOutlined
              style={{ color: "#ff4d4f", marginRight: 8 }}
            />
            {text.deleteConfirmation}
          </span>
        }
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText={text.delete}
        cancelText={text.cancel}
        confirmLoading={isSubmitting}
        okButtonProps={{ danger: true }}
        centered
      >
        <Text>
          {text.deleteConfirmMessage}
          <Text strong>«{contract.title}»</Text>?
        </Text>
        <Text type="danger" style={{ display: "block", marginTop: 8 }}>
          {text.deleteWarning}
        </Text>
      </Modal>
      {user.role === "EXPORTER" && (
        <Collapse bordered={false} expandIconPosition="end" ghost>
          <Panel
            key="hint"
            header={
              <>
                <InfoCircleOutlined style={{ marginRight: 8 }} />
                <Text type="secondary">Подскзка по стране</Text>
              </>
            }
          >
            <Text>
              {country.find((c) => c.value === contract.countryId)?.desc}
            </Text>
          </Panel>
        </Collapse>
      )}

      {(user.id === contract.authorId || user.role === "EXPORTER") &&
        !isEditing && (
          <ContractList
            userRole={user.role}
            onAccept={onAccept}
            agreements={agreementsExporter}
            agreementsImporter={agreementsImporter}
            onReject={onReject}
          />
        )}
    </div>
  );
};
