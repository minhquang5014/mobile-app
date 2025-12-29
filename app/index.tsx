import React from "react";
import { Dimensions, View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import './global.css';
const {width, height} = Dimensions.get('window');
import { useRouter, Slot, Stack } from "expo-router";
const slides = {
    title:'Welcome to App!',
    message: 'The simplest and safest way to access your favourite app.',
    action: 'Get started',
}


export default function Layout() {
    const router = useRouter();
    return (
        <View style={styles.container}>
        <Image
            source={{ uri: 'https://assets.withfra.me/Landing.1.png' }}
            style={[styles.slideImage, { marginTop: -150 }]}
            resizeMode ="contain"
        />
        <View style={{ position: 'absolute', bottom: 100, width: '100%', paddingHorizontal: 24 }}>
            <Text style={styles.slideTitle}>{slides.title}</Text>
            <Text style={[styles.slideText, { marginTop: 16 }]}>{slides.message}</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => router.replace('./(tabs)/')}
            >
                <Text style={styles.buttonText}>{slides.action}</Text>
            </TouchableOpacity>
        </View>
    </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1f26',
    },
    slideImage: {
        width: width,
        height: height,
        position: 'relative',
        top: 0,
    },
    slideTitle:{
        fontSize: 28,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        marginBottom: 12,
    },
    slideText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#a9b1cf',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1e5afb',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 36,
        marginVertical: 48,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
});