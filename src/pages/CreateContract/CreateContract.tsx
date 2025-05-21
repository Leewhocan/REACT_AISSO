import React from "react";
import { useForm } from "react-hook-form";
import { Button, message, Row, Col, Typography, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useCreateContractMutation } from "../../entities/Contracts/Services/ContractApi";
import { ContractEditForm } from "widgets/ContractEditForm";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice/userSlice";
import { textes } from "shared/Languages/Language";

const { Title } = Typography;

interface NewContractForm {
  title: string;
  sum: number;
  description: string;
  tnvedId: string;
  countryId: string;
}

export const ContractCreatePage: React.FC = () => {
  const [createContract, { isLoading }] = useCreateContractMutation();
  const navigate = useNavigate();
  const currentLang = useSelector(selectLanguage);
  const text = textes[currentLang];
  const { handleSubmit, control } = useForm<NewContractForm>({
    defaultValues: {
      title: "",
      sum: 0,
      description: "",
      tnvedId: "",
      countryId: "",
    },
  });

  const onSubmit = async (data: NewContractForm) => {
    try {
      const contract = await createContract(data).unwrap();
      message.success("Контракт успешно создан");
      navigate(`/contract/${contract.id}`);
    } catch (error) {
      message.error("Ошибка при создании контракта");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title
            level={3}
            style={{ margin: 0, fontSize: 24, color: "#1d1d1d" }}
          >
            {text.createNewContract}
          </Title>
        </Col>
        <Col>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            style={{ paddingLeft: 0 }}
            type="text"
          >
            {text.goBack}
          </Button>
        </Col>
      </Row>

      <Divider style={{ margin: "16px 0", borderColor: "#f0f0f0" }} />

      <ContractEditForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isLoading}
        showButton={true}
      />
    </div>
  );
};
