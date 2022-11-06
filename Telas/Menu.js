import {
  View,
  TouchableOpacity
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';

import estilos from './0.Outros/Estilos'
import { auth } from '../firebase';

const Menu = ({ navigation }) => {
  const Deslogar = () => {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };

    return (
      <View style={estilos.menu}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Veiculo')}
          style={estilos.menu_botao}>
          <Icon
            name="car"
            size={25}
            style={estilos.menu_icones}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Marcados')}
          style={estilos.menu_botao}>
          <Icon
            name="calendar"
            size={25}
            style={estilos.menu_icones}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.menu_botao}>
            <Icon
              name="star"
              onPress={() => navigation.navigate('Avaliados')}
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.menu_botao}>
            <Icon
              name="log-out"
              onPress={Deslogar}
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>
      </View>
    );
}

export default Menu;