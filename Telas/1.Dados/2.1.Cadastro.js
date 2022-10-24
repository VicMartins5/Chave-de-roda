import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import MaskInput from 'react-native-mask-input';

import { auth } from '../../firebase';

const Cadastro = ({ navigation }) => {
  const [tel, setTel] = React.useState('');
  const [cep, setCep] = React.useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Cadastrar = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Registrado como:', user.email);
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ScrollView
      style={styles.main}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Text style={styles.titulo}>Cadastrar usuário</Text>

      <View style={styles.gpcampos}>
        <View style={styles.boxicones}>
          <Icon name="person" size={15} style={styles.icones} />
        </View>
        <TextInput
          style={styles.campos}
          placeholder={'Nome'}
          keyboardType={'text'}></TextInput>

        <View style={styles.boxicones}>
          <Icon name="mail" size={15} style={styles.icones} />
        </View>
        <TextInput
          style={styles.campos}
          placeholder={'E-mail'}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType={'text'}></TextInput>

        <View style={styles.boxicones}>
          <Icon name="map" size={15} style={styles.icones} />
        </View>
        <MaskInput
          style={styles.campos}
          placeholder={'CEP'}
          value={cep}
          onChangeText={(masked, unmasked) => {
            setCep(masked);
          }}
          mask={[
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
          ]}
        />

        <View style={styles.boxicones}>
          <Icon name="call" size={15} style={styles.icones} />
        </View>
        <MaskInput
          style={styles.campos}
          placeholder={'Telefone'}
          value={tel}
          onChangeText={(masked, unmasked) => {
            setTel(masked);
          }}
          mask={[
            '(',
            /\d/,
            /\d/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
        />

        <View style={styles.boxicones}>
          <Icon name="key" size={15} style={styles.icones} />
        </View>
        <TextInput
          style={styles.campos}
          placeholder={'Senha'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}></TextInput>
      </View>

      <View style={styles.gpbtt}>
        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.txtlogin}>Cancelar</Text>
          <Icon
            name="arrow-back-outline"
            size={20}
            style={[styles.icones, styles.iconesbtt]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login}
          onPress={Cadastrar}>
          <Text style={[styles.txtlogin, { color: '#222222' }]}>
            Cadastrar-se
          </Text>
          <Icon
            name="person-add"
            size={20}
            style={[styles.icones, styles.iconesbtt]}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Cadastro;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: '5%',
    alignContent: 'center',
    textAlign: 'center',
    paddingTop: 50,
    backgroundColor: '#222222',
  },

  titulo: {
    color: '#ffa500',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },

  gpcampos: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    flexWrap: 'wrap',
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
    backgroundColor: '#222222',
    padding: '10px',
    color: '#ffa500',
    borderBottomWidth: 1,
    borderBottomColor: '#ffa500',
    fontSize: 15,
    marginBottom: 10,
    outlineStyle: 'none',
  },

  gpbtt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },

  login: {
    width: '49%',
    backgroundColor: '#ffa500',
    padding: '10px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexWrap: 'wrap',
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
});
