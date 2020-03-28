import {createSlice} from '@reduxjs/toolkit';

interface UserSliceState {
    username: string;
    role: number;
    userId: string;
    github: string;
}

const initialState: UserSliceState = {
    username: '',
    role: 2,
    userId: '',
    github: '',
};

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
});

export default user.reducer;
