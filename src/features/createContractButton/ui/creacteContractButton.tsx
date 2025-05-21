import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { ICreateButtonProps } from "./libs/types";

export const CreateContractButton = ({
  isLoading,
  text,
}: ICreateButtonProps) => {
  return (
    <Button
      type="primary"
      size="large"
      icon={<SaveOutlined />}
      htmlType="submit"
      loading={isLoading}
      style={{
        width: 240,
        height: 48,
        fontSize: 16,
        borderRadius: 4,
      }}
    >
      {text}
    </Button>
  );
};
