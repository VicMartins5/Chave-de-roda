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
  const { servico } = route.params;

  const [veiculo, setVeiculo] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [data, setData] = React.useState('');
  const [horario, setHorario] = React.useState('');
  const [avaliacao] = useState('');

  const Marcar = () => {
    dia = parseInt(data.substring(0, 2), 10);
    mes = parseInt(data.substring(3, 5), 10);
    ano = parseInt(data.substring(6, 10), 10);
    hora = parseInt(horario.substring(0, 2), 10);
    minuto = parseInt(horario.substring(3, 6), 10);

    feriados = [
      '01/01/' + ano,
      '21/04/' + ano,
      '01/05/' + ano,
      '07/09/' + ano,
      '12/10/' + ano,
      '02/11/' + ano,
      '15/11/' + ano,
      '24/12/' + ano,
      '25/12/' + ano,
      '31/12/' + ano,
    ];

    eferiado = 0;

    dataatual = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    dataserv = new Date(ano, mes - 1, dia);

    if (veiculo == '' || descricao == '' || data == '' || horario == '' || data.length < 10) {
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

      if (mes == 2 && dia > 28) {
        alert("Data inválida!")
      }
    }

    else {
      for (x = 0; x < feriados.length; x++) {
        if (data == feriados[x]) {
          eferiado = 1;
        }
      }

      if ( dataserv.getTime() <= dataatual.getTime() || hora < 8 || hora >= 20 || dataserv.getDay() == 0 || ano > new Date().getFullYear() || eferiado == 1 ) {
        if (ano > new Date().getFullYear()) {
          alert('Marcações só para o ano vigente.');
        }
        
        else if (dataserv.getTime() <= dataatual.getTime()) {
          alert('Marcações só com um dia de antecedência.');
        }
        
        else if (eferiado == 1) {
          alert('Não funcionamos nesse feriado.');
        }
        
        else if (dataserv.getDay() == 0) {
          alert('Não funcionamos aos domingos.');
        }
        
        else if (hora < 8 || hora >= 18) {
          alert('Fora do horário de funcionamento.');
        }
      }
      
      else {
        if (minuto < 10) {
          minuto = '0' + minuto;
        }

        if ( servico == 'Carro - Troca de óleo' || servico == 'Moto - Troca de óleo' ) {
          if (dia < 10) {
            dia = '0' + dia;
          }

          if (mes < 10) {
            mes = '0' + mes;
          }

          dataret = dia + '/' + mes + '/' + ano + ' - ' + (hora + 2) + ':' + minuto;
        }
        
        else {
          dataserv.setDate(dataserv.getDate() + 1);

          dia = dataserv.getDate();
          mes = dataserv.getMonth() + 1;
          ano = dataserv.getFullYear();

          if (dia < 10) {
            dia = '0' + dia;
          }

          if (mes < 10) {
            mes = '0' + mes;
          }

        if (hora < 10) {
          hora = '0' + hora;
        }

        if (minuto < 10) {
          minuto = '0' + minuto;
        }

          dataret = dia + '/' + mes + '/' + ano + ' - ' + hora + ':' + minuto;
        }

        banco
          .collection('Marcados')
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