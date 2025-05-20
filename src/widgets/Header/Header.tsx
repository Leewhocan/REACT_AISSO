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
import { selectUser } from "../../redux/userSlice/userSlice";
import { useSelector } from "react-redux";
import { removeToken } from "../../shared/helpers/helper";

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Здесь должна быть логика выхода (например, очистка токена)
    removeToken();
    navigate("/auth"); // Перенаправляем на страницу входа
  };
  const profileItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className={styles.menuItem}>
          <Link to="/profile">Профиль</Link>
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
          <LogoutOutlined /> Выйти
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
              Новый контракт
            </Button>
          </Link>
        )}

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
