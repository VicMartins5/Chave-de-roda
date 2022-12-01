import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Cadastro from "./Telas/1.Dados/Cadastro";
import Login from "./Telas/1.Dados/Login";
import Senha from "./Telas/1.Dados/Senha";

import Inicio from "./Telas/2.Cliente/Inicio";
import Veiculo from "./Telas/2.Cliente/Veiculo";
import Servicos from "./Telas/2.Cliente/Servicos";
import Marcar from "./Telas/2.Cliente/Marcar";
import Marcados from "./Telas/2.Cliente/Marcados";
import Avaliados from "./Telas/2.Cliente/Avaliados";
import Oficinas from "./Telas/2.Cliente/Oficinas";

import AdminServicos from "./Telas/3.Admin/Servicos/Servicos"
import CriarServico from "./Telas/3.Admin/Servicos/CriarServico"
import EditarServico from "./Telas/3.Admin/Servicos/EditarServico"

import AdminOficinas from "./Telas/3.Admin/Oficinas/Oficinas"
import CriarOficina from "./Telas/3.Admin/Oficinas/CriarOficina"
import EditarOficina from "./Telas/3.Admin/Oficinas/EditarOficina"

import AdminInicio from "./Telas/3.Admin/Outros/Inicio"
import Usuarios from "./Telas/3.Admin/Outros/Usuarios"
import AdminMarcacoes from "./Telas/3.Admin/Outros/Marcacoes"
import AdminAvaliacoes from "./Telas/3.Admin/Outros/Avaliacoes"


import Rodape from "./Telas/0.Extras/Rodape";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Login">
        {/* CLIENTE E ADMIN */}
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Senha" component={Senha} />

        {/* CLIENTE */}
        <Stack.Screen name="Inicio" component={Inicio} />

        <Stack.Screen name="Veiculo" component={Veiculo} />
        <Stack.Screen name="Servicos" component={Servicos} />
        <Stack.Screen name="Marcar" component={Marcar} />
        
        <Stack.Screen name="Marcados" component={Marcados} />
        <Stack.Screen name="Avaliados" component={Avaliados} />
        <Stack.Screen name="Oficinas" component={Oficinas} />

        {/* ADMIN */}
        <Stack.Screen name="AdminInicio" component={AdminInicio} />

        <Stack.Screen name="AdminServicos" component={AdminServicos} />
        <Stack.Screen name="CriarServico" component={CriarServico} />
        <Stack.Screen name="EditarServico" component={EditarServico} />

        <Stack.Screen name="AdminOficinas" component={AdminOficinas} />
        <Stack.Screen name="CriarOficina" component={CriarOficina} />
        <Stack.Screen name="EditarOficina" component={EditarOficina} />
        
        <Stack.Screen name="Usuarios" component={Usuarios} />
        <Stack.Screen name="AdminMarcacoes" component={AdminMarcacoes} />
        <Stack.Screen name="AdminAvaliacoes" component={AdminAvaliacoes} />
      </Stack.Navigator>
      
      <View>
        <Rodape />
      </View>
    </NavigationContainer>
  );
}
