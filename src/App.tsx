import { Routes, Route } from "react-router";
import { AuthPage } from "./pages/AuthPage";
import { HomePage } from "./pages/Home/HomePage";
import styles from "./App.module.scss";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useLazyGetMeQuery } from "./entities/Auth/Services/UserApi";
import { useEffect } from "react";
// import { ErrorToastContainer } from "./shared/components/toast/ErrorToast";
import { ContractPage } from "./pages/ContractPage/ContractPage";
import { ContractCreatePage } from "./pages/CreateContract/CreateContract";
import { AppHeader } from "./widgets/Header/Header";
import { getToken, removeToken } from "./shared/helpers/helper";
import { ImporterPage } from "./pages/ImporterPage/ImporterPage";
import { setUser } from "./redux/userSlice/userSlice";
function App() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const token = getToken();
  const [trigger, { data: userData, isLoading, isError }] = useLazyGetMeQuery();
  useEffect(() => {
    if (!token) {
      navigate("/auth", { replace: true });
    } else {
      trigger({});
    }
  }, [token, navigate]);
  useEffect(() => {
    if (isError) {
      removeToken();
      navigate("/auth", { replace: true });
    }
    if (userData) {
      dispath(setUser(userData));
    }
  }, [userData, isLoading, isError]);
  return (
    <div>
      {token && <AppHeader />}

      <div className={styles.wrapper}>
        <Routes>
          <Route path="auth" element={<AuthPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="contract/:id" element={<ContractPage />} />
          <Route path="create-contract" element={<ContractCreatePage />} />
          <Route path="profile" element={<ImporterPage />} />
        </Routes>
        {/* <ErrorToastContainer /> */}
      </div>
    </div>
  );
}

export default App;
