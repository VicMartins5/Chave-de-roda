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

const Veiculo = ({ navigation }) => {
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

      <Text style={estilos.titulo}>Selecione o veículo</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Carro')}>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Carro.jpg')}>
          <Text style={estilos.veiculo}>Carro</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Moto')}>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Moto.jpg')}>
          <Text style={estilos.veiculo}>Moto</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Bicicleta')}>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Bicicleta.jpg')}>
          <Text style={estilos.veiculo}>Bicicleta</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Marcar', { servico: 'Outros' })}>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Outros.jpg')}>
          <Text style={estilos.veiculo}>Diversos</Text>
        </ImageBackground>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Veiculo;