import React  from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image, Dimensions} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';

var width = Dimensions.get('window').width; 

const Senha = ({navigation}) => {
    return(
      <View style={styles.main}>
        <Image style={styles.logo} source={require('../Imagens/Logo.svg')}/>
        <Text style={styles.titulo}>Esqueceu a senha?</Text>
        <Text style={styles.texto}>Insira seu e-mail para envio de código de verificação.</Text>

        <View style={styles.gpcampos}>
          <View style={styles.boxicones}>
            <Icon name="mail-outline" size={15} style={styles.icones}/>
          </View>
          <TextInput style={styles.campos} placeholder={"E-mail"} keyboardType={'text'}></TextInput>
        </View>

        <View style={styles.gpbtt}>
          <TouchableOpacity style={styles.login} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.txtlogin}>Cancelar</Text>
            <Icon name="arrow-back-outline" size={20} style={[styles.icones, styles.iconesbtt]}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.login} onPress={() => navigation.navigate("Verificar")}>
            <Text style={[styles.txtlogin,{ color: '#222222'}]}>Confirmar</Text>
            <Icon name="arrow-forward-outline" size={20} style={[styles.icones, styles.iconesbtt]}/>
          </TouchableOpacity>
        </View>
      </View>
    )
}
export default Senha;
  
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: '5%',
    alignContent:'center',
    textAlign: 'center',
    paddingTop: 50,
    backgroundColor: '#222222',
  },

  logo: {
    width: width*0.6,
    height: (width*0.6)*0.55,
    alignSelf: 'center',
    marginBottom: 10,
  },
  
  titulo: {
    color: '#ffa500',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },

  texto: {
    color: '#ffa500',
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 20,
    width: '80%',
    alignSelf: 'center',
  },

  gpcampos: {
    flexDirection: "row",
    width: '100%',
    alignSelf: 'center',
    flexWrap: "wrap",
  },

  boxicones: {
    width: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffa500',
    marginBottom: 10,
    paddingLeft: '1%',
  },

  icones: {
    color: '#ffa500',
  },

  campos: {
    width: '95%',
    backgroundColor: "#222222",
    padding: '10px',
    color: '#ffa500',
    borderBottomWidth: 1,
    borderBottomColor: '#ffa500',
    fontSize: 15,
    marginBottom: 10,
    outlineStyle: 'none'
  },

  gpbtt: {
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },

  login: {
    width: '49%',
    backgroundColor: "#ffa500",
    padding: '10px',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexWrap: "wrap",
    borderRadius: 5,
  },

  txtlogin: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#222222',
  },

  iconesbtt: {
    color: '#222222',
  },
})