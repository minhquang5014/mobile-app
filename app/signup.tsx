import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { auth, db } from '../api/firebase_key'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

const handleSignup = async ({router, fullName, email, password, confirmPassword}: any) => {
    if (!fullName || !email || !password) {
        Alert.alert("Missing fields", "Please fill in")
        return
    }
    if (password !== confirmPassword) {
        Alert.alert("Password error", "Passwords do not match")
        return
    }

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)

        await setDoc(doc(db, "users", res.user.uid), {
            name: fullName,
            email: email,
            createdAt: new Date()
        })
        Alert.alert("Success", "Account created 🎉, Please sign in to confirm")
        router.replace("./login")
    } catch (err:any) {
        Alert.alert("Error", err.message)
    }
}

const signup = () => {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    return (
        <KeyboardAvoidingView className='flex-1 bg-pink-200' behavior={Platform.OS === 'ios' || 'android' ? "padding":"height"}>
            <ScrollView contentContainerStyle={{flexGrow: 1}} className='flex-1' keyboardShouldPersistTaps='handled'>
            <View className='flex flex-row justify-between px-6 pt-12'>
                <View className='flex flex-column mt-20'>
                    <Text className='text-5xl font-bold'>Create Your</Text>
                    <Text className='text-5xl font-bold'>Account</Text>
                </View>
                <View className='flex mt-5'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className='text-xl font-bold mt-20 ml-6'>...</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className='flex-1 bg-white mt-10 rounded-3xl'>
                <Text className='text-2xl font-bold mt-10 px-10'>Full Name</Text>
                <TextInput 
                    className='border border-gray-300 rounded-xl px-2 mx-8 mt-2'
                    placeholder='Input your full name'
                    value={fullName}
                    onChangeText={setFullName}
                />
                <Text className='text-2xl font-bold mt-5 px-10'>Gmail or Phone</Text>
                <TextInput 
                    className='border border-gray-300 rounded-xl px-2 mx-8 mt-2'
                    placeholder='Input your email'
                    // keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                />
                <Text className='text-2xl font-bold mt-5 px-10'>Password</Text>
                <TextInput 
                    className='border border-gray-300 rounded-xl px-2 mx-8 mt-2'
                    placeholder='Input your password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <Text className='text-2xl font-bold mt-5 px-10'>Confirm Your Password</Text>
                <TextInput 
                    className='border border-gray-300 rounded-xl px-2 mx-8 mt-2'
                    placeholder='Confirm your password'
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity 
                    className='bg-purple-500 rounded-3xl mx-8 mt-10 py-4 items-center'
                    onPress={() => handleSignup({router, fullName, email, password, confirmPassword})}
                >
                    <Text className='text-white text-xl font-bold'>SIGN UP</Text>
                </TouchableOpacity>
                <View className='flex flex-row justify-center mt-6'>
                    <Text className='text-xl'>Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.replace('./login')}>
                        <Text className='text-purple-500 text-xl font-bold'>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
  )
}

export default signup