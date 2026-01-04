import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from './index';

export const getData = async (key:any) => {
    const stored = await AsyncStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
}