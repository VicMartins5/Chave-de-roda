import React, { useEffect } from 'react';
import { StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native';

var width = Dimensions.get('window').width;

const ServicoCancelado = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Marcados');
    }, 2000);
  },);

  return (
    <ScrollView
      style={styles.main}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Image style={styles.logo} source={require('../../Imagens/Logo.svg')} />
      <Text style={styles.titulo}>Serviço cancelado com sucesso.</Text>
    </ScrollView>
  );
};

export default ServicoCancelado;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingHorizontal: '5%',
  },

  logo: {
    width: width * 0.4,
    height: width * 0.4 * 0.55,
    alignSelf: 'center',
    marginBottom: 10,
  },

  titulo: {
    color: '#ffa500',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
