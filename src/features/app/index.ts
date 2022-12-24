import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  startDate: '',
  startDateUnix: '',
  endDate: '',
  endDateUnix: '',
  sellAmount: null,
  sellCurrency: 'usd',
  buyAmount: null,
  buyCurrency: 'btc',
  convertedAmount: 0,
  isLoading: true,
  currentCoinHistory: null,
};

const appSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    setId: (state, { payload }) => {
      state.id = payload;
    },
    updateStartDate: (state, { payload }) => {
      state.startDate = payload;
    },
    updateStartDateUnix: (state, { payload }) => {
      state.startDateUnix = payload;
    },
    updateEndDate: (state, { payload }) => {
      state.endDate = payload;
    },
    updateEndDateUnix: (state, { payload }) => {
      state.endDateUnix = payload;
    },
    updateSellAmount: (state, { payload }) => {
      // if (payload >= 0) {
      state.sellAmount = payload;
      // }
    },
    updateSellCurrency: (state, { payload }) => {
      state.sellCurrency = payload;
    },
    updateBuyAmount: (state, { payload }) => {
      // if (payload >= 0) {
      state.buyAmount = payload;
      // }
    },
    updateBuyCurrency: (state, { payload }) => {
      state.buyCurrency = payload;
    },
    updateConvertedAmount: (state, { payload }) => {
      state.convertedAmount = payload;
    },
    updateLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    updateCurrentCoinHistory: (state, { payload }) => {
      state.currentCoinHistory = payload;
    },
  },
});

export const {
  setId,
  updateStartDate,
  updateStartDateUnix,
  updateEndDate,
  updateEndDateUnix,
  updateSellAmount,
  updateSellCurrency,
  updateBuyAmount,
  updateBuyCurrency,
  updateConvertedAmount,
  updateLoading,
  updateCurrentCoinHistory,
} = appSlice.actions;

export default appSlice.reducer;
