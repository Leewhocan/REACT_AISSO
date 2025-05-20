import React, { useState, useEffect } from "react";
import { Card, Select, List, Typography, Divider, Tag } from "antd";
import styles from "./ImporterPage.module.scss";
import { useLazyGetByProfileQuery } from "../../entities/Contracts/Services/ContractApi";
import { Link } from "react-router";

const { Title, Text } = Typography;
const { Option } = Select;

type ContractStatus = "CREATE" | "INWAIT" | "DONE";
type StatusFilter = ContractStatus;

interface Contract {
  id: number;
  authorId: number;
  title: string;
  sum: number;
  description: string;
  tnvedId: string;
  countryId: string;
  image: string;
  status: ContractStatus;
  createdAt: string;
  updatedAt: string;
}

const statusColors: Record<ContractStatus, string> = {
  CREATE: "blue",
  INWAIT: "green",
  DONE: "red",
};

export const ImporterPage: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("INWAIT");
  const [trigger, { data: contractData = [] }] = useLazyGetByProfileQuery();

  useEffect(() => {
    trigger(statusFilter);
  }, [statusFilter]);
  useEffect(() => {
    if (contractData) {
      setContracts(contractData.updateImageLastContracts);
    }
  }, [contractData]);

  const handleStatusChange = (value: StatusFilter) => {
    setStatusFilter(value);
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Title level={2} className={styles.title}>
          Контракты компании
        </Title>
        <Divider className={styles.divider} />
      </header>

      <section className={styles.filters}>
        <Select<StatusFilter>
          defaultValue="INWAIT"
          className={styles.filterSelect}
          onChange={handleStatusChange}
          dropdownClassName={styles.filterDropdown}
        >
          <Option value="CREATE">Созданные</Option>
          <Option value="INWAIT">Ожидающие</Option>
          <Option value="DONE">Закрытые</Option>
        </Select>
      </section>

      <section className={styles.contractsList}>
        <List<Contract>
          grid={{ gutter: 24, column: 1 }}
          dataSource={contracts}
          renderItem={(contract) => (
            <List.Item>
              <Card
                className={styles.contractCard}
                title={
                  <div className={styles.cardTitle}>
                    <Text
                      ellipsis={{ tooltip: contract.title }}
                      className={styles.contractTitle}
                    >
                      <Link to={`/contract/${contract.id}`}>
                        {contract.title}
                      </Link>
                    </Text>
                    <Tag
                      color={statusColors[contract.status]}
                      className={styles.statusTag}
                    >
                      {contract.status}
                    </Tag>
                  </div>
                }
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardRow}>
                    <Text strong>ID:</Text>
                    <Text>{contract.id}</Text>
                  </div>
                  <div className={styles.cardRow}>
                    <Text strong>Сумма:</Text>
                    <Text className={styles.contractSum}>
                      {contract.sum.toLocaleString("ru-RU")} ₽
                    </Text>
                  </div>
                  <div className={styles.cardRow}>
                    <Text strong>Описание:</Text>
                    <Text className={styles.contractDescription}>
                      {contract.description}
                    </Text>
                  </div>
                  <div className={styles.cardRow}>
                    <Text strong>Код ТН ВЭД:</Text>
                    <Text>{contract.tnvedId}</Text>
                  </div>
                  <div className={styles.cardRow}>
                    <Text strong>Страна:</Text>
                    <Text>{contract.countryId}</Text>
                  </div>
                  <div className={styles.cardDates}>
                    <div className={styles.cardRow}>
                      <Text strong>Создан:</Text>
                      <Text>{formatDate(contract.createdAt)}</Text>
                    </div>
                    <div className={styles.cardRow}>
                      <Text strong>Обновлен:</Text>
                      <Text>{formatDate(contract.updatedAt)}</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </section>
    </div>
  );
};
