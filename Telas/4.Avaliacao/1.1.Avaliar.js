import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';

import { banco } from '../../firebase';

const Avalicao = ({ navigation, route }) => {
  const { id, veiculo, servico, data } = route.params;

  const [avaliacao, setAvaliacao] = React.useState('');

  const Avaliar = () => {
    banco
      .collection('Servicos')
      .doc(id)
      .update({
        avaliacao: avaliacao,
        avaliado: true,
      })
      .then(() => {
        navigation.navigate('Avaliado');
      });
  };

  return (
    <ScrollView
      style={styles.main}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Text style={styles.titulo}>Avalie o serviço</Text>

      <View style={styles.gpcampos}>
        <View style={styles.boxicones}>
          <Icon name="build" size={15} style={styles.icones} />
        </View>
        <Text style={styles.campos}>{servico}</Text>

        <View style={styles.boxicones}>
          <Icon name="car" size={15} style={styles.icones} />
        </View>
        <Text style={styles.campos}>{veiculo}</Text>

        <View style={styles.boxicones}>
          <Icon name="calendar" size={15} style={styles.icones} />
        </View>
        <Text style={styles.campos}>{data}</Text>

        <View style={[styles.boxicones, { alignItems: 'top', paddingTop: 13 }]}>
          <Icon name="star" size={15} style={styles.icones} />
        </View>
        <TextInput
          style={[styles.campos, { alignItems: 'top' }]}
          placeholder={'Avalie o serviço'}
          keyboardType={'text'}
          multiline={true}
          onChangeText={setAvaliacao}
          value={avaliacao}
          numberOfLines={4}></TextInput>
      </View>

      <View style={styles.gpbtt}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Marcados')}>
          <Text style={styles.txtbotao}>Cancelar</Text>
          <Icon
            name="arrow-back-outline"
            size={20}
            style={[styles.icones, styles.iconesbtt]}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={Avaliar}>
          <Text style={[styles.txtbotao, { color: '#222222' }]}>Avaliar</Text>
          <Icon
            name="star"
            size={20}
            style={[styles.icones, styles.iconesbtt]}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Avalicao;

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
    textAlign: 'left',
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
