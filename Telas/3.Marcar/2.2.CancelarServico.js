import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import { banco} from '../../firebase';

import estilos from '../0.Outros/Estilos'

const CancelarServico = ({ navigation, route }) => {
  const { id, veiculo, data, servico, descricao } = route.params;

  const Cancelar = () => {
    banco
      .collection('Marcados')
      .doc(id)
      .delete()
      .then(() => {
        navigation.navigate('Cancelado');
      });
  };

  return (
    <ScrollView
      style={estilos.main_meio}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <Text style={estilos.titulo}>Deseja cancelar a marcação do serviço abaixo?</Text>

      <View style={estilos.marcados}>
        <View
          style={estilos.marcados_info}>
          <Text style={estilos.marcados_veiculo}>{veiculo}</Text>
          <Text style={estilos.marcados_data}>{data}</Text>
        </View>

        <View
          style={estilos.marcados_info}>
          <Text style={estilos.marcados_descricao}>{servico}</Text>
          <Text style={estilos.marcados_descricao}>{descricao}</Text>
        </View>
      </View>

      <View style={estilos.acao_gp}>
        <TouchableOpacity
          style={estilos.acao}
          onPress={() => navigation.navigate('Marcados')}
        >
            Não
            <Icon
              name="arrow-back"
              size={20}
              style={estilos.acao_icone}
            />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={estilos.acao}
          onPress={Cancelar}
        >
            Sim
            <Icon
              name="trash"
              size={20}
              style={estilos.acao_icone}
            />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CancelarServico;