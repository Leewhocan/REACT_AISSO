import { Typography } from "antd";
import { Filters } from "../../entities/Filters/Ui/Filters";
import style from "./HomePage.module.scss";
import { LastContractsTable } from "../../entities/Contracts/Ui/ContractTable";
export const HomePage = () => {
  return (
    <div className={style.container}>
      <Typography.Title className={style.title} level={1}>
        Страница контрактов
      </Typography.Title>
      <Filters />
      <div style={{ paddingTop: "300px" }}>
        <LastContractsTable />
      </div>
    </div>
  );
};
