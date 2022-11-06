import { useEffect } from 'react';
import {
  Text,
  Image,
  ScrollView,
} from 'react-native';

import estilos from '../0.Outros/Estilos'

const SenhaAlterada = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
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
      <Text style={estilos.titulo}>E-mail de redefinição de senha enviado.</Text>
    </ScrollView>
  );
};

export default SenhaAlterada;