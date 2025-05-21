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
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice/userSlice";
import { textes } from "shared/Languages/Language";

const { Text, Title } = Typography;

interface Agreement {
  id: number;
  authorId: number;
  importerId: number;
  offerPrice: number;
  contractId: number;
  exporter: {
    name: string;
  };
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
  const currentLang = useSelector(selectLanguage);
  const text = textes[currentLang];
  const showSingleAgreement = userRole === "EXPORTER";
  const singleAgreement = showSingleAgreement ? agreements[0] : null;

  const getCardTitle = () => {
    return userRole === "EXPORTER" ? text.myOffer : text.offersForMyContract;
  };

  const renderActions = (agreement: Agreement) => {
    if (agreement.status !== "CREATED") return null;

    return (
      <Space size="middle">
        {userRole === "IMPORTER" ? (
          <>
            <Popconfirm
              title={text.acceptOfferQuestion}
              onConfirm={() =>
                onAccept?.({
                  contractId: agreement.contractId,
                  id: agreement.id,
                })
              }
              okText={text.yes}
              cancelText={text.no}
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
            title={text.revokeOfferQuestion}
            onConfirm={() =>
              onReject?.({
                contractId: agreement.contractId,
                id: agreement.id,
              })
            }
            okText={text.yes}
            cancelText={text.no}
          >
            <Button icon={<UndoOutlined />} className={styles.actionButton}>
              {text.revoke}
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
        currency: "USD",
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
                  {text.agreement}
                </Text>
                <Text className={styles.value}>
                  #{singleAgreement.contractId}
                </Text>
              </div>
              <div className={styles.infoRow}>
                <Text strong className={styles.label}>
                  {text.amount}:
                </Text>
                {formatPrice(singleAgreement.offerPrice)}
              </div>
              <div className={styles.infoRow}>
                <Text strong className={styles.label}>
                  {text.status}:
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
          <Empty description={text.noOffersCreated} />
        )}
      </Card>
    );
  }

  const columns = [
    {
      title: text.receivedFrom,
      width: 80,
      render: (_: any, record: Agreement) => {
        return <span>{record?.exporter?.name}</span>;
      },
    },
    {
      title: text.contract,
      dataIndex: "contractId",
      key: "contractId",
      render: (id: number) => <Text className={styles.contractId}>#{id}</Text>,
    },
    {
      title: text.amount,
      dataIndex: "offerPrice",
      key: "offerPrice",
      render: formatPrice,
    },
    {
      title: text.status,
      dataIndex: "status",
      key: "status",
      render: (status: keyof typeof statusMap) => (
        <Tag color={statusMap[status].color} className={styles.statusTag}>
          {statusMap[status].text}
        </Tag>
      ),
    },
    {
      title: text.actions,
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
        locale={{ emptyText: text.noProposedContracts }}
        className={styles.table}
      />
    </Card>
  );
};
