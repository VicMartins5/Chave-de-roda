import {
  View,
} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import Icon from '@expo/vector-icons/Ionicons';

import estilos from '../Estilos'
import { auth } from '../../firebase';

const MenuAdmin = () => {
  const navigation = useNavigation();

  const Deslogar = () => {
    auth.signOut().then(() => {
      navigation.navigate('Login');
    })
    
    .catch((error) => alert(error.message));
  };

  return (
    <View style={estilos.menu}>
      <Icon
        name="home"
        style={estilos.menu_itens}
        onPress={() => navigation.navigate('AdminInicio')}
      />
      
      <Icon
        name="build"
        style={estilos.menu_itens}
        onPress={() => navigation.navigate('AdminServicos')}
      />

      <Icon
        name="business"
        style={estilos.menu_itens}
        onPress={() => navigation.navigate('AdminOficinas')}
      />

      <Icon
        name="person"
        style={estilos.menu_itens}
        onPress={() => navigation.navigate('Usuarios')}
      />

      <Icon
        name="calendar"
        style={estilos.menu_itens}
        onPress={() => navigation.navigate('AdminMarcacoes')}
      />

      <Icon
        name="star"
        style={estilos.menu_itens}
        onPress={() => navigation.navigate('AdminAvaliacoes')}
      />

      <Icon
        name="log-out"
        style={estilos.menu_itens}
        onPress={Deslogar}
      />
    </View>
  );
}

export default MenuAdmin;