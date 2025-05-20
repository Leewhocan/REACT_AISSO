import { Input } from "antd";
import { FormCard } from "../../../../shared/Card/Card";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import { Controller, Control, FieldErrors } from "react-hook-form";
import { IFormInput, IselectedLanguage } from "../types/types";
import { textes } from "../../../../shared/Languages/Language";
interface ILogin {
  control: Control<IFormInput>;
  selectedLanguage: IselectedLanguage;
  errors: FieldErrors<IFormInput>;
}
export const Login = ({ control, selectedLanguage, errors }: ILogin) => {
  return (
    <FormCard title={textes[selectedLanguage].loginTitle}>
      <Controller
        rules={{ required: true }}
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder={
              errors.email
                ? "Поле обязательно"
                : textes[selectedLanguage].emailPlaceholder
            }
            prefix={<UserOutlined />}
            size="large"
            style={{ marginBottom: 16 }}
            status={errors.email ? "error" : ""}
          />
        )}
      />
      <Controller
        rules={{ required: true }}
        name="password"
        control={control}
        render={({ field }) => (
          <Input.Password
            {...field}
            placeholder={
              errors.password
                ? "Поле обязательно"
                : textes[selectedLanguage].passwordPlaceholder
            }
            prefix={<LockOutlined />}
            size="large"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            status={errors.password ? "error" : ""}
          />
        )}
      />
    </FormCard>
  );
};
