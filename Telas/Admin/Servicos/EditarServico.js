import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import { banco } from '../../../firebase';

import estilos from '../../0.Outros/Estilos'

const EditarServicoo = ({ navigation, route }) => {
  const {id, veiculo, servico} = route.params;
  const [valor, setValor] = useState('');

  const Editar = () => {
    if (valor == "") {
      alert("Campo valor vazio.")
    }
    
    else {
      banco
        .collection('Servicos')
        .doc(id)
        .update({
          valor: valor,
        })
        .then(() => {
          navigation.navigate('AdminServicos');
        });
    }
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Text style={estilos.titulo}>Edite o serviço</Text>

      <View style={estilos.input_gp}>
        <Icon
          name="car-outline"
          size={15}
          style={estilos.input_icone}
        />
        <Text style={estilos.input}>{veiculo}</Text>

        <Icon
          name="build-outline"
          size={15}
          style={estilos.input_icone}
        />
        <Text style={estilos.input}>{servico}</Text>


        <Icon
          name="cash-outline"
          size={15}
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input}
          placeholder={'Valor'}
          onChangeText={setValor}
          value={valor}
          keyboardType={'numeric'}
        >
        </TextInput>
      </View>

      <View style={estilos.acao_gp}>
        <TouchableOpacity
          style={estilos.acao}
          onPress={() => navigation.navigate('AdminServicos')}
        >
            <Text style={estilos.acao_texto}>Cancelar</Text>
            <Icon
              name="arrow-back"
              size={20}
              style={estilos.acao_icone}
            />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={estilos.acao}
          onPress={Editar}
        >
            <Text style={estilos.acao_texto}>Editar</Text>
            <Icon
              name="create"
              size={20}
              style={estilos.acao_icone}
            />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default EditarServicoo;