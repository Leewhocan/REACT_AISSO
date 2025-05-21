import { RU, GB, CN } from "country-flag-icons/react/1x1";
import { Dropdown, MenuProps, Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { selectLanguage, setLanguage } from "../../redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LanguageSwitcher.module.scss"; // Или используйте CSS-in-JS

export const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const setCurrentLang = (lang: string) => {
    dispatch(setLanguage(lang));
  };
  const currentLang = useSelector(selectLanguage);

  const languages = [
    { code: "RU", label: "Русский", icon: <RU className="flag-icon" /> },
    { code: "EN", label: "English", icon: <GB className="flag-icon" /> },
    { code: "CN", label: "中文", icon: <CN className="flag-icon" /> },
  ];

  const items: MenuProps["items"] = languages.map((lang) => ({
    key: lang.code,
    label: (
      <div
        className={
          lang.code === currentLang ? styles.selectedItem : styles.menuItem
        }
        onClick={() => setCurrentLang(lang.code)}
      >
        <Space>
          {lang.icon}
          {lang.label}
        </Space>
      </div>
    ),
  }));

  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <a onClick={(e) => e.preventDefault()}>
        <Space style={{ cursor: "pointer" }}>
          <GlobalOutlined />
          {currentLanguage?.icon}
        </Space>
      </a>
    </Dropdown>
  );
};
