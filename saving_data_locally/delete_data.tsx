import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from './index';

export const deleteData = async (key:any, id: String) => {
    const stored = await AsyncStorage.getItem(key);
    const data = stored ? JSON.parse(stored) : [];
    const filteredData = data.filter((item: any) => item.id !== id);
    await AsyncStorage.setItem(key, JSON.stringify(filteredData));
}