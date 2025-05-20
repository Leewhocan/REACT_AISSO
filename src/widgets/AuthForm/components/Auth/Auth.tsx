import { Input, Typography, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { FormCard } from "../../../../shared/Card/Card";
import { IFormInput, IselectedLanguage } from "../types/types";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { textes } from "../../../../shared/Languages/Language";
import styles from "./Auth.module.scss";
interface IAuth {
  control: Control<IFormInput>;
  selectedLanguage: IselectedLanguage;
  errors: FieldErrors<IFormInput>;
}
const { Text } = Typography;

export const Auth = ({ selectedLanguage, control, errors }: IAuth) => {
  const t = textes[selectedLanguage];
  const role = t.role;
  return (
    <FormCard title={t.authTitle}>
      <div className={styles.formContainer}>
        <div className={styles.formItem} style={{ marginBottom: 16 }}>
          <label className={styles.label}>{t.companyName}</label>
          <Controller
            rules={{ required: true }}
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                size="large"
                {...field}
                placeholder={
                  errors.name ? "Поле обязательно" : t.companyPlaceholder
                }
                status={errors.name ? "error" : ""}
              />
            )}
          />
        </div>

        {/* Поле email */}
        <div className={styles.formItem} style={{ marginBottom: 16 }}>
          <div className={styles.labelWithTooltip}>
            <label className={styles.label}>{t.commonEmail}</label>
            <Tooltip title={t.emailTooltip}>
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          </div>
          <Controller
            rules={{ required: true }}
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                size="large"
                {...field}
                placeholder={
                  errors.email ? "Поле обязательно" : 'example@company.com"'
                }
                status={errors.email ? "error" : ""}
              />
            )}
          />
        </div>

        {/* Поле пароля */}
        <div className={styles.formItem} style={{ marginBottom: 8 }}>
          <div className={styles.labelWithTooltip}>
            <label className={styles.label}>{t.commonPassword}</label>
            <Tooltip title={t.passwordTooltip}>
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          </div>
          <Controller
            rules={{ required: true }}
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                size="large"
                {...field}
                placeholder={
                  errors.password ? "Поле обязательно" : t.passwordPlaceholder
                }
                status={errors.password ? "error" : ""}
              />
            )}
          />
        </div>

        {/* Текст о роли */}
        <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
          {t.roleText(role)}
        </Text>
      </div>
    </FormCard>
  );
};
