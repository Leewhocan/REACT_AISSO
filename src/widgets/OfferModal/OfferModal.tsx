import React, { useState } from "react";
import { Modal, Form, InputNumber, Button, message } from "antd";
import { EuroOutlined } from "@ant-design/icons";

interface IcreateAgreementData {
  contractId: number;
  importerId: number;
  offerPrice: number;
}

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

interface OfferModalProps {
  contract: Contract;
  visible: boolean;
  onCancel: () => void;
  onSubmit: (body: IcreateAgreementData) => Promise<void> | void;
}

interface FormValues {
  amount: number;
}

export const OfferModal: React.FC<OfferModalProps> = ({
  contract,
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const createAgreementData = {
        contractId: contract.id,
        importerId: contract.authorId,
        offerPrice: values.amount,
      };
      await onSubmit(createAgreementData);
      message.success("Коммерческое предложение успешно отправлено!");
      onCancel();
    } catch (error) {
      console.error("Ошибка:", error);
      message.error("Не удалось отправить предложение");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <span>
          <EuroOutlined style={{ color: "#1890ff", marginRight: 8 }} />
          Коммерческое предложение для контракта #{contract.id}
        </span>
      }
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Отмена
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Отправить предложение
        </Button>,
      ]}
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item<FormValues>
          name="amount"
          label="Сумма предложения"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите сумму",
            },
            {
              type: "number",
              min: 1,
              message: "Сумма должна быть больше 0",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Введите сумму в долларах"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }
            parser={(value) => value.replace(/\$\s?|(\s*)/g, "")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
