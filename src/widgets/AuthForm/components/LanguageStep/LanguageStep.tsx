import { useState } from "react";
import { RU, GB, CN } from "country-flag-icons/react/1x1";
import { Typography, Flex, theme } from "antd";
import { FormCard } from "../../../../shared/Card/Card";
import { Controller, Control } from "react-hook-form";
import { IFormInput } from "../types/types";
interface ILanguageStep {
  next: () => void;
  control?: Control<IFormInput>;
}

export const LanguageStep = ({ next, control }: ILanguageStep) => {
  const [selectedLang, setSelectedLang] = useState("RU");
  const { useToken } = theme;
  const { token } = useToken();
  const onClickHandler = (code: string) => {
    setSelectedLang(code);
    next();
  };

  const languages = [
    { code: "RU", Component: RU, label: "Русский" },
    { code: "EN", Component: GB, label: "English" },
    { code: "CN", Component: CN, label: "中文" },
  ];
  return (
    <FormCard title={"Выберите язык / Choose Language / 选择一种语言"}>
      <Flex gap="large" justify="space-around" align="center">
        {languages.map(({ code, Component, label }) => (
          <Controller
            rules={{ required: true }}
            name="language"
            control={control}
            render={({ field }) => (
              <Flex
                {...field}
                key={code}
                vertical
                align="center"
                gap="small"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  field.onChange(code);
                  onClickHandler(code);
                }}
              >
                <Component
                  title={label}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "8px",
                    border: `2px solid ${
                      selectedLang === code ? token.colorPrimary : "#e8e8e8"
                    }`,
                    transition: "all 0.2s ease",
                    transform:
                      selectedLang === code ? "scale(1.05)" : "scale(1)",
                    objectFit: "cover",
                    padding: "4px",
                  }}
                />
                <Typography.Text
                  strong
                  style={{
                    color:
                      selectedLang === code
                        ? token.colorPrimary
                        : token.colorTextSecondary,
                    transition: "color 0.2s ease",
                  }}
                >
                  {label}
                </Typography.Text>
              </Flex>
            )}
          />
        ))}
      </Flex>
    </FormCard>
  );
};
