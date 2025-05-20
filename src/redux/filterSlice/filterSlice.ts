import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    country: "",
    good: "",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setFilterCountry: (state, action) => {
      state.filters.country = action.payload;
    },
    setFilterTnved: (state, action) => {
      state.filters.good = action.payload;
    },
    resetFilters: (state) => {
      state.filters.country = "";
      state.filters.good = "";
    },
  },
  selectors: {
    selectFilter: (state) => state.filters,
    // selectGood: (state) => state.filters.good,
  },
});

export const { setFilterCountry, setFilterTnved, resetFilters } =
  filterSlice.actions;

export const { selectFilter } = filterSlice.selectors;
export default filterSlice.reducer;
