export const STORAGE_KEY = 'savedDates';
export const SIGNUP = 'signup';

export type savedDate = {
    id: string;
    date: string;
    title: string;
    message: string;
    image?: string;
};

export type signupInfo = {
    full_name: string;
    gmail: string;
    password: string;
};
