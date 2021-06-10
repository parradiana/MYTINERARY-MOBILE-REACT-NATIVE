import React, { useEffect, useState } from 'react'
import {ImageBackground, ScrollView, Text, StyleSheet, View, Image} from 'react-native'
import { connect } from 'react-redux'
import Itinerary from '../components/Itinerary'
import itinerariesActions from '../redux/actions/itinerariesActions'
import Icon from 'react-native-vector-icons/FontAwesome';
import Ioicons from 'react-native-vector-icons/Ionicons'
import { StatusBar } from 'expo-status-bar';
const Itineraries = (props) => {
    const {cities, itineraries, route} = props
    const [city, setCity] = useState([])
    const {nombreCiudad, imagen, moneda, bandera, pais, idioma} = city
    useEffect(()=> {
        setCity(cities.find(city => city._id === route.params.id))
        props.cargarItinerarios(route.params.id)
    }, [])
    useEffect(() => {
        return () => {
            props.reseteoItineraries()
        }
    }, [])
    return(
        <>
        <StatusBar translucent backgroundColor="transparent"/>
        <ScrollView>
            <ImageBackground source={{uri: imagen}} style={styles.cityImage} imageStyle={{borderBottomLeftRadius: 40, borderBottomRightRadius:40}}>
                <Ioicons name="arrow-back" style={styles.arrow} onPress={() => props.navigation.navigate('cities')}/>
            </ImageBackground>
            <View style={styles.contenedorInfo}>
                <Text style={{fontWeight: 'bold', fontSize: 40, color: '#ff9566', textAlign: 'center'}}>{nombreCiudad}</Text>
                <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center', marginBottom: 5, marginRight: 20}}>
                    <Image source={{uri: bandera}} style={styles.pais}/>
                    <Text style={{fontSize: 20, marginLeft: 7}}>{pais}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems:'center', marginLeft: 19}}>
                    <Image source={require('../assets/monedas.png')} style={styles.monedas}/>
                    <Text style={{fontSize: 20}}>{moneda}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems:'center', marginLeft: 19}}>
                    <Icon name="language" style={{color: '#ff9566', fontSize: 30, marginRight: 21}}/>
                    <Text style={{fontSize: 20}}>{idioma}</Text>
                </View>

            </View>
            {itineraries.length === 0
            ? <View style={{marginTop: 90}}>
                <ImageBackground source={require('../assets/itinerariosNotFound.png')} style={styles.itinerariosNotFound}/>
                <View style={{backgroundColor: 'white',  borderTopLeftRadius: 60, borderTopRightRadius: 60, paddingBottom: 60}}>
                <Text style={{color: '#ff9566', fontSize: 30, textAlign: 'center', padding: 30, fontWeight: 'bold'}}>Oh! It seems that there are not itineraries for this city yet!</Text>
                </View>
            </View> 
            : <View style={{marginTop: '30%', marginBottom: '15%'}}>
                {itineraries.map(itinerary => <Itinerary key={itinerary._id} itinerary={itinerary} navigation={props.navigation}/>)}
            </View> 
            }
        </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    cityImage: {
        width: '100%',
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nombreCiudad: {
        color: 'white',
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
        width:'70%'
    },
    arrow:{
        color: "#ff9566",
        fontSize: 30,
        position: 'absolute',
        top: 30,
        left: 7
    },
    pais:{
        width: '15%',
        height: 51,
    },
    monedas:{
        width: '12%',
        height: 35, 
        marginRight: 11,
        marginBottom: 10
    },
    contenedorInfo:{
        justifyContent:'center',
        backgroundColor: 'white',
        borderRadius: 30,
        width: '85%',
        padding: 10,
        position: 'absolute',
        left: 32,
        top: 300
    },
    itinerariosNotFound:{
        width: '100%',
        height: 300
    }
})
const mapStateToProps = state => {
    return {
        cities: state.citiesReducer.cities,
        itineraries: state.itinerariesReducer.itineraries,
    }
}
const mapDispatchToProps = {
    cargarItinerarios: itinerariesActions.cargarItinerarios,
    reseteoItineraries: itinerariesActions.reseteoItineraries,
}
export default connect(mapStateToProps, mapDispatchToProps)(Itineraries)