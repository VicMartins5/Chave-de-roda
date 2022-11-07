import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import { banco } from '../../firebase';

import estilos from '../0.Outros/Estilos'

const Avalicao = ({ navigation, route }) => {
  const { id, veiculo, servico, descricao, data } = route.params;

  const [avaliacao, setAvaliacao] = React.useState('');

  const Avaliar = () => {
    if (avaliacao == "") {
      alert("Campo de avaliação vazio.")
    }
    
    else {
      banco
        .collection('Marcados')
        .doc(id)
        .update({
          avaliacao: avaliacao,
          avaliado: true,
        })
        .then(() => {
          navigation.navigate('Avaliado');
        });
    }
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Text style={estilos.titulo}>Avalie o serviço</Text>

      <View style={estilos.input_gp}>
        <Icon
          name="build-outline"
          size={15}
          style={estilos.input_icone}
        />
        <Text style={estilos.input}>{servico}</Text>

        <Icon
          name="car-outline"
          size={15}
          style={estilos.input_icone}
        />
        <Text style={estilos.input}>{veiculo}</Text>

        <Icon
          name="cog-outline"
          size={15}
          style={estilos.input_icone}
        />
        <Text style={estilos.input}>{descricao}</Text>

        <Icon
          name="calendar-outline"
          size={15}
          style={estilos.input_icone}
        />
        <Text style={estilos.input}>{data}</Text>

        <Icon
          name="star-outline"
          size={15}
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input}
          placeholder={'Avaliação'}
          onChangeText={setAvaliacao}
          value={avaliacao}
          keyboardType={'text'}
        >
        </TextInput>
      </View>

      <View style={estilos.acao_gp}>
        <TouchableOpacity
          style={estilos.acao}
          onPress={() => navigation.navigate('Avaliados')}
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
          onPress={Avaliar}
        >
            Avaliar
            <Icon
              name="star"
              size={20}
              style={estilos.acao_icone}
            />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Avalicao;