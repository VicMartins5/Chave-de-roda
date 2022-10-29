import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Menu from '../Menu.js';

const Veiculo = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.main}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Menu />

      <View style={{ paddingHorizontal: '10%' }}>
        <Text style={styles.titulo}>Selecione o veículo</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Carro')}>
          <ImageBackground
            style={styles.card}
            imageStyle={{ borderRadius: 10 }}
            source={require('../../Imagens/Carro.jpg')}>
            <Text style={styles.veiculo}>Carro</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Moto')}>
          <ImageBackground
            style={styles.card}
            imageStyle={{ borderRadius: 10 }}
            source={require('../../Imagens/Moto.jpg')}>
            <Text style={styles.veiculo}>Moto</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Bicicleta')}>
          <ImageBackground
            style={styles.card}
            imageStyle={{ borderRadius: 10 }}
            source={require('../../Imagens/Bicicleta.jpg')}>
            <Text style={styles.veiculo}>Bicicleta</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Marcar', { servico: 'Outros' })}>
          <ImageBackground
            style={styles.card}
            imageStyle={{ borderRadius: 10 }}
            source={require('../../Imagens/Outros.jpg')}>
            <Text style={styles.veiculo}>Diversos</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Veiculo;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#222222',
  },

  titulo: {
    color: '#ffa500',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#383838',
    marginBottom: 20,
    width: '100%',
    height: 200,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },

  veiculo: {
    width: '100%',
    backgroundColor: 'rgba(56,56,56,0.8)',
    color: '#ffa500',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 1,
  },
});
