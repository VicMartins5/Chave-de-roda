import * as React from 'react';
import { Image, View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';

import Login from './Telas/Login'
import Senha from './Telas/Senha'
import Verificar from './Telas/Verificar'
import SenhaAlterada from './Telas/SenhaAlterada'
import Cadastro from './Telas/Cadastro'
import CadastroFeito from './Telas/CadastroFeito'
import Veiculo from './Telas/Veiculo'
import Marcar from './Telas/Marcar'
import Marcados from './Telas/Marcados'
import Avaliacao from './Telas/Avaliacao'
import AvaliacaoRegistrada from './Telas/AvaliacaoRegistrada'
import Dados from './Telas/Dados'
import DadosAlterados from './Telas/DadosAlterados'
import Rodape from './Telas/Rodape'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Senha" component={Senha}/>
        <Stack.Screen name="Verificar" component={Verificar}/>
        <Stack.Screen name="SenhaAlterada" component={SenhaAlterada}/>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="CadastroFeito" component={CadastroFeito}/>
        <Stack.Screen name="Veiculo" component={Veiculo}/>
        <Stack.Screen name="Marcar" component={Marcar}/>
        <Stack.Screen name="Marcados" component={Marcados}/>
        <Stack.Screen name="Avaliacao" component={Avaliacao}/>
        <Stack.Screen name="AvaliacaoRegistrada" component={AvaliacaoRegistrada}/>
        <Stack.Screen name="Dados" component={Dados}/>
        <Stack.Screen name="DadosAlterados" component={DadosAlterados}/>
      </Stack.Navigator>

      <View>
        <Rodape />
      </View>
    </NavigationContainer>
  );
}
