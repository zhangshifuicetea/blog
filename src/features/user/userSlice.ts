import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getStorage, removeStorage, saveStorage} from '../../utils/storage';
import {AppThunk} from '../../app/store';
import {apiLogin, apiRegister, GithubInfo, LoginData, RegisterData, UserInfo} from '../../api/user';
import {message} from 'antd';

interface UserSliceState {
    username: string;
    role: number;
    userId: number;
    github: GithubInfo | null;
    token: string | null;
}

let initialState: UserSliceState = {
    username: '',
    role: 2,
    userId: -1,
    github: null,
    token: '',
};

const userInfo: UserInfo = getStorage('userInfo');

if (userInfo) {
    initialState = {...initialState, ...userInfo};
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserInfo>) {
            saveStorage('userInfo', action.payload);
            state = {...initialState, ...action.payload};
        },
        logout(state) {
            removeStorage('userInfo');
            state.userId = -1;
            state.role = 2;
            state.username = '';
            state.github = state.token = null;
        }
    }
});

export const {login, logout} = user.actions;

export default user.reducer;


export const userLogin = (data: LoginData): AppThunk => {
    return async (dispatch) => {
        try {
            const res = await apiLogin(data);
            dispatch(login(res.data));
            message.success('登录成功');
        } catch (e) {
            message.error('登录失败');
        }
    }
};

export const userRegister = (data: RegisterData): AppThunk => {
    return async (dispatch) => {
        try {
            const res = await apiRegister(data);
            dispatch(login(res.data));
            message.success('登录成功');
        } catch (e) {
            message.error('登录失败');
        }
    }
};
