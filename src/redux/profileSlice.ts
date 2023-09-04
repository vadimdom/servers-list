import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

interface ProfileState {
  user: {
    name: string;
    image?: string;
  } | null;
}

const initialState: ProfileState = {
  user: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; image?: string }>) => {
      const { payload } = action;
      state.user = { name: payload.name, image: payload.image };
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = profileSlice.actions;

export const selectUser = (state: RootState) => state.profile.user;

export default profileSlice.reducer;
