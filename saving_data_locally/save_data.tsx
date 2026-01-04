import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveDate = async ({key, entry}: any) => {
  try {
    // getting the old list
    const stored = await AsyncStorage.getItem(key);
    const parsed = stored ? JSON.parse(stored) : [];

    // adding the new entry
    parsed.push(entry);

    // saving back to storage
    await AsyncStorage.setItem(key, JSON.stringify(parsed));
    console.log('Date saved successfully!');
  } catch (error) {
    console.error('Error saving date:', error);
  }
}
