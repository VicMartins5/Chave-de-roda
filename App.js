import * as React from 'react';
import { Image, View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';

import Login from './Telas/Login'
import Senha from './Telas/Senha'
import Veiculo from './Telas/Veiculo'
import Cadastro from './Telas/Cadastro'
import Menu from './Telas/Menu'
import Verificar from './Telas/Verificar'
import Marcar from './Telas/Marcar'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Senha" component={Senha}/>
        <Stack.Screen name="Verificar" component={Verificar}/>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="Veiculo" component={Veiculo}/>
        <Stack.Screen name="Marcar" component={Marcar}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
