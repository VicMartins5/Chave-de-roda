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

import { auth } from '../../firebase';
import estilos from '../0.Outros/Estilos'
import Modal from 'react-native-modal';

const Senha = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const AlterarSenha = () => {
    if (email == "") {
      alert("Campo de E-mail vazio.")
    }
    else {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          setModalVisible(!isModalVisible);

          if (isModalVisible == false) {
            setTimeout(() => {
              navigation.navigate('Login');
              setModalVisible(false);
            }, 2000);
          }
        })
        .catch(error => alert(error.message))
    }
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      
      <Text style={estilos.titulo}>Alterar senha</Text>

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
          onPress={AlterarSenha}
        >
            Alterar
            <Icon
              name="arrow-forward"
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
          <Text style={estilos.titulo}>E-mail de redefinição de senha enviado.</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Senha;