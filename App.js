import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Telas/1.Dados/Login';
import Cadastro from './Telas/1.Dados/Cadastro';
import Senha from './Telas/1.Dados/Senha';

import Veiculo from './Telas/2.Servicos/Veiculo';
import Servicos from './Telas/2.Servicos/Servicos';

import Marcar from './Telas/2.Servicos/Marcar';
import Marcados from './Telas/2.Servicos/Marcados';

import Avaliar from './Telas/4.Avaliacao/1.1.Avaliar';
import Avaliado from './Telas/4.Avaliacao/1.2.Avaliado';
import Avaliados from './Telas/4.Avaliacao/2.Avaliados';

import AdminInicio from './Telas/Admin/Inicio'

import AdminServicos from './Telas/Admin/Servicos/Servicos'
import CriarServico from './Telas/Admin/Servicos/CriarServico'
import EditarServico from './Telas/Admin/Servicos/EditarServico'
import ExcluirServico from './Telas/Admin/Servicos/ExcluirServico'

import Oficinas from './Telas/Admin/Oficinas/Oficinas'
import CriarOficina from './Telas/Admin/Oficinas/CriarOficina'
import EditarOficina from './Telas/Admin/Oficinas/EditarOficina'
import ExcluirOficina from './Telas/Admin/Oficinas/ExcluirOficina'

import Rodape from './Telas/Rodape';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Senha" component={Senha} />

        <Stack.Screen name="Veiculo" component={Veiculo} />
        <Stack.Screen name="Servicos" component={Servicos} />

        <Stack.Screen name="Marcar" component={Marcar} />
        <Stack.Screen name="Marcados" component={Marcados} />

        <Stack.Screen name="Avaliar" component={Avaliar} />
        <Stack.Screen name="Avaliado" component={Avaliado} />
        <Stack.Screen name="Avaliados" component={Avaliados} />

        <Stack.Screen name="AdminInicio" component={AdminInicio} />

        <Stack.Screen name="AdminServicos" component={AdminServicos} />
        <Stack.Screen name="CriarServico" component={CriarServico} />
        <Stack.Screen name="EditarServico" component={EditarServico} />
        <Stack.Screen name="ExcluirServico" component={ExcluirServico} />

        <Stack.Screen name="Oficinas" component={Oficinas} />
        <Stack.Screen name="CriarOficina" component={CriarOficina} />
        <Stack.Screen name="EditarOficina" component={EditarOficina} />
        <Stack.Screen name="ExcluirOficina" component={ExcluirOficina} />
      </Stack.Navigator>
      
      <View>
        <Rodape />
      </View>
    </NavigationContainer>
  );
}
