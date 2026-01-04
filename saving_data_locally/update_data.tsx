import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from './index';

export const updateData = async (key: any, id: String, newData: object) => {
    const stored = await AsyncStorage.getItem(key);
    const data = stored ? JSON.parse(stored) : [];
    const updatedData = data.map((item: any) =>
        item.id === id ? { ...item, ...newData } : item
    );
    await AsyncStorage.setItem(key, JSON.stringify(updatedData));
}