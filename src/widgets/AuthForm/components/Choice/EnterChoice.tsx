import { Button } from "antd";
import { FormCard } from "../../../../shared/Card/Card";
import styles from "./EnterChoice.module.scss";
import { AuthType, IselectedLanguage } from "../types/types";
import { textes } from "../../../../shared/Languages/Language";
interface IEnterChoice {
  enterType: (arg0: AuthType) => void;
  selectedLanguage: IselectedLanguage;
}
export const EnterChoice = ({ enterType, selectedLanguage }: IEnterChoice) => {
  return (
    <FormCard title={textes[selectedLanguage].enterTitle}>
      <div className={styles.buttonsContainer}>
        <Button
          type="primary"
          size="large"
          className={styles.loginButton}
          onClick={() => enterType("login")}
        >
          {textes[selectedLanguage].loginButton}
        </Button>
        <Button
          type="default"
          size="large"
          className={styles.authButton}
          onClick={() => enterType("auth")}
        >
          {textes[selectedLanguage].registerButton}
        </Button>
      </div>
    </FormCard>
  );
};
