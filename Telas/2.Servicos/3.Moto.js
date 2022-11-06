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

const Moto = ({ navigation }) => {
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
        onPress={() => navigation.navigate('Marcar', { servico: 'Moto - Troca de óleo' })}>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Moto/Oleo.jpg')}>
          <Text style={estilos.veiculo}>Troca de óleo</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Marcar', { servico: 'Moto - Revisão' })}>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Moto/Revisao.jpg')}>
          <Text style={estilos.veiculo}>Revisão</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Marcar', { servico: 'Moto - Suspensão' })}>
          <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Moto/Suspensao.jpg')}>
          <Text style={estilos.veiculo}>Suspensão</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Marcar', { servico: 'Moto - Outros' })}>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Moto/Outros.jpg')}>
          <Text style={estilos.veiculo}>Outros</Text>
        </ImageBackground>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Moto;