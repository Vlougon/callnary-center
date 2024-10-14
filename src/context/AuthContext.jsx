import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useStorage';
import axios from '../lib/axios';
export const AuthContext = createContext({});

const SESSION_NAME = 'session-verified';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [sessionName, setsessionName, removesessionName] = useSessionStorage(SESSION_NAME, false);
    const [assistant, setAssistant, removeAssistant] = useSessionStorage('assistant', {});
    const navigate = useNavigate();
    const sessionData = sessionName;
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
            await setAssistant(data.data);
            setUser(data.data);
            setSessionVerified(true);
            setsessionName(true);
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
            const temp = await axios.post('/login', data);
            setAssistant(temp.data.data);
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
            removesessionName();
            removeAssistant();
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

    const getOneUser = async (id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/users/' + id);
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

    const getPhoneUser = async (id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/userPhone/' + id);
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

    const getAllBeneficiaries = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/beneficiaries');
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

    const getFirstBeneficiary = async (userId) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/firstbeneficiary/' + userId);
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

    const getRandomBeneficiary = async (userId) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/randombeneficiary/' + userId);
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

    const getAllBeneficiariesFullData = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/fullbeneficiary');
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

    const getOneBeneficiary = async (id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/beneficiaries/' + id);
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

    const getPhoneBeneficiary = async (id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/beneficiaryPhone/' + id);
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

    const getBeneficiaryAddress = async (id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/beneficiaryAddress/' + id);
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

    const getAllMedicalData = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/medical_datas');
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

    const getOneMedicalData = async (id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/medical_datas/' + id);
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

    const getAllContacts = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/contacts');
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

    const getOneContact = async (id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/contacts/' + id);
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

    const getBeneficiaryContacts = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/beneficiary_contacts');
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

    const getContactsBeneficiary = async (id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/contacts/beneficiary/' + id);
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

    const getPhoneContact = async (id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/contactPhone/' + id);
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

    const getContactAddress = async (id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/contactAddress/' + id);
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

    const getAllCalls = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/calls');
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

    const getAllReminders = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/reminders');
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

    const getAllAssistantsWithDetails = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/ultimateuser');
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

    const getAllBeneficiariesWithDetails = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/ultimatebeneficiary');
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

    const getAllContactsWithDetails = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/ultimatecontact');
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

    const getAllCallsWithDetails = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/ultimatecall');
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

    const getAllIncomingCallsWithDetails = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/ultimateincomingcall');
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

    const getAllOutgoingCallsWithDetails = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/ultimateoutgoingcall');
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

    const getAllRemindersWithDetails = async () => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/ultimatereminder');
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

    const getUsersByCenter = async (userId) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/academic_center/users/' + userId);
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

    const getUserBeneficiaries = async (userId) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/beneficiaries/user/' + userId);
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

    const getUserReminders = async (userId) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/reminders/user/' + userId);
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

    const getUserBeneficiaryContacts = async (userId) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/contacts/user/' + userId);
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

    const getUserBeneficiaryMedicalData = async (userId) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/medicaldatas/user/' + userId);
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

    const getAllRemindersByCenter = async (userId) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/remindersbycenter/' + userId);
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

    const getAllBeneficiariesByCenter = async (userId) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/beneficiariesbycenter/' + userId);
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

    const getAllContactsByCenter = async (userId) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/contactsbycenter/' + userId);
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

    const getAllMedicalDataByCenter = async (userId) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get('/api/V1/medicaldatasbycenter/' + userId);
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
    const createUser = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.post('/api/V1/users', data);
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

    const createPhoneUser = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.post('/api/V1/phone_users', data);
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

    const createBeneficiary = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.post('/api/V1/beneficiaries', data);
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

    const createPhoneBeneficiary = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.post('/api/V1/phone_beneficiaries', data);
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

    const createMedicalData = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.post('/api/V1/medical_datas', data);
            return response
        }
        catch (e) {
            if (typeof e === 'object' && e !== null && 'response' in e) {
                setErrors(e.response.data.errors);
                return e.response;
            }
            else {
                console.warn(e);
            }
        }
        finally {
            setTimeout(() => setLoading(false), 2000);
        }
    };

    const createContact = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.post('/api/V1/contacts', data);
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

    const createPhoneContact = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.post('/api/V1/phone_contacts', data);
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

    const createAddress = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.post('/api/V1/addresses', data);
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

    const createCall = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.post('/api/V1/calls', data);
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

    const createReminder = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.post('/api/V1/reminders', data);
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

    const createBeneficiaryContactLink = async ({ ...data }) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.post('/api/V1/beneficiary_contacts', data);
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
    /* ####################################   END OF POST   ####################################### */
    /* ############################################################################################ */



    /* ############################################################################################ */
    /* #######################################              ####################################### */
    /* #####################################   PUT METHODS   ###################################### */
    /* #######################################              ####################################### */
    /* ############################################################################################ */
    const updateUser = async ({ ...data }, id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.put('/api/V1/users/' + id, data);
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

    const updatePhoneUser = async ({ ...data }, id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.put('/api/V1/phone_users/' + id, data);
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

    const updateBeneficiary = async ({ ...data }, id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.put('/api/V1/beneficiaries/' + id, data);
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

    const updatePhoneBeneficiary = async ({ ...data }, id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.put('/api/V1/phone_beneficiaries/' + id, data);
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

    const updateMedicalData = async ({ ...data }, id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.put('/api/V1/medical_datas/' + id, data);
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

    const updateContact = async ({ ...data }, id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.put('/api/V1/contacts/' + id, data);
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

    const updatePhoneContact = async ({ ...data }, id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.put('/api/V1/phone_contacts/' + id, data);
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

    const updateAddress = async ({ ...data }, id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.put('/api/V1/addresses/' + id, data);
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
    /* ####################################   END OF PUT   ######################################## */
    /* ############################################################################################ */



    /* ############################################################################################ */
    /* ######################################              ######################################## */
    /* ###################################   DELETE METHODS   ##################################### */
    /* ######################################              ######################################## */
    /* ############################################################################################ */
    const deleteUser = async (id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.delete('/api/V1/users/' + id);
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

    const deleteBeneficiary = async (id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.delete('/api/V1/beneficiaries/' + id);
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

    const deleteContact = async (id) => {
        setErrors({});
        setLoading(true);
        try {
            await csrf();
            const response = await axios.delete('/api/V1/beneficiaries/' + id);
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
            sendPasswordResetLink, newPassword, sendEmailVerificationLink,
            getAllUsers, getOneUser, createUser, updateUser, deleteUser,
            getAllBeneficiaries, getFirstBeneficiary, getOneBeneficiary, createBeneficiary, updateBeneficiary, deleteBeneficiary,
            getAllContacts, getOneContact, createContact, updateContact, deleteContact,
            getAllMedicalData, getOneMedicalData, createMedicalData, updateMedicalData,
            getBeneficiaryAddress, getContactAddress, createAddress, updateAddress,
            createBeneficiaryContactLink, getBeneficiaryContacts, getContactsBeneficiary, getAllBeneficiariesFullData,
            getPhoneUser, createPhoneUser, updatePhoneUser,
            getPhoneBeneficiary, createPhoneBeneficiary, updatePhoneBeneficiary,
            getPhoneContact, createPhoneContact, updatePhoneContact,
            getAllReminders, createReminder,
            getAllCalls, createCall,
            getAllAssistantsWithDetails, getAllBeneficiariesWithDetails, getAllContactsWithDetails,
            getAllCallsWithDetails, getAllIncomingCallsWithDetails, getAllOutgoingCallsWithDetails,
            getAllRemindersWithDetails,
            getUsersByCenter, getUserBeneficiaries, getUserReminders, getUserBeneficiaryContacts, getUserBeneficiaryMedicalData,
            getAllRemindersByCenter, getAllBeneficiariesByCenter, getAllContactsByCenter, getAllMedicalDataByCenter,
            getRandomBeneficiary,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
