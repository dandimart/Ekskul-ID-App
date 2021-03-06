import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { PersistGate } from 'redux-persist/integration/react'
import FlashMessage from 'react-native-flash-message'
import { StyleSheet } from 'react-native'
import storeConfig from './redux/store'
import { Provider } from 'react-redux'
import Routes from './routes'

const MainApp = () => {
  return (
    <>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
      <FlashMessage position="top"/>
    </>
  )
}

const { store, persistor } = storeConfig()

const App = ()=>{
  return(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainApp/>
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
