import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { icons } from '@/constants/icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { auth, db } from '../../api/firebase_key'
import { doc, getDoc } from 'firebase/firestore'

const loadProfile = async () => {
    const uid = auth.currentUser?.uid as string;
    // console.log(uid);
    
    if (!uid) {
        console.log("No user logged in");
        return null;
    }

    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
        const profile = snap.data();
        console.log(profile);
    }

    return null;
}

const profile = () => {
    return (
        <ScrollView className='flex-1 bg-primary' contentContainerStyle={{ paddingBottom: useSafeAreaInsets().bottom + 80 }}>
            <View className='flex-column items-center'>
                <Image source={icons.person} className="w-32 h-32 rounded-full border-[1px] border-black mt-20" />
                <Text className='text-black text-4xl` font-bold mt-6'>Trần Minh Quang</Text>
                <TouchableOpacity><Text className='text-blue text-xl mt-2'>Edit Profile Photo</Text></TouchableOpacity>
            </View>

            <View className='border-[1px] border-gray-300 rounded-2xl mt-8 mx-4 p-4'>
                <Text className='text-black text-2xl font-bold mt-6'>Info</Text>
                {/* <Text className='text-black text-lg mt-4 mb-2'>This is the user profile information section. You can add more details about the user here.</Text> */}
                <View className='flex flex-row'>
                    <Image source={icons.username} className="w-8 h-8 mt-8"/>
                    <View className='ml-4'>
                        <Text className='text-black text-xl font-bold mt-6'>Username: </Text>
                        <Text>minhquang5014</Text>
                    </View>
                </View>

                <View className='flex flex-row'>
                    <Image source={icons.gmail} className="w-8 h-8 mt-8"/>
                    <View className='ml-4'>
                        <Text className='text-black text-xl font-bold mt-6'>Email: </Text>
                        <Text>minhquang5014@gmail.com</Text>
                    </View>
                </View>
                <View className='flex flex-row'>
                    <Image source={icons.gmail} className="w-8 h-8 mt-8"/>
                    <View className='ml-4'>
                        <Text className='text-black text-xl font-bold mt-6'>Gender: </Text>
                        <Text>Male</Text>
                    </View>
                </View>


                <View className='flex flex-row'>
                    <Image source={icons.heart} className="w-8 h-8 mt-8"/>
                    <View className='ml-4'>
                        <Text className='text-black text-xl font-bold mt-6'>In a relationship with: </Text>
                        <Text></Text>
                    </View>
                </View>
                    <View className='flex flex-row'>
                    <Image source={icons.heart} className="w-8 h-8 mt-8"/>
                    <View className='ml-4'>
                        <Text className='text-black text-xl font-bold mt-6'>Your relationship starts on: </Text>
                        <Text></Text>
                    </View>
                </View>

            </View>

            <View className='border-[1px] border-gray-300 rounded-2xl mt-8 mx-4 p-4'>
                <Text className='text-black text-2xl font-bold mt-6'>Danger Zone</Text>
                <View className='flex flex-row'>
                    <Image source={icons.goodbye} className="w-8 h-8 mt-8"/>
                    <TouchableOpacity className='mt-8 justify-center p-8 mx-4'>
                        <Text className='text-black size-lg font-bold'>SIGN OUT</Text>
                    </TouchableOpacity>
                </View>
                <View className='flex flex-row'>
                    <Image source={icons.delete_trash} className="w-8 h-8 mt-8"/>
                    <TouchableOpacity className='mt-8 justify-center p-8 mx-4'>
                        <Text className='text-black size-lg font-bold'>DELETE YOUR ACCOUNT</Text>
                    </TouchableOpacity>
                </View>      
            </View>
        </ScrollView>
  )
}

export default profile