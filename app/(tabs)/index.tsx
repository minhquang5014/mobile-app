import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { use, useState, useEffect } from 'react'
import { icons } from '@/constants/icons'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'

const data = [
  {
    title: 'First date',
    message: 'Dinner',
    date: 'Aug 20, 2023',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBUSEhIVFRUVFRUVFRUVFRUVFRUVFRUXFhYVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0dHx8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIEBQYHA//EAD8QAAEDAgQDBgMGBAQHAQAAAAEAAhEDIQQFEjEGQVETImFxgZEyobEHFELB0fBSYnKCIyRTkhWTorLC4fEz/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAIhEBAQACAgICAgMAAAAAAAAAAAECEQMhEjEiQRMyUWFx/9oADAMBAAIRAxEAPwDrKVCVAiVCEAhKhAIQhAISoQIlQhAIQhAIQhAIQhAIQhAITalVrbucB5kD6qJUzOmC0BwOow0CSTaZEcrfvZRsTV408Q08wJJAm0wSLfL3VA/Pw4kXFjpPIbbgX2nnz5RKp6maPc8O1EBuwHMjm75c+vVUvJIvOOt6kcQPWyydDOXzM79b+k9Nk6rm24JJN7mIEnkFH5Yn8danUJj9/uyVZv8A40IABg2B3ix59N+XRaKi/U0HqrY5zL0rljZ7OQlSK6pEJUIESJUIEQhCBUIQgEqEIBCEqAQhCAQhCAQhCAQlQgRCVCAQhCAULMceKQkxvfUYAEG8+n7lTVneMMjqYmn/AIZaHNIcJmTpnuyORkerQovpMZTPOJX14YLCZ3iYJ26DaxJuFVU8wf1Mi3l5dFU16b2OLXgtIsQdwU9lZc2Vrpxki4pYkzuVJpvVRRqKY2ss9r6WDX3Xs93P9yoLKq9G1FGzSSXqywWcvptje5ibi6pg9K6opl0XHbeZNmPaNh578mfQDZWa51gsaabiJiYv+fzK3WAxYqAado8ZFhA8bH5Lp4s99Vz8mGu0pCVItWQSJUIEQlQgEIQgEqEIBCEIBCFCzDNaFD/9ajWkiQ3dxHXSLx47IJqFjMZ9oFMEtpUKlQjaSAD5BuoqGPtFOqOxBvB+L2Ewo2nToCFlcNxrTPddRqB52a3vgjrNo9QrihmLyRrpaWu2cHtfvEatO2/im4WWLJCEKUBCEIBCEIBCFW55jRTpxN3f9vP9EHP+N8raazqtI90/ECT8V5InlyhZRtN07LSZjjHPcenRQGsErmz99Ozjxuu0OnIUlhUqRFwoFWoJMLKxprSY1/ivTtCq5tRPFZRoWArIFXxUJ9ay8e2uoTpYvqSbFXvDOdOpktguJs0cpMC9+UA+6yDsRBSGqeRUy2XcVyks07i0yJSrD8GcSanCg4Eh0w6IDXWtbafqffcLtwy8ptxZY+N0RCVIrKhCEIBKkSoBCEIBMq1WtaXOIa1oJJJgADckp6459oXGjq9Q0KDv8Fh+IGO0cPxeQO3v0gLniv7RSCaWF7sfFUI7x/pB+D1E+SwVbPS5xLpMmSCSS4xEucbk+Jv4qme6eaamja0r5s9zdI7renLedlGp4gjvG6ihDnJo2usNn9VjS1kNkyXADV6E81Z5JmZc6HVSy28kSTO5m82klZIlOpm6rcVpl27BhM9xDdDjU7RhcJGoGGwCJMXgzPgFu8NV1NBXKuB8YGNb+JrgZB23giPYz4rpOSVGFhDHSAZAPxNn8J6joehVMMu9L546m1ihCFqyCEIQBK59xPmRe8xz2HQch+fmVuseT2VSN9D489JXGsdns1NLWSbqmeWumvFju7elZ8DxXkx6inMWuMOGkzzXqxc+TtwSKtSygPfdTC6yr8VYqkTlAHpRUUMvTmvVrGe0p1VNNRRalVeYqp4lqS+ulFaRCr31UpqDkp8VPJ0n7MadFz3ElxqAAgSdMAi8bbxuujrmP2U1Hdq+PhLO95giNh5/vfpy34/1c/L+wQhC0ZkQlSIFQhCAQhNqPDQXEwAJKDFfahxF93oChTMVKwMkbtp7HyJ28g5cWe/mrnirNzisXUqk90mGeDB8Pyv6lUTyoiaAiUhKFKD5SJpKJQOlKCmpVFFzkGOcyoADYnbzj8wPZdGwGYuouFZtxs4dQb39D8lySm+Ctxk2ZaqW9wGAidz+/osM/jlMnVxfLG412HA4tlWmKjDYj1HgfFe6wnAWaPqVXNc/SxtmMEQ4nefWfVbxb43cc+WOroiEqZWqBrS5xgNBJPQASVKqo4rzhmGw7iT33gtY3mSRBPkJ+i423ENp1mPfMCTYEydJge8Kz4mzh2KrmpeBZjf4Wj8+ZSZVg2VmHUbj5LHL5V2YYeGH9qR+Ka52xM+BU2k8R5JMdhW03d25O5P5KNTqFZWNsd/aa6oouJcIQ99l4OfcKsWyPp0hzXvRoAm4n6JrdiegJ9hK8cPizuDyu07eYUXdTJjBj8OBcWjl+iqy9W+IrgyfAe5VFVdc+a0491hz6l6Oc9e+Cbre1sgaiBJ2E8yoRcrPIMM+pVboFwRfoZtbne3qtcpqMJe3YeA+HXYdhfVjWYjSQW6YOxG4IIPL1gFa9QcICKbQbHSJ84uvbUtMZqMcru7SEKN2hR2p6qUJCF4dsUIH9oOqXtB1VRBS6SoFoa7eqzXH2ZaMIabTDqzhSBnYO+M+jA5WHZrEcdVNWJps5U6GIrHz0Oa2fWUpHMsQ8S4jYkkeUqOErimpE0EoSIlSgspUgQgcgFIgKA9qvcid3r7R4crKgZutBlDLk9I/VZcvpvwT5NRlGBqPe9jHBvd1M7waTUb3mNnoXRzHLZaPL+NKlEmljKbg9u5Ah39zT9ZWWpVLC9xt5Hf9+anPbWxzqdJhAqNOlzz/AKRBMnrpLTA/mWeGevTbkw+66VgseytTFSm4Oa7Yj2IPQhJjaIqU303EgPa5pI3AcIkKLk+XNw9FtJlw3cnck3JPqpsLp+u3FffTkPEXDuIwbS9z6RYT3Yc4Pdf+EiBEjmqLLMcWOJJ+KR4CV1/i/IxiqGmYcyXNtqBtsR6clyLHZBWZ+EC4ETe4nYrDKTHp2cfJllN+zquK6rwNUclADzF+Sexyp4tfybSjUlIHXleGpN1po8kvUSCASJtITn02NaOo5n9AoWs9YTHPJ3TxPOJLqmoqsxB7x81NabK44O4ZGKqPfWkUWyJBgueYsPIGfZacc7Yc13Gaw9IudA3t1v8AJda+z/hY0iMQ7uktLXUzDiHAiC1/QxPW4ChYfgnDU5BqveSW6X/CWhosN/P5dFtXZs1rYF7LTXbn3qdLUymlUZz6AbKBUzis490KyrUPco1bEtbeVQ0q1Y/G5Mq1CbKvkmRZOzpsoWdNBvikTZpr2uTtSqjjPFKMcr6V2tNS5vxZiB95xrpPcw9OmOkvJJ+TmrZuxy5nxDiS5+LdzdWg/wBLKQaD/uLfZRUxkSkQgoBCRKpCoSIQKgIQFA9KTbrS5bZvmVUYakCyf3ZXmCaIXLzZbjs4MNdpZqQE/K6lTUHU3aXOqNAfza1vxkCf5mLxdsvGm8dm5oJbUDg5hBItBDhv/SfRZcft0cnp2E4yAJnbciJ8Un39c+4Hr1nNrtqOcQ11MjUS4gu1yQTt8I+S07WuXfLubeXnj43SdmmcClRfUuQ0TDbH35efJcczXN6ld5LgIkkc4m3xG5811eodLSXwGgd4naFyniNtFld4pwGzYAzveB4Kmbbhs1VY91oTNa8qlYLy7RRMU3kShURqUZpK9mBLEzLb2aU4lMCQlU0029WldTyHDilhaTRaWB5/qeNR+vyXKaRuF1/KarH0Kb+WkN9WgAj6H1V8Oqx5LuH6XOXqzLyea9ji6Ysj78IsrW1nJDvuDAF51KbWiy8qmYHkob8be4VdVO49KtXqvMV2qszHFajAUAuLeatpXyXZqBCzhxJ6oTSNtKTZNpklV9PFnbdObjHMOyvKqt6VI7lc9zxmk4sH+N0f8yifo5q3uGrOfyhYfjTDllWpf4i1/mCwA/Ok3/cFW1aMiU1KUikCVIEpQCEqRSFCQICFAnYStaCrTB4lUDTClUqhCxzw26OLk00DsSIg+h/VV9apeV4NfO5InyI/9KXRyfE1H6GNnq6e63xcTt63MGJWWOGq3y5Nxc8OcUPoODC0PY8hrh+Ignaefh05LobKsExyWSyXhOjRLalV/aVGmQBZjSNiBu4jqfZXhrroxmnHyZS3o7PA2rQfTc6A5pvtHMH0MLiuJkOIJm+66/VrTZUVXhXCPcXHWCTJANj8v3Ktrvau+tOfYfCVKhAY0uJMCOvRFbDPpuLXtLXDdrgQR6FdYwODo0o0MAiwO5A81n+PcudUDa7BJYNL4F9O4d5Az7psnthmlezSvNtMr1YFWtcXoExycmVHdVWLWlY6LrVZNxi3D0TTADyS0w5stHWD/FBPLmsU98+SRq08WVydio121KTarPheJHUeCZ2+kXWU4WzoBwdUkyOyLZs1ou0tby5+3ip/F2JLdOmdLrtcNnDYjzHMKN/Stn2lPz+mCRKUZux+xWI7UTJRTxml+oKe0NlUq2mFUYrMWjmvfG4p9ShNNpvuQsviaD2iXAhRvZpc/wDE2oWdEoU6Rp2ehllMGYUs4Wl0S1cSwKE/HTsFjtvqRZMYwbLBfaSGuLNIENa5xPm5oHpv7LSYjEOLbSsrxq1zaN93ObqPU3IHkIPzTfZ0wZ5pqcU1bxiClSFKEChIUpKECISpEChSMM68KMF60XQZUVON7XuW5c6rUZTG73Bvl1J8gusYXLadNgpt2A53J8XHmTvKwPAtQHECbkB2k8+8IB9ifZb1zXSsMXRn9PU4Cn1XkcAwc0uhyBQeVfyZeJG4BieMBTTm4V3Mr0bhR1TyT4vA4KmVWZ5mmDwgiodTiLMFyR49AUzi3P6eDpwO9VcDob0H8TvBcpxGLe9zq9U6nuJ0zeXdSP4R052HVWx3VbqLXN8vFIPjYvBZ4Nc3UB6beipwtPm9TtMKxxuSRJ/tB/8AJZkBZ41vlDiLKDUfJXpXrTYbLwW2MYZ5bCEIVlEjDVi0yPlZa3KcwZiGmhW+FxBDrS14EAzF7WPmsWF74bEuYZB/f7lVym0y6a7NMkAfpHJQsHkOskOMdFpuG8S3FUgCZe0D1H5wrkZQ3msblZ1trqXvSvyzBmlRDB3oULMqtMN79P5LV0MK1ogKBmVNhOkhZtP8YQU6P8MJFp34SjPwpFO4rqrilgzMuMqazDt6KQ2iOqeGpKaRzSCxX2iuHZsb/OTHk39XfNbp7N1zTj6sXPYPBx/64n1/RWxu6X0yBTE9yYuiOcFKEiECpwTU5AhSJUigEJwKRCDe/Z8A2oxxNnS2OjyDpnwMe/mumBi5LwtigXCbS0td4aYLXeEbyuqU8SdDSReBPmuXG/KyuzOTUsSNKQuCiHFnoUw4k9Crsks1AvGpVPJefaE8io2YYrs6NR5/AxzvYFEuScSY44jF1HuPd1FoO8MYYEe0+qs+CclZiKjq9Zv+DShrWnZzuTfGBv1JWdp4Z1R7KbbvqEAep3PzPoulUcI1gpYWke6wX5F7ty4+ZW96jGd1Q41pqCs5ohnbP09A0C/pYLHYmrJIHutFxZm+kuwdGBTYYqP/ABVH7uvybNo5wswxvsq4Ya7Xz5N9EhInOKYtGQQhKgAgISkIL/hPHmjWa6edxsCOfmusdoCARsRI9VwvD1S1wIXVuFszFajE3b9CsOXH7bcd+l6a0LO5hjZqQBbqrTG1oaeqpqzLeK57W2kjShV3bHqhQaaujXD9pXu3EaeSrzUDCIC9jidYsFEyTY9sbiyG7jb5nb5rm3Hb/wDMQNgxg+v6FbnFVJFx+4/+LB8dD/MT1aPkXBacV3kpnNYswU1KU1dkcpUBEICBSllIUEoBEpEIFCcpGEwb3kACxIGrkJUvMcD2Y7veAcGlw+HUW7A87qly1dLzG2bS+GXQ9zzeB8PMiwPyn3XTcqz6nDKZkOPdE7FzR9YuuZYvCVcHUpz3SaTXkRs11ngjnBufPwWgwtdrqINUmkdQ0VJ1UXuBlp5uY4fvouTk8pl5T1XZh45YeN9x0b702Jhef3xnRUrari4MvqcbdHN3JB5gfoppwBPNWmW2dx0mHHN6LN8f5kPuvZtsarw3+0d5x8rD3VpVwkRdc9+0PGziOybfs2hn9zu875aR6LTDuqZ9QvBOGGupiiLN7lPzi59BA9SrPPM5bhqTtLv8xUECN6TT+I9HHl7pmGq0sLhWCpswAlo3c914+voFg8XiXVHue4yXEk+q2ndZXqaMALjATqh5BPYNLZ5nZeEq6gKRBQgEIQgEAoQgVXnCubfd64JPdNneR5lUQT2OUWbmky6dixlAVCCDbdRKmFiR1UTgzMTWw2nd1I6T1Ld2n2t6K1fUfpMMn0XDlNXVdWN3FUMIeiFNFep/plCz6/lftpzlrU5mCAQhaKoeLwglviYjyFvouf8AH2HENqcwWs9SHPP1+SEKcP2Vy9MQU0JULtjlKU1KhArk1KhIBCEKR60KkGbxuQDErT8P40drS7aHNYHOawg6CC0dL6yNcuMxeJJQhZ5L41f8eV6eKw/3mk3S/DPAqMcJs6GubIs4GWHylUXDFqxoBxDKzGuYw7PDyIa7eHNBI1fy+SELPKbxsaS6yldDyfKxTIcJJaSCXnU4NEthp5Cdxz3Wj7KQhCwwa53tFxxZSpuqOFmNc8+TRP5Lg2LxRq4jW7m8uPm4yfy9kIXRxT2xzvcNzfHuqvie62wH1P78FDYEIW0mmVu6Wo+QvNCFKCIQhAIQhAIQhAJShCDTfZ/j+zxbWHaqNB892/MLrlOi3ZCFy80+Tfi9PN1ESlQhYNn/2Q==',
  },
  {
    title: 'Anniversary',
    message: 'Dinner',
    date: 'Aug 20, 2023',
    image: ""
  },
]


const index = () => {
  const router = useRouter();
  // const [data, setDate] = useState([]);
  // useEffect(() => {
  //   const loadDates = async () => {
  //     const stored = await AsyncStorage.getItem('savedDates');
  //     setDate(stored ? JSON.parse(stored) : []);
  //   };
  //   loadDates();
  // }, []);

  return (
    <ScrollView className='flex-1 bg-pink-200'
      contentContainerStyle={{ paddingBottom: useSafeAreaInsets().bottom + 80 }}>
      <View className='flex-row gap-4 px-4 mt-12 bg-pink-200'>
        <TouchableOpacity 
          className='flex-1 h-48 bg-white/20 rounded-3xl justify-center items-center'
          onPress ={() => router.push('/photo')}
        >
          <Text className='text-lg'>Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className='flex-1 h-48 bg-white/20 rounded-3xl justify-center items-center'
          onPress ={() => router.push('/(tabs)/calendar')}
        >
          <Text className='text-lg'>Setup the next date</Text>
        </TouchableOpacity>
      </View>
      <View className='mt-6 px-4'>
        <View className='h-0.5 bg-white/30'></View>
        <Text className='text-center text-xl mt-2'>Timeline</Text>
      </View>
      <View className='mt-6'>
        {data.map((item, index) => (
          <TimelineCard 
            key={index}
            data={item} 
          />
        ))}
      </View>
    </ScrollView>
  )
}

const TimelineCard = ({ data }:any) => (
    <View className = 'flex-row px-4'>
      <View className='items-center mr-4'>
        <View className='w-1 flex-1 bg-[#FAEBD7]' />
        <View className='w-4 h-4 bg-purple-400 rounded-full'/>
        <View className='w-1 flex-1 bg-[#FAEBD7]' />
      </View>
      <View className='bg-amber-50 rounded-2xl p-4 mt-2 mb-2 flex-1 flex-row items-center'>
        <View className='flex-1'>
          <Text className='text-black font-bold text-lg'>{data.title}</Text>
          <Text className='text-black/70'>{data.message}</Text>
          <Text className='text-xs text-black/50 mt-2'>{data.date}</Text>
        </View>
        <Image source={{ uri: data.image }} className="w-16 h-16 rounded-xl"></Image>
      </View>
    </View>
  )


export default index