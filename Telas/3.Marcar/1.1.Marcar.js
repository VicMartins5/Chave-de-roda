import React, { useState } from 'react';
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
import { banco, auth } from '../../firebase';

const Marcar = ({ navigation, route }) => {
  const usuario = auth.currentUser.email;
  const { servico } = route.params;

  const [veiculo, setVeiculo] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [data, setData] = React.useState('');
  const [horario, setHorario] = React.useState('');
  const [avaliacao] = useState('');

  const Marcar = () => {
    feriados = [
      '01/01/' + new Date().getFullYear(),
      '21/04/' + new Date().getFullYear(),
      '01/05/' + new Date().getFullYear(),
      '07/09/' + new Date().getFullYear(),
      '12/10/' + new Date().getFullYear(),
      '02/11/' + new Date().getFullYear(),
      '15/11/' + new Date().getFullYear(),
      '24/12/' + new Date().getFullYear(),
      '25/12/' + new Date().getFullYear(),
      '31/12/' + new Date().getFullYear(),
    ];

    eferiado = 0;
    dia = data.substring(0, 2);
    mes = data.substring(3, 5);
    ano = data.substring(6, 10);
    hora = horario.substring(0, 2);
    minuto = horario.substring(3, 6);

    dia = parseInt(dia, 10);
    mes = parseInt(mes, 10);
    ano = parseInt(ano, 10);
    hora = parseInt(hora, 10);
    minuto = parseInt(minuto, 10);

    dataatual = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    dataserv = new Date(ano, mes - 1, dia);

    if (veiculo == '' || descricao == '' || data == '' || horario == '') {
      alert('Um ou mais campos obrigatórios vázios.');
    } else {
      for (x = 0; x < feriados.length; x++) {
        if (data == feriados[x]) {
          eferiado = 1;
        }
      }

      if (
        dataserv <= dataatual ||
        hora < 8 ||
        hora >= 20 ||
        dataserv.getDay() == 0 ||
        ano > new Date().getFullYear() ||
        eferiado == 1
      ) {
        if (ano > new Date().getFullYear()) {
          alert('Marcações só para o ano vigente.');
        } else if (dataserv <= dataatual) {
          alert('Marcações só com um dia de antecedência.');
        } else if (eferiado == 1) {
          alert('Não funcionamos nesse feriado.');
        } else if (dataserv.getDay() == 0) {
          alert('Não funcionamos aos domingos.');
        } else if (hora < 8 || hora >= 20) {
          alert('Fora do horário de funcionamento.');
        }
      } else {
        if (minuto < 10) {
          minuto = '0' + minuto;
        }

        if (
          servico == 'Carro - Troca de óleo' ||
          servico == 'Moto - Troca de óleo'
        ) {
          if (dia < 10) {
            dia = '0' + dia;
          }

          if (mes < 10) {
            mes = '0' + mes;
          }

          dataret =
            dia + '/' + mes + '/' + ano + ' - ' + (hora + 2) + ':' + minuto;
        } else {
          if (
            mes == 1 ||
            mes == 3 ||
            mes == 5 ||
            mes == 7 ||
            mes == 8 ||
            mes == 10 ||
            mes == 12
          ) {
            if (dia == 31) {
              dia = 1;
              if (mes == 12) {
                mes = 1;
                ano = ano + 1;
              } else {
                mes = mes + 1;
              }
            } else {
              dia = dia + 1;
            }
          }

          if (mes == 4 || mes == 6 || mes == 7 || mes == 11) {
            if (dia == 30) {
              dia = 1;
              mes = mes + 1;
            } else {
              dia = dia + 1;
            }
          }

          if (mes == 2) {
            if (dia == 28) {
              dia = 1;
              mes = mes + 1;
            } else {
              dia = dia + 1;
            }
          }

          if (dia < 10) {
            dia = '0' + dia;
          }

          if (mes < 10) {
            mes = '0' + mes;
          }

          dataret = dia + '/' + mes + '/' + ano + ' - ' + hora + ':' + minuto;
        }

        banco
          .collection('Servicos')
          .add({
            usuario,
            servico,
            veiculo,
            data,
            dataret,
            descricao,
            avaliacao,
            avaliado: false,
          })
          .then(() => {
            navigation.navigate('Marcado', { dataretor: dataret });
          });
      }
    }
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
          mask={[
            /\d/,
            /\d/,
            '/',
            /\d/,
            /\d/,
            '/',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' - ',
            /\d/,
            /\d/,
            ':',
            /\d/,
            /\d/,
          ]}
        />

        <View style={styles.boxicones}>
          <Icon name="time" size={15} style={styles.icones} />
        </View>
        <MaskInput
          style={styles.campos}
          placeholder={'Hora'}
          value={horario}
          onChangeText={(masked, unmasked) => {
            setHorario(masked);
          }}
          mask={[/\d/, /\d/, ':', /\d/, /\d/]}
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

          <TouchableOpacity style={styles.login} onPress={Marcar}>
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
