import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isSuperuser: false,
    bibleVersion: "King James Version",
    // title: "Chat",
    // systemMsgBgColor: "rgb(192, 198, 210)",
    // systemTextColor: "black" 
  },
  reducers: {
    setSuperuserStatus: (state, action) => {
      state.isSuperuser = action.payload;
    },
    setBibleVersion: (state, action) => {
      state.bibleVersion = action.payload;
    },
    // setTitle: (state, action) => {
    //   state.title = action.payload;
    // },
    // setSystemMsgBgColor: (state, action) => {
    //   state.systemMsgBgColor = action.payload;
    // },
    // setSystemTextColor: (state, action) => {
    //   state.systemTextColor = action.payload;
    // },
  },
});

export const { setSuperuserStatus, setBibleVersion } = userSlice.actions;

export default userSlice.reducer;
