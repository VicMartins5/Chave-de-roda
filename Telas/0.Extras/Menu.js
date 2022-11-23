import {
  View,
} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import Icon from '@expo/vector-icons/Ionicons';

import estilos from '../Estilos'
import { auth } from '../../firebase';

const Menu = () => {
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
        onPress={() => navigation.navigate('Inicio')}
      />
      
      <Icon
        name="car"
        style={estilos.menu_itens}
        onPress={() => navigation.navigate('Veiculo')}
      />

      <Icon
        name="calendar"
        style={estilos.menu_itens}
        onPress={() => navigation.navigate('Marcados')}
      />

      <Icon
        name="star"
        style={estilos.menu_itens}
        onPress={() => navigation.navigate('Avaliados')}
      />

      <Icon
        name="business"
        style={estilos.menu_itens}
        onPress={() => navigation.navigate('Oficinas')}
      />

      <Icon
        name="log-out"
        style={estilos.menu_itens}
        onPress={Deslogar}
      />
    </View>
  );
}

export default Menu;