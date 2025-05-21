import React from "react";
import { Layout, Button, Avatar, Dropdown, MenuProps } from "antd";
import {
  GlobalOutlined,
  FileAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import styles from "./Header.module.scss";
import { selectLanguage, selectUser } from "../../redux/userSlice/userSlice";
import { useSelector } from "react-redux";
import { removeToken } from "../../shared/helpers/helper";
import { LanguageSwitcher } from "shared/LanguageSwitcher";
import { textes } from "shared/Languages/Language";

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  const currentLang = useSelector(selectLanguage);
  const text = textes[currentLang];
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate("/auth");
  };
  const profileItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className={styles.menuItem}>
          <Link to="/profile">{text.profile}</Link>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div onClick={handleLogout} className={styles.menuItem}>
          <LogoutOutlined /> {text.logout}
        </div>
      ),
    },
  ];

  return (
    <Header className={styles.header}>
      <div className={styles.logoSection}>
        <Link to="/home" className={styles.logoLink}>
          <GlobalOutlined className={styles.logoIcon} />
          <span className={styles.logoText}>GlobalContracts</span>
        </Link>
      </div>

      <div className={styles.navSection}>
        {user.role === "IMPORTER" && (
          <Link to="/create-contract">
            <Button
              type="primary"
              icon={<FileAddOutlined />}
              className={styles.contractButton}
            >
              {text.newContract}
            </Button>
          </Link>
        )}
        <div className={styles.language}>
          <LanguageSwitcher />
        </div>

        <Dropdown menu={{ items: profileItems }} placement="bottomRight">
          <div className={styles.profileTrigger}>
            <Avatar
              icon={<UserOutlined />}
              size="default"
              className={styles.avatar}
            />
            <span className={styles.userName}>{user.userName}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};
