import React from 'react'
import {View} from 'react-native'
import Hero from '../components/Hero'
const Home = (props) => {
    const {navigation} = props
    return(        
        <View>
            <Hero navigation={navigation}/>
        </View>    
    )
}
export default Home