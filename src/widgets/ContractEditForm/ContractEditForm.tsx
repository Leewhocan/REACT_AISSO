import React from "react";
import { Control, Controller, SubmitHandler } from "react-hook-form";
import {
  Card,
  Button,
  Row,
  Col,
  Input,
  InputNumber,
  TreeSelect,
  Form,
  Spin,
  Typography,
  Divider,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import {
  useGetCountryQuery,
  useGetTnvedQuery,
} from "../../entities/Filters/Services/FilterApi";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface NewContractForm {
  title: string;
  sum: number;
  description: string;
  tnvedId: string;
  countryId: string;
  image: string;
}

interface ContractEditFormProps {
  control: Control<NewContractForm>;
  handleSubmit: (
    onSubmit: SubmitHandler<NewContractForm>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<NewContractForm>;
  isLoading?: boolean;
  showButton: boolean;
}

export const ContractEditForm = ({
  control,
  handleSubmit,
  onSubmit,
  isLoading,
  showButton,
}: ContractEditFormProps) => {
  const { data: tnvedList = [] } = useGetTnvedQuery();
  const { data: countryList = [] } = useGetCountryQuery();

  return (
    <Spin spinning={isLoading}>
      <Card
        bordered={false}
        style={{
          borderRadius: 8,
          boxShadow:
            "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)",
        }}
      >
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={32}>
            <Col span={12}>
              <div style={{ marginBottom: 32 }}>
                <Title level={5} style={{ marginBottom: 16, color: "#595959" }}>
                  Основная информация
                </Title>

                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Обязательное поле" }}
                  render={({ field, fieldState }) => (
                    <Form.Item
                      label={<Text strong>Название контракта</Text>}
                      validateStatus={fieldState.error ? "error" : ""}
                      help={fieldState.error?.message}
                      style={{ marginBottom: 24 }}
                    >
                      <Input
                        {...field}
                        placeholder="Введите название"
                        size="large"
                        allowClear
                      />
                    </Form.Item>
                  )}
                />

                <Controller
                  name="sum"
                  control={control}
                  rules={{ required: "Обязательное поле" }}
                  render={({ field, fieldState }) => (
                    <Form.Item
                      label={<Text strong>Сумма контракта</Text>}
                      validateStatus={fieldState.error ? "error" : ""}
                      help={fieldState.error?.message}
                      style={{ marginBottom: 24 }}
                    >
                      <InputNumber
                        {...field}
                        style={{ width: "100%" }}
                        size="large"
                        min={0}
                        step={1000}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        }
                        addonAfter={<Text style={{ color: "#8c8c8c" }}>₽</Text>}
                      />
                    </Form.Item>
                  )}
                />
              </div>
            </Col>

            <Col span={12}>
              <div style={{ marginBottom: 32 }}>
                <Title level={5} style={{ marginBottom: 16, color: "#595959" }}>
                  Дополнительная информация
                </Title>

                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Обязательное поле" }}
                  render={({ field, fieldState }) => (
                    <Form.Item
                      label={<Text strong>Описание контракта</Text>}
                      validateStatus={fieldState.error ? "error" : ""}
                      help={fieldState.error?.message}
                      style={{ marginBottom: 24 }}
                    >
                      <TextArea
                        {...field}
                        rows={5}
                        placeholder="Опишите условия и детали контракта"
                        size="large"
                        showCount
                        maxLength={1000}
                        style={{ resize: "none" }}
                      />
                    </Form.Item>
                  )}
                />

                <Controller
                  name="tnvedId"
                  control={control}
                  rules={{ required: "Обязательное поле" }}
                  render={({ field, fieldState }) => (
                    <Form.Item
                      label={<Text strong>Товар по ТН ВЭД</Text>}
                      validateStatus={fieldState.error ? "error" : ""}
                      help={fieldState.error?.message}
                      style={{ marginBottom: 24 }}
                    >
                      <TreeSelect
                        {...field}
                        treeData={tnvedList}
                        placeholder="Выберите товар"
                        treeNodeFilterProp="search"
                        showSearch
                        size="large"
                        dropdownStyle={{
                          maxHeight: 400,
                          overflow: "auto",
                          borderRadius: 8,
                        }}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  )}
                />

                <Controller
                  name="countryId"
                  control={control}
                  rules={{ required: "Обязательное поле" }}
                  render={({ field, fieldState }) => (
                    <Form.Item
                      label={<Text strong>Страна контрагента</Text>}
                      validateStatus={fieldState.error ? "error" : ""}
                      help={fieldState.error?.message}
                      style={{ marginBottom: 24 }}
                    >
                      <TreeSelect
                        {...field}
                        treeData={countryList}
                        placeholder="Выберите страну"
                        treeNodeFilterProp="search"
                        showSearch
                        size="large"
                        dropdownStyle={{
                          maxHeight: 400,
                          overflow: "auto",
                          borderRadius: 8,
                        }}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  )}
                />
              </div>
            </Col>
          </Row>

          <Divider style={{ margin: "32px 0" }} />
          {showButton && (
            <Row justify="end">
              <Button
                type="primary"
                size="large"
                icon={<SaveOutlined />}
                htmlType="submit"
                loading={isLoading}
                style={{
                  width: 240,
                  height: 48,
                  fontSize: 16,
                  borderRadius: 4,
                }}
              >
                Создать контракт
              </Button>
            </Row>
          )}
        </Form>
      </Card>
    </Spin>
  );
};
