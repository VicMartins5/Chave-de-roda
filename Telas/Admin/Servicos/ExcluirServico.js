import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import { banco} from '../../../firebase';

import estilos from '../../0.Outros/Estilos'

const ExcluirServico = ({ navigation, route }) => {
  const { id, veiculo, servico, valor } = route.params;

  const Excluir = () => {
    banco
      .collection('Servicos')
      .doc(id)
      .delete()
      .then(() => {
        navigation.navigate('AdminServicos');
      });
  };

  return (
    <ScrollView
      style={estilos.main_meio}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <Text style={estilos.titulo}>Deseja excluir o serviço abaixo?</Text>

      <View style={estilos.marcados}>
          <View style={estilos.servicos_info}>
            <Text style={estilos.marcados_descricao}>{veiculo}</Text>
            <Text style={estilos.marcados_descricao}>{servico} - R$ {valor}</Text>
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
          onPress={Excluir}
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

export default ExcluirServico;