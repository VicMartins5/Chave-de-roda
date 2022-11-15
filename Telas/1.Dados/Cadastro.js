import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import MaskInput from 'react-native-mask-input';
import Modal from 'react-native-modal';

import { banco, auth } from '../../firebase';
import estilos from '../0.Outros/Estilos'

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const Cadastrar = () => {
    if (nome == ''|| email == '' || telefone == '' || senha == '' || confSenha == '' || telefone.length < 15) {
      alert('Um ou mais campos vazios.');
    }
    
    else {
      if (senha != confSenha) {
        alert('Senhas não são iguais.')
      }

      if (senha.length < 6) {
        alert('Senha precisa ter ao menos 6 caracteres.');
      }

      else {
        auth
          .createUserWithEmailAndPassword(email, senha)
          .then(() => {
            banco.collection('Usuarios').add({
              nome,
              telefone,
              email,
              cargo: "Cliente"
            })
            .then(() => {
              setModalVisible(!isModalVisible);

              if (isModalVisible == false) {
                setTimeout(() => {
                  navigation.navigate('Login');
                  setModalVisible(false);
                }, 2000);
              }
            })
          })
          
          .catch(error => alert(error.message))
      }
    }
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      
      <Text style={estilos.titulo}>Cadastrar usuário</Text>

      <View style={estilos.input_gp}>
        <Icon
          name="person-outline"
          size={15} 
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input}
          placeholder={'Nome'}
          value={nome}
          onChangeText={(text) => setNome(text)}
          keyboardType={'text'}
        />

        <Icon
          name="call-outline"
          size={15} 
          style={estilos.input_icone}
        />
        <MaskInput
          style={estilos.input}
          placeholder={'Telefone'}
          value={telefone}
          onChangeText={(masked, unmasked) => {setTelefone(masked);}}
          mask={['(', /\d/, /\d/, ') ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
        />

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

        <Icon
          name="key-outline"
          size={15}
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input}
          placeholder={'Confirme a senha'}
          value={confSenha}
          onChangeText={(text) => setConfSenha(text)}
          secureTextEntry={true}
        />
      </View>

      <View style={estilos.acao_gp}>
        <TouchableOpacity
          style={estilos.acao}
          onPress={() => navigation.navigate('Login')}
        >
            Cancelar
            <Icon
              name="arrow-back"
              size={20}
              style={estilos.acao_icone}
            />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={estilos.acao}
          onPress={Cadastrar}
        >
            Cadastrar-se
            <Icon
              name="person-add"
              size={20}
              style={estilos.acao_icone}
            />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        animationIn={'slideInDown'}
        animationOut={'slideOutDown'}
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        style={estilos.modal}
        transparent
      >
        <View style={estilos.modal_content}>      
          <Image
            style={estilos.logo}
            source={require('../../Imagens/Logo.svg')}
          />
          <Text style={estilos.titulo}>Cadastro realizado com sucesso.</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Cadastro;