import React from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
const Hero = (props) => {
    return (
        <ImageBackground source={{ uri: 'https://webdesing881317710.files.wordpress.com/2021/05/videoimage.jpg' }} style={styles.imageHero}>
            <View style={styles.contenedorHero}>
                <Image source={require('../assets/logooriginal.png')} style={styles.logo} />
                <Text style={styles.titulo}>MYtinerary</Text>
                <View style={styles.callToAction}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('cities')} style={styles.button}>
                        <Text style={{ color: 'white', fontSize: 22, textAlign: 'center' }}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    contenedorHero: {
        marginTop: '30%',
        alignItems: 'center',
        height: '100%'
    },
    imageHero: {
        width: '100%',
        height: 760,
    },
    titulo: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 60,
        fontWeight: 'bold',
        color: 'white'
    },
    logo: {
        width: '40%',
        height: '20%',
        resizeMode: 'contain'
    },
    button: {
        marginTop: '60%',
        backgroundColor: '#ff9566',
        borderRadius: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
        paddingTop: 10,
        width: '100%',
    }
})
export default Hero