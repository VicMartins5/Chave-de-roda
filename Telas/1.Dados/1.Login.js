import { useState } from 'react';
import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';

import { auth } from '../../firebase';
import estilos from '../0.Outros/Estilos'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  var erro;

  const Logar = () => {
    if (senha == '' || email == '') {
      alert('Um ou mais campos obrigatórios vázios.');
    } else {
      auth
        .signInWithEmailAndPassword(email, senha)
        .then(() => {
          navigation.navigate('Veiculo');
        })
        .catch((error) => (erro = error.message));

      if (erro === 'The email address is badly formatted.') {
        alert('Formato de email incorreto.');
      }

      if (
        erro === 'The password is invalid or the user does not have a password.'
      ) {
        alert('Senha ou usuário incorreto.');
      }
    }
  };

  return (
    <ScrollView
      style={estilos.main_meio}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <Image
        style={estilos.logo}
        source={require('../../Imagens/Logo.svg')}
      />

      <View style={estilos.input_gp}>
        <Icon
          name="mail-outline"
          size={15} 
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input}
          placeholder={'E-mail'}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType={'text'}
        />

        <Icon
          name="key-outline"
          size={15}
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input}
          placeholder={'Senha'}
          value={senha}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry={true}
        />
      </View>

      <View style={estilos.acao_gp}>
        <TouchableOpacity
          style={estilos.acao_senha}
          onPress={() => navigation.navigate('Senha')}
        >
          Esqueceu a senha?
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.acao}
          onPress={() => navigation.navigate('Cadastro')}
        >
            Cadastrar-se
            <Icon
              name="person-add"
              size={20}
              style={estilos.acao_icone}
            />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={estilos.acao}
          onPress={Logar}
        >
            Entrar
            <Icon
              name="log-in"
              size={20}
              style={estilos.acao_icone}
            />
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default Login;