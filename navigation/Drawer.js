
import {createDrawerNavigator} from '@react-navigation/drawer'
import React from 'react'
import { CitiesStack, HomeStack } from './Stack'
const drawer = createDrawerNavigator()
const Drawer = (props) => {
    return (
        <drawer.Navigator>
            <drawer.Screen name="home" component={HomeStack} options={{
                title: 'Home'
            }} />
            <drawer.Screen name="cities" component={CitiesStack} options={{
                title: 'Cities',
            }} />
        </drawer.Navigator>
    )
}
export default Drawer