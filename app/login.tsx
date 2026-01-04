import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { auth, db } from '../api/firebase_key'
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

const handleLogin = async ({router, email, password}:any) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        await getDoc(doc(db, "users", res.user.uid));
        Alert.alert("Success", "Welcome to the app")
        router.replace("./(tabs)")
    } catch (err: any) {
        switch (err.code) {
            case "auth/invalid-email":
                Alert.alert("Invalid Email");
                break
            case "auth/user-not-found":
                Alert.alert("No account found");
                break
            case "auth/wrong-password":
                Alert.alert("Wrong password");
                break;
            default:
                Alert.alert("Error", err.message);
        }
    }
}

const login = () => {
    const router = useRouter();
    const [email, queryEmail] = useState("")
    const [password, queryPassword] = useState("")

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) router.replace("/(tabs)");
        });

        return unsub;
        }, []);
        
    return (
        <View className='flex-1 bg-pink-200'>
            <View className='flex flex-row justify-between px-6 pt-12'>
                <View className='flex flex-column mt-20'>
                    <Text className='text-5xl font-bold'>Hello</Text>
                    <Text className='text-5xl font-bold'>Sign in!</Text>
                </View>
                <View className='flex mt-5'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className='text-xl font-bold mt-20 ml-6'>...</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className='flex-1 bg-white mt-10 rounded-3xl'>
                <Text className='text-2xl font-bold mt-10 px-10'>Gmail</Text>
                <TextInput 
                    className='border border-gray-300 rounded-xl px-2 mx-8 mt-2'
                    placeholder='Input your email'
                    value={email}
                    onChangeText={queryEmail}
                />
                <Text className='text-2xl font-bold mt-10 px-10'>Password</Text>
                <TextInput 
                    className='border border-gray-300 rounded-xl px-2 mx-8 mt-2'
                    placeholder='Input your password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={queryPassword}
                />
                <TouchableOpacity className='' onPress={() => Alert.alert("Error", "Nothing here because I haven't coded it yet :)")}>
                    <Text className='text-purple-500 text-right text-xl mt-6 mx-8'>Forgot password?</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className='bg-purple-500 rounded-3xl mx-8 mt-10 py-4 items-center'
                    onPress={() => handleLogin({router, email, password})}
                >
                    <Text className='text-white text-xl font-bold'>Login</Text>
                </TouchableOpacity>
                <View className='flex flex-row justify-center mt-6'>
                    <Text className='text-xl'>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.replace('./signup')}>
                        <Text className='text-purple-500 text-xl font-bold'>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  )
}

export default login