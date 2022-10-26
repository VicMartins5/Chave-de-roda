import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';

const Rodape = () => {
  return (
    <View style={styles.main}>
      <Text style={[styles.texto, { fontSize: 12 }]}>
        Sede: Rua X, X - X, Fortaleza - CE - 00000-000
      </Text>
      <Text style={[styles.texto, { marginTop: 20, fontSize: 12 }]}>
        Desenvolvido por
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://github.com/Anderson780')}
        style={[styles.texto, styles.dev]}>
        Anderson Soares Gomes
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://github.com/VicMartins5')}
        style={[styles.texto, styles.dev]}>
        Victor Aurelio Camelo Martins
      </TouchableOpacity>
    </View>
  );
};
export default Rodape;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: '5%',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#222222',
    paddingVertical: 10,
  },

  texto: {
    color: '#ffa500',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  dev: {
    fontSize: 12,
    marginBottom: 0,
    color: '#dddddd',
  },
});
