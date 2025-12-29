import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

const TabsLayout = ({ focused, icon, text}: any) => {
    if (focused) {
        return (
            <ImageBackground 
                source={images.highlight} 
                style={{flexDirection: 'row', flex:1, marginTop: 14, minWidth:120, minHeight:50, paddingHorizontal:16, justifyContent:'center', alignItems:'center', borderRadius:9999, overflow:'hidden'}}
                // className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
                <Image source={icon} tintColor="#151312" 
                style = {{width: 20, height: 20}}
                />
                <Text className="text-secondary text-base font-semibold ml-2">{text}</Text>
            </ImageBackground>
        ) 
    } else {
        return (
            <View className='size-full justify-center items-center mt-4 rounded-full' style={{marginTop: 4}}>
                <Image source={icon} tintColor="#A8B5DB" className="size-5" />
            </View>
        )
    }
}

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarStyle: {
                    backgroundColor: '#0f0D23',
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#0f0d23',
                },
            }}
            >
            <Tabs.Screen
                name="index"
                options={{ title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabsLayout
                                focused={focused}
                                icon={icons.home}
                                text="Home"
                            />
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{ title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabsLayout
                                focused={focused}
                                icon={icons.search}
                                text="Search"
                            />
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{ title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabsLayout
                                focused={focused}
                                icon={icons.person}
                                text="Profile"
                            />
                        </>
                    ),
                }}
            />
        </Tabs>
    );
}
