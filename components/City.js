import React from 'react'
import { Text, StyleSheet, Pressable, ImageBackground, View } from 'react-native'
const City = (props) => {
    const { city } = props
    const { imagen, nombreCiudad } = city
    return (
        <Pressable onPress={() => props.navigation.navigate('itineraries', { id: city._id })}>
            <ImageBackground source={{ uri: imagen }} style={styles.cityImage}>
                <Text style={styles.nombreCiudad}>{nombreCiudad}</Text>
            </ImageBackground>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    cityImage: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nombreCiudad: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
export default City