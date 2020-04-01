import {createSlice} from '@reduxjs/toolkit';

interface UserSliceState {
    username: string;
    role: number;
    userId: number;
    github: string;
}

const initialState: UserSliceState = {
    username: '',
    role: 2,
    userId: -1,
    github: '',
};

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
});

export default user.reducer;
