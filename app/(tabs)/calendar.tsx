import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { use, useState } from 'react'
import { Calendar } from 'react-native-calendars'
import DateTimePicker from '@react-native-community/datetimepicker'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

const saveDate = async ({date, title, message}: any) => {
  try {
    const newEntry = { date, title, message, image: "" };

    // getting the old list
    const stored = await AsyncStorage.getItem('savedDates');
    const parsed = stored ? JSON.parse(stored) : [];

    // adding the new entry
    parsed.push(newEntry);

    // saving back to storage
    await AsyncStorage.setItem('savedDates', JSON.stringify(parsed));
    console.log('Date saved successfully!');
  } catch (error) {
    console.error('Error saving date:', error);
  }
}

const DatePlanner = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [time, setTime] = useState<Date>(new Date())
  const insets = useSafeAreaInsets()
  const [title, setTitle] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  return (
    <ScrollView className='flex flex-1 bg-pink-200 pt-10'
      contentContainerStyle={{ paddingBottom: insets.bottom + 160 }}>
      <View className='flex justify-center items-center mt-6 mb-6'>
        <Text className='text-2xl font-bold'>Selected Date: {selectedDate}</Text>
      </View>
      {/* <View className='mx-4 rounded-2xl border-[1px] overflow-hidden p-2'> */}
      <GlowCard>
        <Calendar 
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate] : {
              selected: true,
              selectedColor: '',
            }
          }}
          theme = {{
            calendarBackground: 'transparent',
            dayTextColor: '#000',
            monthTextColor: '#000',
            arrowColor: '#000',
          }}
          // className='flex w-full h-full'
        />
      </GlowCard>
      {/* </View> */}

      {/* <View className='mt-10'>
        <DateTimePicker 
          mode='time'
          value={time}0
          onChange={(event, selectedTime:any) => setTime(selectedTime)}
        />
      </View> */}
      <GlowCard>
      {/* <View className='flex mt-5 px-4 border-[1px] border-black-200 rounded-2xl pt-6 pb-6 mx-4'> */}
        <Text className='text-xl'>Set a title for the date:  </Text>
        <TextInput 
          placeholder='Input a memorable title here'
          className='border border-gray-400 rounded-2xl mt-2 bg-white'
          onChangeText={setTitle}
          value={title}
        />
        <Text className='text-xl mt-4'>Send a message: </Text>
        <TextInput 
          placeholder='Anything cute to say about the date? 💗' 
          className='border border-gray-400 rounded-2xl mt-2 bg-white'
          onChangeText={setMessage}
          value={message}
        />
      </GlowCard>
        {/* <View className='flex-1'>
          <MapView 
            className='flex-1'
            initialRegion={{
              latitude: 0.1,
              longitude: 0.1,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
          >
          </MapView> */}
        {/* </View> */}
        <View className='flex flex-row justify-center items-center'>
          <TouchableOpacity className='bg-blue-500 rounded-2xl items-center p-4 mt-4 mx-4'
            onPress={() => saveDate({date: selectedDate, title: title, message: message})}
          > 
              <Text className='text-white text-lg font-bold'>Save The Date</Text>
          </TouchableOpacity>
          <TouchableOpacity className='bg-blue-500 rounded-2xl items-center p-4 mt-4 mx-4'
            onPress={() => router.push('./map/map')}
          > 
              <Text className='text-white text-lg font-bold'>Set location on Map</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  )
}

const GlowCard = ({ children }:any) => {
  return (
    <View className='flex flex-1 mt-4 mb-4'>
      <LinearGradient 
        colors={["#7C3AED", "#67E8F9", "#F472B6"]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        className='justify-center rounded-2xl blur-lg'>
          <View className='rounded-xl bg-white/60 border border-white/20 shadow-2xl overflow-hidden mt-4 mb-4 mx-4'>
          <BlurView intensity={50} className='p-4 rounded-3xl'>
            {children}
          </BlurView>
        </View>
      </LinearGradient>
    </View>
  )
}

export default DatePlanner