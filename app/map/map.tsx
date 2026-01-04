import MapView, { Marker } from 'react-native-maps'
import { View, Text } from 'react-native'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function Map() {
    const [location, setLocation] = useState<any>(null);
    const [marker, setMarker] = useState<any>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
            setMarker({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            })
        })();
    }, []);

    return (
        <View style={{flex:1}}>
            {/* <GooglePlacesAutocomplete 
                placeholder='Search location'
                fetchDetails={true}
                onPress={(data, details = null) => {
                    const {lat, lng} = details.geometry.location;

                    setLocation({
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                    setMarker({
                        latitude: lat,
                        longitude: lng,
                    });
                }} 
                query {{
                    key: "",
                    lagnguage: 'en',
                }}
                styles={{
                    container: {
                    position: 'absolute',
                    top: 10,
                    width: 100%,
                    zIndex: 1,
                    },
                    listView: {background: 'white}
                }}
            /> */}

            {location && (
            <MapView 
                style={{ width: '100%', height: '100%' }} 
                initialRegion={{
                    latitude: location ? location.coords.latitude : 37.78825,
                    longitude: location ? location.coords.longitude : -122.4324,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                
                // region={location}
            >
                {marker && <Marker
                    coordinate={marker}
                    title="You are here"
                />}
            </MapView>
            )}
        </View>
)}