import { Stack } from "expo-router";
import './global.css';

export default function RootLayout() {
  return (
    <Stack>
      {/* <Stack.Screen 
          name ="map/map"
          options= {{ headerShown: false }}
        /> */}
        <Stack.Screen 
          name ="index"
          options= {{ headerShown: false }}
        />
        <Stack.Screen 
          name ="login"
          options= {{ headerShown: false }}
        />
        <Stack.Screen 
          name ="signup"
          options= {{ headerShown: false }}
        />
        <Stack.Screen 
          name ="(tabs)"
          options= {{ headerShown: false }}
        />
        <Stack.Screen 
          name ="photo/[photo]"
          options= {{ headerShown: false }}
        />
      </Stack>
  )
}