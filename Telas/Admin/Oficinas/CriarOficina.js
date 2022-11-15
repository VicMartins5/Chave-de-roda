import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker'

import { banco, auth } from '../../../firebase';
import estilos, {fundo, fundosec, fonte} from '../../0.Outros/Estilos';

const Cadastro = ({ navigation }) => {
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [veiculo, setVeiculo] = useState([
    {label: 'Carro', value: 'Carro'},
    {label: 'Moto', value: 'Moto'},
    {label: 'Bicicleta', value: 'Bicicleta'},
  ]);

  const Cadastrar = () => {
    if (veiculo == '' || servico == ''|| valor == '') {
      alert('Um ou mais campos vazios.');
    }
    else {
      banco.collection('Servicos').add({
        veiculo: value,
        servico,
        valor,
      })
      .then(() => {
        navigation.navigate('CadastroFeito');
      })
      .catch(error => alert(error.message))
    }
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      
      <Text style={estilos.titulo}>Cadastrar serviço</Text>

      <View style={estilos.input_gp}>
        <DropDownPicker
          open={open}
          value={value}
          items={veiculo}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setVeiculo}
          placeholder=
          "Selecione um veículo"
          placeholderStyle={{
            padding: 0,
            fontSize: 15
          }}
          style={[estilos.input_opcoes,{ borderBottomColor: fonte}]} 
          textStyle={{color: fonte, fontSize: 15}}
          dropDownContainerStyle={{backgroundColor: fundo, borderWidth: 0}}
          listItemLabelStyle={{textAlign: 'left'}}
          showTickIcon={false}
          arrowIconStyle={{tintColor: fonte}}
        />

        <Icon
          name="build-outline"
          size={15} 
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input}
          placeholder={'Serviço'}
          value={servico}
          onChangeText={(text) => setServico(text)}
          keyboardType={'text'}
        />

        <Icon
          name="cash-outline"
          size={15} 
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input}
          placeholder={'Valor'}
          value={valor}
          onChangeText={(text) => setValor(text)}
          keyboardType={'numeric'}
        />
      </View>

      <View style={estilos.acao_gp}>
        <TouchableOpacity
          style={estilos.acao}
          onPress={() => navigation.navigate('AdminServicos')}
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
          onPress={Cadastrar}
        >
            Cadastrar
            <Icon
              name="build"
              size={20}
              style={estilos.acao_icone}
            />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Cadastro;