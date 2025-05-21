import { Descriptions, Tag, Typography } from "antd";
import { IContract } from "shared/libs";
import { country, tnveds } from "../../assets/x";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice/userSlice";
import { textes } from "shared/Languages/Language";
const { Text } = Typography;

interface IContractDescriptionProps {
  contract: IContract;
}

export const ContractDescription = ({
  contract,
}: IContractDescriptionProps) => {
  const currentLang = useSelector(selectLanguage);
  const text = textes[currentLang];
  const formatDate = (dateString: string, language: string = "RU") => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    // Настройки локали для каждого языка
    const locales: Record<string, string> = {
      RU: "ru-RU",
      EN: "en-US",
      CN: "zh-CN",
    };

    // Особые настройки для китайского
    if (language === "CN") {
      options.month = "numeric"; // В китайском лучше использовать цифры для месяцев
    }

    // Приводим language к верхнему регистру для надежности
    const normalizedLang = language.toUpperCase();

    return date.toLocaleDateString(locales[normalizedLang] || "ru-RU", options);
  };
  return (
    <Descriptions
      bordered
      column={1}
      layout="vertical"
      labelStyle={{ fontWeight: 500 }}
      contentStyle={{ padding: "12px 24px" }}
    >
      <Descriptions.Item label={text.contractName}>
        <Text strong>{contract.title}</Text>
      </Descriptions.Item>
      <Descriptions.Item label={text.amount}>
        <Text style={{ color: "#389e0d" }}>
          {new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
          }).format(contract.sum)}
        </Text>
      </Descriptions.Item>
      <Descriptions.Item label={text.description}>
        <Text style={{ whiteSpace: "pre-line" }}>{contract.description}</Text>
      </Descriptions.Item>
      <Descriptions.Item label={text.tnvedProduct}>
        {tnveds.find((c) => c.value === contract.tnvedId)?.[
          currentLang === "RU"
            ? "title"
            : currentLang === "EN"
            ? "titleEn"
            : "titleCn"
        ] || contract.tnvedId}
      </Descriptions.Item>
      <Descriptions.Item label={text.counterpartyCountry}>
        {country.find((c) => c.value === contract.countryId)?.[
          currentLang === "RU"
            ? "title"
            : currentLang === "EN"
            ? "titleEn"
            : "titleCn"
        ] || contract.countryId}
      </Descriptions.Item>
      <Descriptions.Item label={text.status}>
        <Tag
          color={
            contract.status === "INWAIT"
              ? "orange"
              : contract.status === "DONE"
              ? "red"
              : "green"
          }
        >
          {contract.status === "INWAIT"
            ? text.statusPending
            : contract.status === "DONE"
            ? text.statusClosed
            : text.statusActive}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item label={text.creationDate}>
        {formatDate(contract.createdAt, currentLang)}
      </Descriptions.Item>
      <Descriptions.Item label={text.updateDate}>
        {formatDate(contract.updatedAt, currentLang)}
      </Descriptions.Item>
    </Descriptions>
  );
};
