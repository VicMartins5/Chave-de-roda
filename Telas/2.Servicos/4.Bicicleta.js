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

const Bicicleta = ({ navigation }) => {
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

      <Text style={estilos.titulo}>Selecione o serviço</Text>

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

      <TouchableOpacity
        onPress={() => navigation.navigate('Marcar', { servico: 'Bicicleta - Revisao' })}>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Bicicleta/Revisao.jpg')}>
          <Text style={estilos.veiculo}>Revisão</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Marcar', {servico: 'Bicicleta - Alinhamento',})}>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Bicicleta/Alinhamento.jpg')}>
          <Text style={estilos.veiculo}>Alinhamento</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Marcar', { servico: 'Bicicleta - Freio' })}>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Bicicleta/Freio.jpg')}>
          <Text style={estilos.veiculo}>Freio</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Marcar', { servico: 'Bicicleta - Outros' })}>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Bicicleta/Outros.jpg')}>
          <Text style={estilos.veiculo}>Outros</Text>
        </ImageBackground>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Bicicleta;