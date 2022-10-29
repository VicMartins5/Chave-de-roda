import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';

import { banco, auth } from '../../firebase';

const CancelarServico = ({ navigation, route }) => {
  const { id, veiculo, data, servico, descricao } = route.params;

  const Cancelar = () => {
    banco
      .collection('Servicos')
      .doc(id)
      .delete()
      .then(() => {
        navigation.navigate('Cancelado');
      });
  };

  return (
    <ScrollView
      style={styles.main}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Text style={styles.titulo}>
        Deseja cancelar a marcação do serviço abaixo?
      </Text>
      <View style={styles.marcados}>
        <View
          style={[
            styles.info,
            { borderBottomColor: '#ffa500', borderBottomWidth: 1 },
          ]}>
          <Text style={styles.veiculo}>{veiculo}</Text>
          <Text style={styles.data}>{data}</Text>
        </View>

        <View
          style={[
            styles.info,
            { borderBottomColor: '#ffa500', borderBottomWidth: 1 },
          ]}>
          <Text style={styles.desc}>{servico}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.desc}>{descricao}</Text>
        </View>
      </View>

      <View style={styles.gpbtt}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Marcados')}>
          <Text style={styles.txtbotao}>Não</Text>
          <Icon
            name="arrow-back-outline"
            size={20}
            style={[styles.icones, styles.iconesbtt]}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={Cancelar}>
          <Text style={[styles.txtbotao, { color: '#222222' }]}>Sim</Text>
          <Icon
            name="trash"
            size={20}
            style={[styles.icones, styles.iconesbtt]}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CancelarServico;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingHorizontal: '5%',
  },

  titulo: {
    color: '#ffa500',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },

  marcados: {
    backgroundColor: '#383838',
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    height: 'auto',
    flex: 1,
    marginTop: 50,
  },

  info: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    flexWrap: 'wrap',
    padding: 10,
  },

  veiculo: {
    width: '40%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffa500',
  },

  data: {
    width: '60%',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffa500',
  },

  desc: {
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffa500',
  },

  gpbtt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },

  botao: {
    width: '49%',
    backgroundColor: '#ffa500',
    padding: '10px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexWrap: 'wrap',
    borderRadius: 5,
  },

  txtbotao: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#222222',
  },

  iconesbtt: {
    color: '#222222',
  },
});
