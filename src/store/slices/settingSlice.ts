import {SerializedError, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface InitialState {
  lang: 'en' | 'ar' | undefined;
  isRtl: boolean;
  location: {shortCode: string; placeName: string} | null;
  enableNotifee: boolean;
}

export const initialState: InitialState = {
  lang: undefined,
  isRtl: false,
  location: null,
  enableNotifee: false,
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload.lang;
      state.isRtl = action.payload.isRtl;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setNotifee: (state, action) => {
      state.enableNotifee = action.payload;
    },
  },
  extraReducers: builder => {},
});
export default settingSlice;
export const {changeLang, setLocation, setNotifee} = settingSlice.actions;
