import { useEffect } from 'react';
import {
  Text,
  Image,
  ScrollView,
} from 'react-native';

import estilos from '../0.Outros/Estilos'

const Cancelado = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Marcados');
    }, 1000);
  },);

  return (
    <ScrollView
      style={estilos.main_meio}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <Image
        style={estilos.logo}
        source={require('../../Imagens/Logo.svg')}
      />

      <Text style={estilos.titulo}>Serviço cancelado com sucesso.</Text>
    </ScrollView>
  );
};

export default Cancelado;