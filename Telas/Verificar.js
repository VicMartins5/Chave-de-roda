import React  from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image, Dimensions} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import MaskInput from 'react-native-mask-input';

var width = Dimensions.get('window').width; 

const Verificar = ({navigation}) => {
    const [codigo, setCodigo] = React.useState('');

    return(
      <View style={styles.main}>
        <Image style={styles.logo} source={require('../Imagens/Logo.svg')}/>
        <Text style={styles.titulo}>Verificação de código</Text>
        <Text style={styles.texto}>Insira o código de verificação enviado para seu e-mail.</Text>

          <MaskInput style={styles.campos}
          placeholder={"Código"}
          value={codigo}
          onChangeText={(masked, unmasked) => {setCodigo(masked);}}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
    />
          <TouchableOpacity style={styles.codigo}>Reenviar código?</TouchableOpacity>

        <View style={styles.gpbtt}>
          <TouchableOpacity style={styles.login} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.txtlogin}>Cancelar</Text>
            <Icon name="arrow-back-outline" size={20} style={[styles.icones, styles.iconesbtt]}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.login} onPress={() => navigation.navigate("SenhaAlterada")}>
            <Text style={[styles.txtlogin,{ color: '#222222'}]}>Verificar</Text>
            <Icon name="arrow-forward-outline" size={20} style={[styles.icones, styles.iconesbtt]}/>
          </TouchableOpacity>
        </View>
      </View>
    )
}
export default Verificar;
  
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

  campos: {
    width: '30%',
    backgroundColor: "#222222",
    color: '#ffa500',
    borderBottomWidth: 1,
    borderBottomColor: '#ffa500',
    fontSize: 15,
    outlineStyle: 'none',
    textAlign: 'center',
    padding: 10,
    alignSelf: 'center',
  },

  codigo: {
    color: '#ffa500',
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'center',
    marginTop: 10,
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