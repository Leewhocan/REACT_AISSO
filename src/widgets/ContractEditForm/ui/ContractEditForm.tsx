import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Card,
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

import {
  useGetCountryQuery,
  useGetTnvedQuery,
} from "../../../entities/Filters/Services/FilterApi";
import { CreateContractButton } from "features/createContractButton";
import { ContractEditFormProps } from "../libs/types";
import { ITnved, ITnvedExtended } from "shared/libs";
import { textes } from "shared/Languages/Language";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../../redux/userSlice/userSlice";

const { Title, Text } = Typography;
const { TextArea } = Input;

export const ContractEditForm = ({
  control,
  handleSubmit,
  onSubmit,
  isLoading,
  showButton,
}: ContractEditFormProps) => {
  const currentLang = useSelector(selectLanguage);
  const text = textes[currentLang];
  const [tnvedLists, setTnvedLists] = useState<ITnved[]>([]);
  const [countryLists, setCountryLists] = useState<ITnvedExtended[]>([]);
  const { data: tnvedList = [], isLoading: isTnvedsLoading } =
    useGetTnvedQuery();
  const { data: countryList = [], isLoading: isCountryLoading } =
    useGetCountryQuery();

  useEffect(() => {
    if (tnvedList && Array.isArray(tnvedList)) {
      setTnvedLists(tnvedList);
    }
    if (countryList && Array.isArray(countryList)) {
      setCountryLists(countryList);
    }
  }, [isTnvedsLoading, isCountryLoading]);

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
                  {text.basicInfo}
                </Title>

                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: text.requiredField,
                    pattern: {
                      value:
                        /^[A-Za-z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
                      message: text.messageEn,
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Form.Item
                      label={<Text strong>{text.ContractName}</Text>}
                      validateStatus={fieldState.error ? "error" : ""}
                      help={fieldState.error?.message}
                      style={{ marginBottom: 24 }}
                    >
                      <Input
                        {...field}
                        placeholder={text.messageEn}
                        size="large"
                        allowClear
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /[^A-Za-z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g,
                            ""
                          );
                        }}
                      />
                    </Form.Item>
                  )}
                />

                <Controller
                  name="sum"
                  control={control}
                  rules={{ required: text.requiredField }}
                  render={({ field, fieldState }) => (
                    <Form.Item
                      label={<Text strong>{text.contractSum}</Text>}
                      validateStatus={fieldState.error ? "error" : ""}
                      help={fieldState.error?.message}
                      style={{ marginBottom: 24 }}
                    >
                      <InputNumber
                        {...field}
                        style={{ width: "100%" }}
                        size="large"
                        min={0}
                        step={100000}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        }
                        addonAfter={<Text style={{ color: "#8c8c8c" }}>$</Text>}
                      />
                    </Form.Item>
                  )}
                />
              </div>
            </Col>

            <Col span={12}>
              <div style={{ marginBottom: 32 }}>
                <Title level={5} style={{ marginBottom: 16, color: "#595959" }}>
                  {text.additionalInfo}
                </Title>

                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: text.requiredField,
                    pattern: {
                      value:
                        /^[A-Za-z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
                      message: text.messageEn,
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Form.Item
                      label={<Text strong>{text.contractDescription}</Text>}
                      validateStatus={fieldState.error ? "error" : ""}
                      help={fieldState.error?.message}
                      style={{ marginBottom: 24 }}
                    >
                      <TextArea
                        {...field}
                        rows={5}
                        placeholder={text.messageEn}
                        size="large"
                        showCount
                        maxLength={1000}
                        style={{ resize: "none" }}
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /[^A-Za-z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g,
                            ""
                          );
                        }}
                      />
                    </Form.Item>
                  )}
                />

                <Controller
                  name="tnvedId"
                  control={control}
                  rules={{ required: text.requiredField }}
                  render={({ field, fieldState }) => (
                    <Form.Item
                      label={<Text strong>{text.tnvedProduct}</Text>}
                      validateStatus={fieldState.error ? "error" : ""}
                      help={fieldState.error?.message}
                      style={{ marginBottom: 24 }}
                    >
                      <TreeSelect
                        {...field}
                        treeNodeFilterProp="search"
                        showSearch
                        size="large"
                        dropdownStyle={{
                          maxHeight: 400,
                          overflow: "auto",
                          borderRadius: 8,
                        }}
                        style={{ width: "100%" }}
                        treeData={tnvedList.map((tnved) => ({
                          value: tnved.value,
                          title:
                            currentLang === "RU"
                              ? tnved.title
                              : currentLang === "EN"
                              ? tnved.titleEn
                              : tnved.titleCn,
                          search: tnved.search,
                          disabled: tnved.disabled,
                        }))}
                      />
                    </Form.Item>
                  )}
                />

                <Controller
                  name="countryId"
                  control={control}
                  rules={{ required: text.requiredField }}
                  render={({ field, fieldState }) => (
                    <Form.Item
                      label={<Text strong>{text.counterpartyCountry}</Text>}
                      validateStatus={fieldState.error ? "error" : ""}
                      help={fieldState.error?.message}
                      style={{ marginBottom: 24 }}
                    >
                      <TreeSelect
                        {...field}
                        treeNodeFilterProp="search"
                        showSearch
                        size="large"
                        dropdownStyle={{
                          maxHeight: 400,
                          overflow: "auto",
                          borderRadius: 8,
                        }}
                        style={{ width: "100%" }}
                        treeData={countryList.map((country) => ({
                          value: country.value,
                          title:
                            currentLang === "RU"
                              ? country.title
                              : currentLang === "EN"
                              ? country.titleEn
                              : country.titleCn,
                          search: country.search,
                          disabled: country.disabled,
                        }))}
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
              <CreateContractButton
                isLoading={isLoading}
                text={text.createContract}
              />
            </Row>
          )}
        </Form>
      </Card>
    </Spin>
  );
};
