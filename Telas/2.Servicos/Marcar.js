import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Image
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import MaskInput from 'react-native-mask-input';
import DropDownPicker from 'react-native-dropdown-picker'
import Modal from 'react-native-modal';

import { banco, auth } from '../../firebase';
import estilos, {fundo, fonte} from '../0.Outros/Estilos';

const Marcar = ({ navigation, route }) => {
  const usuario = auth.currentUser.email;
  const { veiculo, servico, valor } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [oficina, setOficina] = useState([
    {label: 'Jardim América', value: 'Jardim América'},
    {label: 'Montese', value: 'Montese'},
    {label: 'Parangaba', value: 'Parangaba'},
  ]);

  const [modelo, setModelo] = React.useState('');
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

    if (value == '' || modelo == '' || descricao == '' || data == '' || horario == '' || data.length < 10) {
      alert('Um ou mais input obrigatórios vázios.');
    } 
    
    else if ((mes == 4 || mes == 6 || mes == 7 || mes == 11) && dia > 30) {
      alert("Data inválida!")
    }

    else if ((mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) && dia > 31) {
      alert("Data inválida!")
    }

    else if (mes == 2 && dia > 28) {
      alert("Data inválida!")
    }

    else if (minuto > 59) {
      alert("Data inválida!")
    }

    else {
      for (x = 0; x < feriados.length; x++) {
        if (data == feriados[x]) {
          eferiado = 1;
        }
      }

      if ( dataserv.getTime() <= dataatual.getTime() || hora < 8 || hora >= 18 || dataserv.getDay() == 0 || ano > new Date().getFullYear() || eferiado == 1 ) {
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

        if ( servico == 'Troca de óleo') {
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
            servico: veiculo + ': ' + servico,
            valor,
            oficina: value,
            modelo,
            descricao,
            data,
            dataret,
            avaliacao,
            avaliado: false,
          })

          setModalVisible(!isModalVisible);

          if (isModalVisible == false) {
            setTimeout(() => {
            navigation.navigate('Marcados');
            setModalVisible(false);
            }, 4000);
          }

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
          name="cash-outline"
          size={15}
          style={estilos.input_icone}
        />
        <Text style={estilos.input}>R$ {valor}</Text>

        <View style={estilos.menu_servicos}>
          <Icon
            name="business-outline"
            size={15}
            style={[estilos.input_icone,{marginTop: 3}]} 
          />
          <DropDownPicker
            open={open}
            value={value}
            items={oficina}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setOficina}
            placeholder=
            "Selecione a oficina"
            placeholderStyle={{
              padding: 0,
              fontSize: 15
            }}
            style={[estilos.input_opcoes,{ borderBottomColor: fonte, width: '95%'}]} 
            textStyle={{color: fonte, fontSize: 15, fontWeight: 500}}
            dropDownContainerStyle={{backgroundColor: fundo, borderWidth: 0}}
            listItemLabelStyle={{textAlign: 'left'}}
            showTickIcon={false}
            arrowIconStyle={{tintColor: fonte}}
          />
        </View>

        <Icon
          name="car-outline"
          size={15}
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input}
          placeholder={'Modelo'}
          onChangeText={setModelo}
          value={modelo}
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

      <Modal
        isVisible={isModalVisible}
        animationIn={'slideInDown'}
        animationOut={'slideOutDown'}
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        style={estilos.modal}
        transparent
      >
        <View style={estilos.modal_content}>      
          <Image
            style={estilos.logo}
            source={require('../../Imagens/Logo.svg')}
          />
          <Text style={estilos.titulo}>Serviço marcado com sucesso.</Text>
          <Text style={[estilos.titulo, { fontSize: '10', marginTop: 20 }]}>Data prevista para devolução do veículo: {dataret}</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Marcar;