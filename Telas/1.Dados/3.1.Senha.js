import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';

import { auth } from '../../firebase';
import estilos from '../0.Outros/Estilos'

const Senha = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const AlterarSenha = () => {
    if (email == "") {
      alert("Campo de E-mail vazio.")
    }
    else {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          navigation.navigate('SenhaAlterada');
        })
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
    </ScrollView>
  );
};

export default Senha;