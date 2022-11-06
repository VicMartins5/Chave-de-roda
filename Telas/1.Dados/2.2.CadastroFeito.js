import { useEffect } from 'react';
import {
  Text,
  Image,
  ScrollView,
} from 'react-native';

import estilos from '../0.Outros/Estilos'

const CadastroFeito = ({ navigation }) => {
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
      <Text style={estilos.titulo}>Cadastro realizado com sucesso.</Text>
    </ScrollView>
  );
};

export default CadastroFeito;