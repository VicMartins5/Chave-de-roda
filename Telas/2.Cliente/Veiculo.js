import {
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import estilos from '../Estilos'
import Menu from '../0.Extras/Menu'

const Veiculo = ({ navigation }) => {
  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <Menu />

      <Text style={estilos.titulo}>Selecione o veículo</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Servicos',{ veiculo: 'Carro' })}
      >
        <ImageBackground
          style={estilos.servicos_veiculo_card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Carro.jpg')}
        >
          <Text style={estilos.servicos_veiculo_texto}>Carro</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Servicos', { veiculo: 'Moto' })}
      >
        <ImageBackground
          style={estilos.servicos_veiculo_card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Moto.jpg')}
        >
          <Text style={estilos.servicos_veiculo_texto}>Moto</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Servicos', { veiculo: 'Bicicleta' })}
      >
        <ImageBackground
          style={estilos.servicos_veiculo_card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Bicicleta.jpg')}
        >
          <Text style={estilos.servicos_veiculo_texto}>Bicicleta</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Marcar', {veiculo: 'Outros', servico: 'Outros', valor: 'A combinar',})}
      >
        <ImageBackground
          style={estilos.servicos_veiculo_card}
          imageStyle={{ borderRadius: 10 }}
          source={require('../../Imagens/Outros.jpg')}
        >
          <Text style={estilos.servicos_veiculo_texto}>Diversos</Text>
        </ImageBackground>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Veiculo;