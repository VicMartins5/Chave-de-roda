import {
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import estilos from '../0.Outros/Estilos';
import Menu from '../Menu';

const Veiculo = ({ navigation }) => {
  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Menu />

      <Text style={estilos.titulo}>Selecione o veículo</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Servicos', { veiculo: 'Carro' })}>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Carro.jpg')}>
          <Text style={estilos.veiculo}>Carro</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Servicos', { veiculo: 'Moto' })}>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Moto.jpg')}>
          <Text style={estilos.veiculo}>Moto</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Servicos', { veiculo: 'Bicicleta' })
        }>
        <ImageBackground
          style={estilos.card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Bicicleta.jpg')}>
          <Text style={estilos.veiculo}>Bicicleta</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Marcar', {
            veiculo: 'Outros',
            servico: 'Outros',
            valor: 'A combinar',
          })
        }>
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
