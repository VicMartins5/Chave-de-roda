import {
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';

import { auth } from '../../firebase';
import estilos from '../0.Outros/Estilos'

const AdminInicio = ({ navigation }) => {
  const Deslogar = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <View style={estilos.menu}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Servicos')}
          style={estilos.menu_admin_botao}>
            <Icon
              name="build"
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Oficinas')}
          style={estilos.menu_admin_botao}>
            <Icon
              name="business"
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={Deslogar}
          style={estilos.menu_admin_botao}>
            <Icon
              name="log-out"
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AdminInicio;