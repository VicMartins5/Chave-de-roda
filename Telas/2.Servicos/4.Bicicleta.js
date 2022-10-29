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
        <Text style={styles.titulo}>Selecione o serviço</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Marcar', { servico: 'Bicicleta - Revisao' })
          }>
          <ImageBackground
            style={styles.card}
            imageStyle={{ borderRadius: 10 }}
            source={require('../../Imagens/Bicicleta/Revisao.jpg')}>
            <Text style={styles.veiculo}>Revisão</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Marcar', {
              servico: 'Bicicleta - Alinhamento',
            })
          }>
          <ImageBackground
            style={styles.card}
            imageStyle={{ borderRadius: 10 }}
            source={require('../../Imagens/Bicicleta/Alinhamento.jpg')}>
            <Text style={styles.veiculo}>Alinhamento</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Marcar', { servico: 'Bicicleta - Freio' })
          }>
          <ImageBackground
            style={styles.card}
            imageStyle={{ borderRadius: 10 }}
            source={require('../../Imagens/Bicicleta/Freio.jpg')}>
            <Text style={styles.veiculo}>Freio</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Marcar', { servico: 'Bicicleta - Outros' })
          }>
          <ImageBackground
            style={styles.card}
            imageStyle={{ borderRadius: 10 }}
            source={require('../../Imagens/Bicicleta/Outros.jpg')}>
            <Text style={styles.veiculo}>Outros</Text>
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
