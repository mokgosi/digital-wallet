import { useAuthStore } from '../store/auth';
import axios from './axios';
import jwtDecode from "../../node_modules/jwt-decode";

import Cookies from 'js-cookie';
// const { jwtDecode } = require('jwt-decode.js');

export const login = async (email, password) => {
    try {
        const { data, status } = await axios.post('token', {
            email,
            password,
        });

        if (status === 200) {
            setAuthUser(data.access, data.refresh);
        }
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.detail || 'Something went wrong - login',
        };
    }
};

export const register = async (username, password, confirm_password, email, last_name, first_name) => {
    try {
        const { data } = await axios.post('register', {
            username,
            password,
            confirm_password,
            email,
            last_name, 
            first_name
        });
        await login(email, password);
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error?.response?.data || 'Something went wrong - register',
        };
    }
};

export const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    useAuthStore.getState().setUser(null);
};

export const setUser = async () => {
    // ON PAGE LOAD
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
    if (!accessToken || !refreshToken) {
        return;
    }
    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken(refreshToken);
        setAuthUser(response.access, response.refresh);
    } else {
        setAuthUser(accessToken, refreshToken);
    }
};

export const setAuthUser = (access_token, refresh_token) => {
    
    Cookies.set('access_token', access_token, {
        expires: 1,
        secure: true,
    });

    Cookies.set('refresh_token', refresh_token, {
        expires: 7,
        secure: true,
    });

    const user = jwtDecode(access_token) ?? null;

    if (user) {
        useAuthStore.getState().setUser(user);
    }
    useAuthStore.getState().setLoading(false);
};

export const getRefreshToken = async () => {
    const refresh_token = Cookies.get('refresh_token');
    const response = await axios.post('token/refresh/', {
        refresh: refresh_token,
    });
    return response.data;
};

export const isAccessTokenExpired = (accessToken) => {
    
    try {
        const decodedToken = jwtDecode(accessToken);
        return decodedToken.exp < Date.now() / 1000;
    } catch (err) {
        return true; // Token is invalid or expired
    }
};