import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FlatList, ScrollView, Text, View, StyleSheet, Image } from 'react-native'
import City from '../components/City'
import citiesActions from '../redux/actions/citiesActions'
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-android'
import ContentCarrousel from '../components/ContentCarrousel'

const Cities = (props) => {
    const { citiesCopia, navigation, route } = props
    useEffect(() => {
        props.cargarCities()
    }, [])
    return (
        <ScrollView>
            <View style={styles.contenedorCities}>
                <Text style={{color: 'black', fontSize: 30, marginTop: 30, fontWeight: 'bold',  marginLeft: 12}}>Discover the <Text style={{color: '#ff9566'}}>world</Text></Text>
                <View style={styles.searchBar}>
                    <SearchBar
                        placeholder="Search by destination"
                        onChangeText={(e) => props.filtrarCities(e)}
                    >
                    </SearchBar>
                </View>
                <View>
                    <Text style={styles.tituloCarrousel}>Popular</Text>
                    <ContentCarrousel/>
                </View>
                <View>
                    {citiesCopia.length === 0
                        ? <View style={{alignItems: 'center', marginTop: 30}}>
                            <Text style={{color:'#ff9566', fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Oops! There are not results for your search</Text>
                            <Text style={{color:'#ff9566', fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Try another one!</Text>
                            <Image source={{uri: 'http://baravdg.com/wp-content/uploads/2021/04/noResults.png'}} style={styles.imgNoResults}/>
                        </View>
                        : <View>
                            <Text style={styles.tituloCities}>Explore more</Text>
                            {citiesCopia.map(city => {
                            return <City key={city._id} city={city} navigation={navigation} route={route} />

                        })}
                        </View>
                    }
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    contenedorCities: {
        backgroundColor: '#ffffff',
    },
    searchBar: {
        marginTop: 5
    },
    tituloCities:{
        color: '#ff9566',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 12,
        marginBottom: 8,
        marginTop: 15
    },
    tituloCarrousel: {
        color: '#ff9566',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 12
    },
    imgNoResults:{
        width: '80%',
        height: 400,
        marginLeft: 33
    }
})
const mapStateToProps = state => {
    return {
        citiesCopia: state.citiesReducer.citiesCopia,
    }
}
const mapDispatchToProps = {
    cargarCities: citiesActions.fetcheoApi,
    filtrarCities: citiesActions.filtrarCities
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)