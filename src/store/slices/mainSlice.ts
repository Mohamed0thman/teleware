import {SerializedError, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../configureStore';
import {Currency, CurrencyRates} from '../../models';
import agent from '../../api';
import {changeItemToBeFirst} from '../../utils/main';

interface InitialState {
  currencies: Currency[];
  currencyRates: CurrencyRates | null;
  error: SerializedError | undefined;
  isLoading: boolean;
}

const initialState: InitialState = {
  currencies: [],
  currencyRates: null,
  error: undefined,
  isLoading: false,
};

export const getCurrencies = createAsyncThunk(
  'main/getCurrencies',
  async (_data, thunkAPI) => {
    try {
      const currencies = await agent.Currencies.getCurrencies();

      const formatData = Object.keys(currencies).map(key => ({
        key,
        ...currencies[key],
      }));

      return formatData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data});
    }
  },
);
export const getCurrencyRates = createAsyncThunk<
  any,
  {base: string; date: string}
>('main/getCurrencyRates', async (data, thunkAPI) => {
  try {
    const params = {
      base: data.base,
      date: data.date,
    };
    const result = await agent.Currencies.getRates(params);

    const keys = Object.keys(result.rates);
    const values = Object.values(result.rates) as number[];

    const formatData = {
      date: result.date,
      base: result.base,
      keys: changeItemToBeFirst(data.base, keys).slice(0, 6),
      values: changeItemToBeFirst(result.rates[data.base], values).slice(0, 6),
    };

    return formatData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({error: error.data});
  }
});

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCurrencies.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getCurrencies.fulfilled, (state, action) => {
      state.currencies = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCurrencies.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    builder.addCase(getCurrencyRates.fulfilled, (state, action) => {
      state.currencyRates = action.payload;
      state.isLoading = false;
    });
  },
});
export default mainSlice;
