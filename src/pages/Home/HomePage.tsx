import { Typography } from "antd";
import { Filters } from "../../entities/Filters/Ui/Filters";
import style from "./HomePage.module.scss";
import { LastContractsTable } from "../../entities/Contracts/Ui/ContractTable";
import { selectLanguage } from "../../redux/userSlice/userSlice";
import { useSelector } from "react-redux";
import { textes } from "shared/Languages/Language";
export const HomePage = () => {
  const currentLang = useSelector(selectLanguage);

  return (
    <div className={style.container}>
      <Typography.Title className={style.title} level={1}>
        {textes[currentLang].contractsPageTitle}
      </Typography.Title>
      <Filters />
      <div style={{ paddingTop: "300px" }}>
        <LastContractsTable />
      </div>
    </div>
  );
};
