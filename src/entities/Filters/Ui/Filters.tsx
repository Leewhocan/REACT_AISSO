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
export const Filters = () => {
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
          placeholder="Выберите страну"
          treeNodeFilterProp="search"
          style={{ flexGrow: "1" }}
          showSearch
          value={filter.country || undefined}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          treeData={countryList}
          onChange={onCountryChange}
        />
      </Space.Compact>
      <Space.Compact block size="large">
        <TreeSelect
          className={style.treeSelect}
          style={{ flexGrow: "1" }}
          placeholder="Выберите товар"
          treeNodeFilterProp="search"
          showSearch
          value={filter.good || undefined}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          treeData={tnvedList}
          onChange={onTnvedChange}
        />
      </Space.Compact>
      <Button
        className={style.resetFilterBtn}
        type="text"
        onClick={() => onResetFilter()}
      >
        Сбросить фильтр
      </Button>
    </div>
  );
};
