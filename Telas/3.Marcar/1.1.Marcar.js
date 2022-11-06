import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import MaskInput from 'react-native-mask-input';

import { banco, auth } from '../../firebase';
import estilos from '../0.Outros/Estilos'

const Marcar = ({ navigation, route }) => {
  const usuario = auth.currentUser.email;
  servico = route.params;

  servico = "Carro - Troca de óleo";

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
      alert('Um ou mais input obrigatórios vázios.');
    } 
    
    else if (dia > 28 || mes > 12) {
      if (mes == 4 || mes == 6 || mes == 7 || mes == 11) {
        if (dia > 30) {
          alert("Data inválida!")
        } 
      }

      if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
        if (dia > 31) {
          alert("Data inválida!")
        }
      }
      if (mes == 2) {
        if (dia > 28) {
          alert("Data inválida!")
        }
      }
    } 

    else {
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
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      
      <Text style={estilos.titulo}>Marcação</Text>

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
        <TextInput
          style={estilos.input}
          placeholder={'Modelo'}
          onChangeText={setVeiculo}
          value={veiculo}
          keyboardType={'text'}
        >
        </TextInput>

        <Icon
          name="build-outline"
          size={15}
          style={estilos.input_icone} 
        />
        <TextInput
          style={estilos.input}
          placeholder={'Descrição do serviço'}
          keyboardType={'text'}
          multiline={true}
          onChangeText={setDescricao}
          value={descricao}
          numberOfLines={3}
        >
        </TextInput>

        <Icon
          name="calendar-outline"
          size={15}
          style={estilos.input_icone}
        />
        <MaskInput
          style={estilos.input}
          placeholder={'Data'}
          value={data}
          onChangeText={(masked, unmasked) => {setData(masked);}}
          mask={[ /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' - ', /\d/, /\d/, ':', /\d/, /\d/]}
        />

        <Icon
          name="time-outline"
          size={15}
          style={estilos.input_icone}
        />
        <MaskInput
          style={estilos.input}
          placeholder={'Hora'}
          value={horario}
          onChangeText={(masked, unmasked) => {setHorario(masked);}}
          mask={[/\d/, /\d/, ':', /\d/, /\d/]}
        />
      </View>

      <View style={estilos.acao_gp}>
        <TouchableOpacity
          style={estilos.acao}
          onPress={() => navigation.navigate('Veiculo')}
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
          onPress={Marcar}
        >
            Marcar
            <Icon
              name="cog"
              size={20}
              style={estilos.acao_icone}
            />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Marcar;