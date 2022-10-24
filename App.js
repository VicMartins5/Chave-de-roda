import * as React from 'react';
import {
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Telas/1.Dados/1.Login';
import Cadastro from './Telas/1.Dados/2.1.Cadastro';
import CadastroFeito from './Telas/1.Dados/2.2.CadastroFeito';
import Senha from './Telas/1.Dados/3.1.Senha';
import SenhaAlterada from './Telas/1.Dados/3.2.SenhaAlterada';


import Veiculo from './Telas/2.Servicos/1.Veiculo';
import Carro from './Telas/2.Servicos/2.Carro';
import Moto from './Telas/2.Servicos/3.Moto';
import Bicicleta from './Telas/2.Servicos/4.Bicicleta';


import Marcar from './Telas/3.Marcar/1.1.Marcar';
import Marcado from './Telas/3.Marcar/1.2.Marcado';
import Marcados from './Telas/3.Marcar/2.Marcados';

import Avaliar from './Telas/4.Avaliacao/1.1.Avaliar';
import Avaliado from './Telas/4.Avaliacao/1.2.Avaliado';
import Avaliados from './Telas/4.Avaliacao/2.Avaliados';

import Dados from './Telas/5.Usuario/1.1.Dados';
import DadosAlterados from './Telas/5.Usuario/1.2.DadosAlterados';

import Rodape from './Telas/Rodape';

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="CadastroFeito" component={CadastroFeito} />
        <Stack.Screen name="Senha" component={Senha} />
        <Stack.Screen name="SenhaAlterada" component={SenhaAlterada} />

        <Stack.Screen name="Veiculo" component={Veiculo} />
        <Stack.Screen name="Carro" component={Carro} />
        <Stack.Screen name="Moto" component={Moto} />
        <Stack.Screen name="Bicicleta" component={Bicicleta} />

        <Stack.Screen name="Marcar" component={Marcar} />
        <Stack.Screen name="Marcado" component={Marcado} />
        <Stack.Screen name="Marcados" component={Marcados} />

        <Stack.Screen name="Avaliar" component={Avaliar} />
        <Stack.Screen name="Avaliado" component={Avaliado}/>
        <Stack.Screen name="Avaliados" component={Avaliados} />

        <Stack.Screen name="Dados" component={Dados} />
        <Stack.Screen name="DadosAlterados" component={DadosAlterados} />
      </Stack.Navigator>

      <View>
        <Rodape />
      </View>
    </NavigationContainer>
  );
}
