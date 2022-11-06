import { useEffect } from 'react';
import {
  Text,
  Image,
  ScrollView,
} from 'react-native';

import estilos from '../0.Outros/Estilos'

const Marcado = ({ navigation, route }) => {
  const { dataretor } = route.params;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Marcados');
    }, 2000);
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

      <Text style={estilos.titulo}>Serviço marcado com sucesso.</Text>
      <Text style={[estilos.titulo, { fontSize: '10', marginTop: 20 }]}>
        Data prevista para devolução do veículo: {dataretor}
      </Text>
    </ScrollView>
  );
};

export default Marcado;