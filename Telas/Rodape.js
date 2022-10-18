import React, {Component}  from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image, Dimensions, Linking } from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';

const Rodape = ({navigation}) => {
  return (
    <View style={styles.main}>
      <View style={styles.gpsociais}>
        <TouchableOpacity><Icon name="logo-facebook" size={20} style={styles.icones}/></TouchableOpacity>
        <TouchableOpacity><Icon name="logo-twitter" size={20} style={styles.icones}/></TouchableOpacity>
        <TouchableOpacity><Icon name="logo-instagram" size={20} style={styles.icones}/></TouchableOpacity>
        <TouchableOpacity><Icon name="logo-whatsapp" size={20} style={styles.icones}/></TouchableOpacity>
      </View>

      <Text style={[styles.texto,{ fontSize: 12}]}>Sede: Rua X, X - X, Fortaleza - CE - 00000-000</Text>
      <Text style={[styles.texto,{ marginTop: 20, fontSize: 12}]}>Desenvolvido por</Text>
      <TouchableOpacity style={[styles.texto,styles.dev]}>Anderson Soares Gomes</TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('https://github.com/VicMartins5')} style={[styles.texto,styles.dev]}>Victor Aurelio Camelo Martins</TouchableOpacity>
    </View>
  );
};
export default Rodape;
  
const styles = StyleSheet.create({
    main: {
    paddingHorizontal: '5%',
    alignContent:'center',
    textAlign: 'center',
    backgroundColor: '#222222',
    paddingTop: 20
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
    marginBottom: 0
  },

  gpsociais: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
    marginHorizontal: '20%',
  },

  icones: {
    color: '#ffa500',
  }
})