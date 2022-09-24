import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const UserNameSlice = createSlice({
		name: 'UserName',
    initialState: "",
    reducers: {
        ChangeName: (state, action) => {
            const userName = action.payload;
            return userName;
        }
    }
})

export const { ChangeName } = UserNameSlice.actions;

export default UserNameSlice.reducer;