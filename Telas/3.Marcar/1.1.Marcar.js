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
import MaskInput from 'react-native-mask-input';
import { banco } from '../../firebase';

const Marcar = ({ navigation, route }) => {
  const { servico } = route.params;
  const [veiculo, setVeiculo] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [data, setData] = React.useState('');
 
  const Marcar = () => {
    dataret = 0;
    if(servico == "Carro - Troca de óleo" || servico == "Moto - Troca de óleo") {
      dataret = data;
    }
    
    else {
      var dia = data.substring(0, 2);
      var mes = data.substring(3, 5);
      var ano = data.substring(6, 10);
      dia = parseInt(dia, 10);
      mes = parseInt(mes, 10);
      ano = parseInt(ano, 10);

      if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
        if (dia == 31) {
          dia = 1;
          if (mes == 12) {
            mes = 1;
            ano = ano + 1
          }

          else {
            mes = mes + 1
          }
        }

        else {
          dia = dia + 1;
        }
      }

      if (mes == 4 || mes == 6 || mes == 7 || mes == 11) {
        if (dia == 30) {
          dia = 1;
          mes = mes + 1;
        }

        else {
          dia = dia + 1;
        }
      }

      if (mes == 2) {
        if (dia == 28) {
          dia = 1;
          mes = mes + 1
        }
        
        else {
          dia = dia + 1;
        }
      }

      if (dia < 10) {
        dia = "0" + dia;
      }

      if (mes < 10) {
        mes = "0" + mes
      }
      
      dataret = dia + "/" + mes + "/" + ano;
    }


    navigation.navigate('Marcado', { dataretor: dataret })
  };

  return (
    <ScrollView
      style={styles.main}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Text style={styles.titulo}>Marcação</Text>

      <View style={styles.gpcampos}>
        <View style={styles.boxicones}>
          <Icon name="build" size={15} style={styles.icones} />
        </View>
        <Text style={styles.campos}>{servico}</Text>

        <View style={styles.boxicones}>
          <Icon name="car" size={15} style={styles.icones} />
        </View>
        <TextInput
          style={styles.campos}
          placeholder={'Modelo'}
          onChangeText={setVeiculo}
          value={veiculo}
          keyboardType={'text'}></TextInput>

        <View style={[styles.boxicones, { alignItems: 'top', paddingTop: 13 }]}>
          <Icon name="build" size={15} style={styles.icones} />
        </View>
        <TextInput
          style={[styles.campos, { alignItems: 'top' }]}
          placeholder={'Descrição do serviço'}
          keyboardType={'text'}
          multiline={true}
          onChangeText={setDescricao}
          value={descricao}
          numberOfLines={4}></TextInput>

        <View style={styles.boxicones}>
          <Icon name="calendar" size={15} style={styles.icones} />
        </View>
        <MaskInput
          style={styles.campos}
          placeholder={'Data'}
          value={data}
          onChangeText={(masked, unmasked) => {
            setData(masked);
          }}
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        />

        <View style={styles.gpbtt}>
          <TouchableOpacity
            style={styles.login}
            onPress={() => navigation.navigate('Veiculo')}>
            <Text style={styles.txtlogin}>Cancelar</Text>
            <Icon
              name="arrow-back-outline"
              size={20}
              style={[styles.icones, styles.iconesbtt]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.login}
            onPress={Marcar}>
            <Text style={[styles.txtlogin, { color: '#222222' }]}>Marcar</Text>
            <Icon
              name="person-add"
              size={20}
              style={[styles.icones, styles.iconesbtt]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default Marcar;

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

  login: {
    width: '49%',
    backgroundColor: '#ffa500',
    padding: '10px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexWrap: 'wrap',
    borderRadius: 5,
  },

  txtlogin: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#222222',
  },

  iconesbtt: {
    color: '#222222',
  },
});
