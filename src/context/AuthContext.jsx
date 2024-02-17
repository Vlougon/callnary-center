import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
export const AuthContext = createContext({});

const SESSION_NAME = 'session-verified';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const sessionData = window.localStorage.getItem(SESSION_NAME);
    const initialSessionVerified = sessionData ? JSON.parse(sessionData) : false;
    const [sessionVerified, setSessionVerified] = useState(initialSessionVerified);

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    /* ############################################################################################ */
    /* #######################################              ####################################### */
    /* ######################################  AUTH METHODS  ###################################### */
    /* #######################################              ####################################### */
    /* ############################################################################################ */
    const getUser = async () => {
        try {
            const { data } = await axios.get('/api/user');
            setUser(data);
            setSessionVerified(true);
            window.localStorage.setItem(SESSION_NAME, 'true');
        }
        catch (e) {
            console.warn('Error ', e);
        }
    };

    const login = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            await axios.post('/login', data);
            await getUser();
        }
        catch (e) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                console.warn(e.response.data);
                setErrors(e.response.data.errors);
            }
            else {
                console.warn(e);
            }
        }
        finally {
            setTimeout(() => setLoading(false), 2000);
        }
    };

    const register = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            await axios.post('/register', data);
            await getUser();
        }
        catch (e) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                console.warn(e.response.data);
                setErrors(e.response.data.errors);
            }
            else {
                console.warn(e);
            }
        }
        finally {
            setTimeout(() => setLoading(false), 2000);
        }
    };

    const sendPasswordResetLink = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        setStatus(null);
        try {
            await csrf();
            const response = await axios.post('/forgot-password', data);
            setStatus(response.data?.status);
        }
        catch (e) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                console.warn(e.response.data);
                setErrors(e.response.data.errors);
            }
            else {
                console.warn(e);
            }
        }
        finally {
            setTimeout(() => setLoading(false), 2000);
        }
    };

    const newPassword = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        setStatus(null);
        try {
            await csrf();
            const response = await axios.post('/reset-password', data);
            setStatus(response.data?.status);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
        catch (e) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                console.warn(e.response.data);
                setErrors(e.response.data.errors);
            }
            else {
                console.warn(e);
            }
        }
        finally {
            setTimeout(() => setLoading(false), 2000);
        }
    };

    const sendEmailVerificationLink = async () => {
        setErrors({});
        setLoading(true);
        setStatus(null);
        try {
            await csrf();
            const response = await axios.post('/email/verification-notification');
            setStatus(response.data?.status);
        }
        catch (e) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                console.warn(e.response.data);
                setErrors(e.response.data.errors);
            }
            else {
                console.warn(e);
            }
        }
        finally {
            setTimeout(() => setLoading(false), 2000);
        }
    };

    const logout = async () => {
        try {
            setSessionVerified(false);
            await axios.post('/logout');
            setUser(null);
            window.localStorage.removeItem(SESSION_NAME);
        }
        catch (e) {
            console.warn(e);
        }
    };
    /* ############################################################################################ */
    /* ######################################  END OF AUTH   ###################################### */
    /* ############################################################################################ */



    /* ############################################################################################ */
    /* #######################################              ####################################### */
    /* ######################################  GET METHODS   ###################################### */
    /* #######################################              ####################################### */
    /* ############################################################################################ */
    const getAllUsers = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/users');
            return response
        }
        catch (e) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                console.warn(e.response.data);
                setErrors(e.response.data.errors);
            }
            else {
                console.warn(e);
            }
        }
        finally {
            setTimeout(() => setLoading(false), 2000);
        }
    };
    /* ############################################################################################ */
    /* #####################################   END OF GET   ####################################### */
    /* ############################################################################################ */



    /* ############################################################################################ */
    /* #######################################              ####################################### */
    /* #####################################   POST METHODS   ##################################### */
    /* #######################################              ####################################### */
    /* ############################################################################################ */

    /* ############################################################################################ */
    /* ####################################   END OF POST   ####################################### */
    /* ############################################################################################ */



    /* ############################################################################################ */
    /* #######################################              ####################################### */
    /* #####################################   PUT METHODS   ###################################### */
    /* #######################################              ####################################### */
    /* ############################################################################################ */

    /* ############################################################################################ */
    /* ####################################   END OF PUT   ######################################## */
    /* ############################################################################################ */



    /* ############################################################################################ */
    /* ######################################              ######################################## */
    /* ###################################   DELETE METHODS   ##################################### */
    /* ######################################              ######################################## */
    /* ############################################################################################ */

    /* ############################################################################################ */
    /* ##################################   END OF DELETE   ####################################### */
    /* ############################################################################################ */



    useEffect(() => {
        const fetchUser = async () => {
            try {
                await getUser();
            }
            catch (e) {
                console.warn(e);
            }
            finally {
                setLoading(false);
                setSessionVerified(false);
            }
        };
        if (!user) {
            fetchUser();
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{
            csrf,
            user, loading, errors,
            login, register, logout,
            status, setStatus,
            sessionVerified,
            sendPasswordResetLink,
            newPassword,
            sendEmailVerificationLink,
            getAllUsers,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
