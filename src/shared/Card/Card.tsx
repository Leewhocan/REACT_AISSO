import { Card, Typography } from "antd";
import { ReactNode } from "react";
import styles from "./Card.module.scss";
export const FormCard: React.FC<{ children: ReactNode; title: string }> = ({
  title,
  children,
}) => {
  return (
    <Card className={styles.card}>
      <Typography.Title
        level={3}
        style={{
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        {title}
      </Typography.Title>
      {children}
    </Card>
  );
};
