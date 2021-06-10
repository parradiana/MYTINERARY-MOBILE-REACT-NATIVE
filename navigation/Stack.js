import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import Cities from '../pages/Cities'
import Home from '../pages/Home'
import Itineraries from '../pages/Itineraries'

const stack = createStackNavigator()

export const HomeStack = () => {
    return (
        <stack.Navigator
        headerMode={false}>
            <stack.Screen name="home" component={Home} />
        </stack.Navigator>
    )
}

export const CitiesStack = () => {
    return (
        <stack.Navigator
        headerMode={false}>
            <stack.Screen name="cities" component={Cities} />
            <stack.Screen name="itineraries" component={Itineraries} />           
        </stack.Navigator>
    )
}
