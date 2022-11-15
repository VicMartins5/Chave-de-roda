import {
  View,
  TouchableOpacity
} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import Icon from '@expo/vector-icons/Ionicons';

import estilos from './0.Outros/Estilos'
import { auth } from '../firebase';

const Menu = () => {
  const navigation = useNavigation();

  const Deslogar = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };

    return (
      <View style={estilos.menu}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Veiculo')}
          style={estilos.menu_botao}>
          <Icon
            name="car"
            size={25}
            style={estilos.menu_icones}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Marcados')}
          style={estilos.menu_botao}>
          <Icon
            name="calendar"
            size={25}
            style={estilos.menu_icones}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Avaliados')}
          style={estilos.menu_botao}>
            <Icon
              name="star"
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={Deslogar}
          style={estilos.menu_botao}>
            <Icon
              name="log-out"
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>
      </View>
    );
}

export default Menu;