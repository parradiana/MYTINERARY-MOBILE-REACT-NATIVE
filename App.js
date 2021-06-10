import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { StatusBar } from 'expo-status-bar';
import rootReducer from './redux/reducers/rootReducer'
import thunk from 'redux-thunk'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'
import Bottom from './navigation/Bottom';
import FlashMessage from "react-native-flash-message";
import { StyleSheet } from 'react-native';
const myStore = createStore(rootReducer, applyMiddleware(thunk))
const App = (props) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  })
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <NavigationContainer>
        <Provider store={myStore}>
          <StatusBar translucent={true} backgroundColor="transparent"/>
          <Bottom/>
          <FlashMessage position="top" />
        </Provider>
      </NavigationContainer>
    )
  }
}
// const styles = StyleSheet.create({
//   statusBar:{
//     backgroundColor: 'transparent'
//   }
// })

export default App
