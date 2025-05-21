import { Space, Button, TreeSelect } from "antd";
import style from "./Filters.module.scss";
import { useGetCountryQuery, useGetTnvedQuery } from "../Services/FilterApi";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  selectFilter,
  setFilterCountry,
  setFilterTnved,
} from "../../../redux/filterSlice/filterSlice";
import { selectLanguage } from "../../../redux/userSlice/userSlice";
import { textes } from "shared/Languages/Language";
export const Filters = () => {
  const currentLang = useSelector(selectLanguage);
  const text = textes[currentLang];
  const dispath = useDispatch();
  const { data: tnvedList = [] } = useGetTnvedQuery();
  const { data: countryList = [] } = useGetCountryQuery();
  const filter = useSelector(selectFilter);
  const onCountryChange = (country: string) => {
    dispath(setFilterCountry(country));
  };
  const onTnvedChange = (good: string) => {
    dispath(setFilterTnved(good));
  };
  const onResetFilter = () => {
    dispath(resetFilters());
  };
  return (
    <div className={style.box}>
      <Space.Compact block size="large">
        <TreeSelect
          className={style.treeSelect}
          style={{ flexGrow: "1" }}
          placeholder={text.selectCountry}
          treeNodeFilterProp="search"
          showSearch
          value={filter.country || undefined}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          treeData={countryList.map((country) => ({
            value: country.value,
            title:
              currentLang === "RU"
                ? country.title
                : currentLang === "EN"
                ? country.titleEn
                : country.titleCn,
            search: country.search,
            disabled: country.disabled,
          }))}
          onChange={onCountryChange}
        />
      </Space.Compact>
      <Space.Compact block size="large">
        <TreeSelect
          className={style.treeSelect}
          placeholder={text.selectProduct}
          treeNodeFilterProp="search"
          style={{ flexGrow: "1" }}
          showSearch
          value={filter.good || undefined}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          treeData={tnvedList.map((tnved) => ({
            value: tnved.value,
            title:
              currentLang === "RU"
                ? tnved.title
                : currentLang === "EN"
                ? tnved.titleEn
                : tnved.titleCn,
            search: tnved.search,
            disabled: tnved.disabled,
          }))}
          onChange={onTnvedChange}
        />
      </Space.Compact>
      <Button
        className={style.resetFilterBtn}
        type="text"
        onClick={() => onResetFilter()}
      >
        {text.resetFilter}
      </Button>
    </div>
  );
};
