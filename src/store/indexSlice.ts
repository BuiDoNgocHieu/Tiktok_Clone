import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CurrentBottomTab = 'Trang chủ' | undefined;

interface InitialState {
  currentBottomTab: CurrentBottomTab;
  bottomSheetSignIn: boolean;
  currentUser: string;
  modalSignIn: boolean;
}

const initialState: InitialState = {
  currentBottomTab: 'Trang chủ',
  bottomSheetSignIn: false,
  currentUser: '',
  modalSignIn: false,
};

const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    setCurrentBottomTab: (state, action: PayloadAction<InitialState>) => {
      state.currentBottomTab = action.payload.currentBottomTab;
    },
    setBottomSheetSignIn: (state, action: PayloadAction<InitialState>) => {
      state.bottomSheetSignIn = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<InitialState>) => {
      state.currentUser = action.payload;
    },
    setModalSignIn: (state, action: PayloadAction<InitialState>) => {
      state.modalSignIn = action.payload;
    },
  },
});

export default indexSlice.reducer;

export const {
  setCurrentBottomTab,
  setBottomSheetSignIn,
  setCurrentUser,
  setModalSignIn,
} = indexSlice.actions;
