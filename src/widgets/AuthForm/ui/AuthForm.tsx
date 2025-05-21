import { useState } from "react";
import { Steps, Button } from "antd";
import { LanguageStep } from "../components/LanguageStep/LanguageStep";
import { EnterChoice } from "../components/Choice/EnterChoice";
import styles from "./AuthForm.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthType, IAuthForm, IFormInput } from "../components/types/types";
import { Login } from "../components/Login/Login";
import { Auth } from "../components/Auth/Auth";
import { textes } from "../../../shared/Languages/Language";
import { useNavigate } from "react-router";
import {
  useAuthMutation,
  useLoginMutation,
} from "../../../entities/Auth/Services/UserApi";
import { setToken } from "../../../shared/helpers/helper";
import { showErrorToast } from "../../../shared/components/toast/ErrorToast";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice/userSlice";
const steps = [{ title: "" }, { title: "" }, { title: "" }];

export const AuthForm = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      language: "RU",
      email: "",
      password: "",
      name: "",
    },
  });
  const [login] = useLoginMutation();
  const [auth] = useAuthMutation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [authType, setAuthType] = useState<AuthType>("auth");

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
    resetField("name");
    resetField("email");
    resetField("password");
  };
  const selectedLanguage = watch("language");

  const handleEnterType = (type: AuthType) => {
    setAuthType(type);
    handleNext();
  };
  const onSubmitHandler: SubmitHandler<IFormInput> = async (formData) => {
    const updatedForm: IAuthForm = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.language === "RU" ? "EXPORTER" : "IMPORTER",
    };
    try {
      if (formData?.name) {
        const result = await auth(updatedForm).unwrap();
        dispatch(setUser(result));
        setToken(result.acseesToken);
        navigate("/home");
      } else {
        const result = await login(updatedForm).unwrap();
        dispatch(setUser(result));
        setToken(result.acseesToken);
        navigate("/home");
      }
      localStorage.setItem("lan", selectedLanguage);
    } catch (error) {
      console.error("Ошибка:", error);
      showErrorToast(`Ошибка ${error}`, {
        position: "top-center",
        autoClose: 8000,
      });
    }
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <LanguageStep next={handleNext} control={control} />;
      case 1:
        return (
          <EnterChoice
            enterType={handleEnterType}
            selectedLanguage={selectedLanguage}
          />
        );
      case 2:
        return authType === "auth" ? (
          <Auth
            selectedLanguage={selectedLanguage}
            control={control}
            errors={errors}
          />
        ) : (
          <Login
            control={control}
            selectedLanguage={selectedLanguage}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.authFormContainer}>
      <div className={styles.stepsContainer}>
        <Steps items={steps} current={currentStep} className={styles.steps} />
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={styles.contentContainer}>{renderStepContent()}</div>

        <div className={styles.buttonsContainer}>
          {currentStep > 0 && (
            <Button className={styles.prevButton} onClick={() => handlePrev()}>
              {textes[selectedLanguage].backButton}
            </Button>
          )}
          {currentStep === 2 && (
            <Button
              type="primary"
              htmlType="submit"
              className={styles.nextButton}
            >
              {textes[selectedLanguage].submitButton}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
