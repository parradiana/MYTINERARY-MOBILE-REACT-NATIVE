import * as React from 'react';
import { Text, View, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
class ContentCarrousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            carouselItems: [
                { id: 1, nombre: 'Buenos Aires', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/buenosaires-scaled.jpg' },
                { id: 2, nombre: 'Rio de Janeiro', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/riodejaneiro-scaled.jpg' },
                { id: 3, nombre: 'Tokyo', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/tokyo-scaled.jpg' },
                { id: 4, nombre: 'Rome', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/rome-scaled.jpg' },
                { id: 5, nombre: 'New York', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/newyork-scaled.jpg' },
                { id: 6, nombre: 'Koh Phi Phi', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/tailandia-scaled.jpg' },
                { id: 7, nombre: 'Paris', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/paris-scaled.jpg' },
                { id: 8, nombre: 'Sydney', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/sydney-scaled.jpg' },
                { id: 9, nombre: 'Barcelona', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/pexels-aleksandar-pasaric-1388030-1-scaled.jpg' },
                { id: 10, nombre: 'London', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/londres2-scaled.jpg' },
                { id: 11, nombre: 'Venice', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/venecia-scaled.jpg' },
                { id: 12, nombre: 'Bariloche', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/mountain-scaled.jpg' }
            ]
        }
    }
    _renderItem({ item, index }) {
        return (
            <>
            <ImageBackground source={{ uri: (item.imagen) }} style={{
                height: 190,
                alignItems: 'center',
                justifyContent:'center'
            }} imageStyle={{borderRadius: 17}}>
            </ImageBackground>
                <Text style={styles.nombre}><Icon name="map-marker" style={styles.icono}/> {item.nombre}</Text>
            </>    

        )
    }

    render() {
        return (
            <SafeAreaView style={{ marginTop: 10, marginBottom: 10}}>
                <View style={{ flexDirection: 'row'}}>
                    <Carousel
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.state.carouselItems}
                        sliderWidth={300}
                        firstItem={1}
                        itemWidth={200}
                        renderItem={this._renderItem}
                        onSnapToItem={index => this.setState({ activeIndex: index })}
                    />    
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    nombre: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25
    },
    icono:{
        fontSize: 25,
        color: '#ff9566'
    }
})

export default ContentCarrousel