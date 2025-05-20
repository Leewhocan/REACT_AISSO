import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  Button,
  Descriptions,
  Modal,
  message,
  Row,
  Spin,
  Typography,
  Result,
  Space,
  Tag,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  DollarCircleFilled,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import {
  useDeleteContractMutation,
  useGetByIdQuery,
  useUpdateContractMutation,
} from "../../entities/Contracts/Services/ContractApi";
import { ContractEditForm } from "../../widgets/ContractEditForm/ContractEditForm";
import { country, tnveds } from "../../assets/x";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice/userSlice";
import { OfferModal } from "../../widgets/OfferModal/OfferModal";
import {
  useCancelAgreementMutation,
  useCreateAgreementMutation,
  useGetByExporterMutation,
  useGetByImporterMutation,
  useSubAgreementMutation,
} from "../../entities/Agreement/Services/AgreementApi";
import { ContractList } from "../../widgets/Agreements/Agreement";
const { Title, Text } = Typography;

interface Contract {
  id: number;
  authorId: number;
  title: string;
  sum: number;
  description: string;
  tnvedId: string;
  countryId: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
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

export const ContractPage: React.FC = () => {
  const { id } = useParams();
  const [createTrigger] = useCreateAgreementMutation();
  const [deleteTrigger] = useDeleteContractMutation();
  const [update] = useUpdateContractMutation();
  const [getAgreements, { data: agreementsExporter = [] }] =
    useGetByExporterMutation();
  const [getAgreementsOnImporter, { data: agreementsImporter = [] }] =
    useGetByImporterMutation();
  const [subAgreement] = useSubAgreementMutation();
  const [cancelAgreement] = useCancelAgreementMutation();
  const user = useSelector(selectUser);
  const {
    data: contractData,
    isLoading: isDataLoading,
    isError,
  } = useGetByIdQuery(id);
  const [contract, setContract] = useState<Contract | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isOfferModalVisible, setIsOfferModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onAccept = async (data) => {
    // console.log(data);
    await subAgreement(data);
  };
  const onReject = async (data) => {
    // console.log(data);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleOfferSubmit = async (data: IcreateAgreementData) => {
    try {
      // console.log(data);
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
          Детали контракта #{contract.id}
        </Title>
        {user.role === "IMPORTER" && user.id === contractData.authorId && (
          <div>
            {!isEditing ? (
              <Space>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                >
                  Редактировать
                </Button>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => setIsDeleteModalVisible(true)}
                >
                  Удалить
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
                  Сохранить
                </Button>
                <Button
                  icon={<CloseOutlined />}
                  onClick={handleCancelEdit}
                  disabled={isSubmitting}
                >
                  Отмена
                </Button>
              </Space>
            )}
          </div>
        )}
      </Row>

      <Spin spinning={isSubmitting} tip="Сохранение изменений...">
        <Card
          bordered={false}
          style={{
            borderRadius: 8,
            boxShadow:
              "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
          }}
        >
          {!isEditing ? (
            <Descriptions
              bordered
              column={1}
              layout="vertical"
              labelStyle={{ fontWeight: 500 }}
              contentStyle={{ padding: "12px 24px" }}
            >
              <Descriptions.Item label="Название">
                <Text strong>{contract.title}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Сумма">
                <Text style={{ color: "#389e0d" }}>
                  {new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    minimumFractionDigits: 0,
                  }).format(contract.sum)}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Описание">
                <Text style={{ whiteSpace: "pre-line" }}>
                  {contract.description}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Код ТН ВЭД">
                {tnveds.find((c) => c.value === contract.tnvedId)?.title ||
                  contract.tnvedId}
              </Descriptions.Item>
              <Descriptions.Item label="Страна">
                {country.find((c) => c.value === contract.countryId)?.title ||
                  contract.countryId}
              </Descriptions.Item>
              <Descriptions.Item label="Статус">
                <Tag color={contract.status === "INWAIT" ? "orange" : "green"}>
                  {contract.status === "INWAIT" ? "На рассмотрении" : "Активен"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Дата создания">
                {formatDate(contract.createdAt)}
              </Descriptions.Item>
              <Descriptions.Item label="Дата обновления">
                {formatDate(contract.updatedAt)}
              </Descriptions.Item>
            </Descriptions>
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
            Коммерческое предложение
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
            Подтверждение удаления
          </span>
        }
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Удалить"
        cancelText="Отмена"
        confirmLoading={isSubmitting}
        okButtonProps={{ danger: true }}
        centered
      >
        <Text>
          Вы уверены, что хотите удалить контракт
          <Text strong>«{contract.title}»</Text>?
        </Text>
        <Text type="danger" style={{ display: "block", marginTop: 8 }}>
          Это действие нельзя отменить. Все данные контракта будут безвозвратно
          удалены.
        </Text>
      </Modal>
      {(user.id === contract.authorId || user.role === "EXPORTER") && (
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
