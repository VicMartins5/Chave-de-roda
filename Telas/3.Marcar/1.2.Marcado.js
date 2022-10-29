import React, { useEffect } from 'react';
import { StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native';

var width = Dimensions.get('window').width;

const Marcado = ({ navigation, route }) => {
  const { dataretor } = route.params;

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
      <Text style={styles.titulo}>Serviço marcado com sucesso.</Text>
      <Text style={[styles.titulo, { fontSize: '10', marginTop: 20 }]}>
        Data prevista para devolução do veículo: {dataretor}
      </Text>
    </ScrollView>
  );
};

export default Marcado;

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
