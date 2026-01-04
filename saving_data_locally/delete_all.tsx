import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from './index';

// This deletes all function is for testing purposes only. 
// This will delete the entire storage. Be careful when calling it out
export const clearAll = async (key: any) => {
  await AsyncStorage.removeItem(key);
};