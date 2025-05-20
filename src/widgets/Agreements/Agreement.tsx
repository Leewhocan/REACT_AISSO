import React from "react";
import {
  Table,
  Button,
  Tag,
  Space,
  Typography,
  Card,
  Popconfirm,
  Empty,
} from "antd";
import { CheckOutlined, UndoOutlined } from "@ant-design/icons";
import styles from "./Agreements.module.scss";

const { Text, Title } = Typography;

interface Agreement {
  id: number;
  authorId: number;
  importerId: number;
  offerPrice: number;
  contractId: number;
  status: "CREATED" | "COMPLETED" | "REJECTED" | "CLOSED";
}

interface AcceptReject {
  contractId: number;
  id: number;
}

interface ContractListProps {
  agreements: Agreement[];
  agreementsImporter: Agreement[];
  userRole: "IMPORTER" | "EXPORTER";
  onAccept?: (body: AcceptReject) => Promise<void>;
  onReject?: (body: AcceptReject) => Promise<void>;
  loading?: boolean;
}

const statusMap = {
  CREATED: { color: "blue", text: "На рассмотрении" },
  COMPLETED: { color: "green", text: "Принят" },
  REFECTED: { color: "red", text: "Отклонен" },
  CLOSED: { color: "gray", text: "Закрыт" },
};

export const ContractList: React.FC<ContractListProps> = ({
  agreements,
  agreementsImporter,
  userRole,
  onAccept,
  onReject,
  loading = false,
}) => {
  const showSingleAgreement = userRole === "EXPORTER";
  const singleAgreement = showSingleAgreement ? agreements[0] : null;

  const getCardTitle = () => {
    return userRole === "EXPORTER"
      ? "Мое предложение"
      : "Предложения на мой контракт";
  };

  const renderActions = (agreement: Agreement) => {
    if (agreement.status !== "CREATED") return null;

    return (
      <Space size="middle">
        {userRole === "IMPORTER" ? (
          <>
            <Popconfirm
              title="Принять предложение?"
              onConfirm={() =>
                onAccept?.({
                  contractId: agreement.contractId,
                  id: agreement.id,
                })
              }
              okText="Да"
              cancelText="Нет"
            >
              <Button
                type="primary"
                icon={<CheckOutlined />}
                className={styles.actionButton}
              >
                Принять
              </Button>
            </Popconfirm>
          </>
        ) : (
          <Popconfirm
            title="Отозвать предложение?"
            onConfirm={() =>
              onReject?.({
                contractId: agreement.contractId,
                id: agreement.id,
              })
            }
            okText="Да"
            cancelText="Нет"
          >
            <Button icon={<UndoOutlined />} className={styles.actionButton}>
              Отозвать
            </Button>
          </Popconfirm>
        )}
      </Space>
    );
  };

  const formatPrice = (price: number) => (
    <Text strong className={styles.priceText}>
      {new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
      }).format(price)}
    </Text>
  );

  if (showSingleAgreement) {
    return (
      <Card
        title={<Title level={4}>{getCardTitle()}</Title>}
        bordered={false}
        loading={loading}
        className={styles.card}
      >
        {singleAgreement ? (
          <div className={styles.agreementCard}>
            <div className={styles.agreementInfo}>
              <div className={styles.infoRow}>
                <Text strong className={styles.label}>
                  Соглашение:
                </Text>
                <Text className={styles.value}>
                  #{singleAgreement.contractId}
                </Text>
              </div>
              <div className={styles.infoRow}>
                <Text strong className={styles.label}>
                  Сумма:
                </Text>
                {formatPrice(singleAgreement.offerPrice)}
              </div>
              <div className={styles.infoRow}>
                <Text strong className={styles.label}>
                  Статус:
                </Text>
                <Tag
                  color={statusMap[singleAgreement.status].color}
                  className={styles.statusTag}
                >
                  {statusMap[singleAgreement.status].text}
                </Tag>
              </div>
            </div>
            <div className={styles.actions}>
              {renderActions(singleAgreement)}
            </div>
          </div>
        ) : (
          <Empty description="Вы не создавали предложений" />
        )}
      </Card>
    );
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Контракт",
      dataIndex: "contractId",
      key: "contractId",
      render: (id: number) => <Text className={styles.contractId}>#{id}</Text>,
    },
    {
      title: "Сумма",
      dataIndex: "offerPrice",
      key: "offerPrice",
      render: formatPrice,
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status: keyof typeof statusMap) => (
        <Tag color={statusMap[status].color} className={styles.statusTag}>
          {statusMap[status].text}
        </Tag>
      ),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: Agreement) => renderActions(record),
    },
  ];

  return (
    <Card
      title={<Title level={4}>{getCardTitle()}</Title>}
      bordered={false}
      className={styles.card}
    >
      <Table
        columns={columns}
        dataSource={agreementsImporter}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: "Нет предложенных контрактов" }}
        className={styles.table}
      />
    </Card>
  );
};
