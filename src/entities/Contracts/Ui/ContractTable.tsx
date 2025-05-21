import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./ContractTable.module.scss";
import { useSelector } from "react-redux";
import { selectFilter } from "../../../redux/filterSlice/filterSlice";
import { useLazyGetLastContractsQuery } from "../Services/ContractApi";
import { useNavigate } from "react-router";
import { country, tnveds } from "../../../assets/x";
import { selectLanguage } from "../../../redux/userSlice/userSlice";
import { textes } from "shared/Languages/Language";
const defaultData = {
  updateImageLastContracts: [],
  meta: {
    total: 0,
    page: 1,
    totalPages: 1,
    ammount: 0,
  },
};
interface Contract {
  id: number;
  authorId: number;
  title: string;
  sum: number;
  description: string;
  tnvedId: string;
  countryId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const statusColors: Record<string, string> = {
  INWAIT: "blue",
  CREATE: "green",
  DONE: "red",
};

export const LastContractsTable = () => {
  const currentLang = useSelector(selectLanguage);
  const text = textes[currentLang];
  const navigate = useNavigate();
  const [data, setData] = useState(defaultData);
  const filter = useSelector(selectFilter);
  const [trigger, { data: tableData }] = useLazyGetLastContractsQuery({});
  useEffect(() => {
    trigger(filter);
  }, [filter]);

  useEffect(() => {
    if (tableData) {
      setData(tableData);
    }
  }, [tableData]);
  const columns: ColumnsType<Contract> = [
    {
      title: text.contractName,
      dataIndex: "title",
      key: "title",
      className: styles.titleColumn,
      render: (text, record) => (
        <a
          onClick={() => navigate(`/contract/${record.id}`)}
          style={{
            color: "#1890ff",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: text.country,
      dataIndex: "countryId",
      key: "countryId",
      render: (text, record) => (
        <span>
          {country.find((c) => c.value === record.countryId)?.[
            currentLang === "RU"
              ? "title"
              : currentLang === "EN"
              ? "titleEn"
              : "titleCn"
          ] || record.countryId}
        </span>
      ),
    },
    {
      title: text.code,
      dataIndex: "tnvedId",
      key: "tnvedId",
      render: (text, record) => (
        <span>
          {tnveds.find((c) => c.value === record.tnvedId)?.[
            currentLang === "RU"
              ? "title"
              : currentLang === "EN"
              ? "titleEn"
              : "titleCn"
          ] || record.tnvedId}
        </span>
      ),
    },
    {
      title: text.amount,
      dataIndex: "sum",
      key: "sum",
      className: styles.sumColumn,
      render: (sum) => (
        <span className={styles.sum}>
          {new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
          }).format(sum)}
        </span>
      ),
    },
    {
      title: text.description,
      dataIndex: "description",
      key: "description",
      className: styles.descriptionColumn,
      ellipsis: true,
    },
    {
      title: text.status,
      dataIndex: "status",
      key: "status",
      className: styles.statusColumn,
      align: "center",
      render: (status) => (
        <Tag
          color={statusColors[status] || "default"}
          className={styles.statusTag}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: text.creationDate,
      dataIndex: "createdAt",
      key: "createdAt",
      className: styles.dateColumn,
      render: (date) => new Date(date).toLocaleDateString("ru-RU"),
    },
  ];

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>{text.recentContracts}</h3>
        <span className={styles.tableCounter}>
          {text.total}: {data.meta.total}
        </span>
      </div>
      <Table
        columns={columns}
        dataSource={data.updateImageLastContracts}
        rowKey="id"
        pagination={{
          current: data.meta.page,
          pageSize: data.meta.ammount,
          total: data.meta.total,
          showSizeChanger: false,
          className: styles.pagination,
        }}
        className={styles.contractsTable}
        bordered
      />
    </div>
  );
};
