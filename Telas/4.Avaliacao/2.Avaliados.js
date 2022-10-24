import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';

import Menu from '../Menu.js';

const Avaliados = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.main}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      
      <Menu />

      <View style={{ paddingHorizontal: '10%' }}>
        <Text style={styles.titulo}>Serviços avaliados</Text>

                <View style={styles.avaliados}>
          <View
            style={[
              styles.info,
              { borderBottomColor: '#ffa500', borderBottomWidth: 1 },
            ]}>
            <Text style={styles.veiculo}>Carro</Text>
            <Text style={styles.data}>16/11/2022</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.desc}>
              Atendimento de qualidade, rápido e barato.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Avaliados;

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

  avaliados: {
    backgroundColor: '#383838',
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    height: 'auto',
    flex: 1,
  },

  info: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    flexWrap: 'wrap',
    padding: 10,
  },

  veiculo: {
    width: '40%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffa500',
  },

  data: {
    width: '60%',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffa500',
  },

  desc: {
    width: '90%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffa500',
  },

  gpicones: {
    flexDirection: 'row',
    width: '40%',
    flexWrap: 'wrap',
  },

  icones: {
    color: '#ffa500',
  },
});
