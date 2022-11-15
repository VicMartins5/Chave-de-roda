import { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import { banco, auth } from '../../../firebase';

import estilos, {fundo, fundosec, fonte} from '../../0.Outros/Estilos';
import DropDownPicker from 'react-native-dropdown-picker'

const AdminServicos = ({ navigation }) => {
  const Deslogar = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };
  
  let dados = [];
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [veiculo, setVeiculo] = useState([
    {label: 'Carro', value: 'Carro'},
    {label: 'Moto', value: 'Moto'},
    {label: 'Bicicleta', value: 'Bicicleta'},
  ]);

  const Servicos = () => {
    banco
      .collection('Servicos')
      .where('veiculo', '==', value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const servicos_cadastrados = {
            id: doc.id,
            veiculo: doc.data().veiculo,
            servico: doc.data().servico,
            valor: doc.data().valor,
          };
          dados.push(servicos_cadastrados);
        });

        dados.sort((a, b) => (a.servico > b.servico) ? 1 : -1)

        setData(dados);
      });
  };

  useEffect(() => {
    Servicos();
  },);

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <Text style={estilos.titulo}>Serviços</Text>

      <View style={estilos.menu}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminServicos')}
          style={estilos.menu_admin_botao}>
            <Icon
              name="build"
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AdminOficinas')}
          style={estilos.menu_admin_botao}>
            <Icon
              name="business"
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={Deslogar}
          style={estilos.menu_admin_botao}>
            <Icon
              name="log-out"
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>
      </View>

        <View style={estilos.menu_servicos}>
          <TouchableOpacity
            style={estilos.menu_servico_botao} 
            onPress={() => navigation.navigate('CriarServico')}
          >
              <Text style={estilos.acao_texto}>Novo</Text>
              <Icon
                name="add"
                size={20}
                style={estilos.acao_icone} 
              />
          </TouchableOpacity>
          
          <DropDownPicker
            open={open}
            value={value}
            items={veiculo}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setVeiculo}
            placeholder=
            "Cidade"
            placeholderStyle={{
              padding: 0,
              fontSize: 15
            }}
            style={[estilos.input_opcoes,{ borderBottomColor: fonte, width: '48%'}]} 
            textStyle={{color: fonte, fontSize: 15, fontWeight: 500}}
            dropDownContainerStyle={{backgroundColor: fundo, borderWidth: 0}}
            listItemLabelStyle={{textAlign: 'left'}}
            showTickIcon={false}
            arrowIconStyle={{tintColor: fonte}}
          />
        </View>

        <FlatList
          data={data}
          renderItem={({ item }) => {
              return (
                <View style={estilos.servicos}>
                  <View
                    style={estilos.servicos_info}>
                    <Text style={estilos.marcados_descricao}>{item.veiculo}</Text>
                    <Text style={estilos.marcados_descricao}>{item.servico} - R$ {item.valor}</Text>
                  </View>

                  <View style={estilos.servicos_gp_acoes}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ExcluirServico', {
                          id: item.id,
                          veiculo: item.veiculo,
                          servico: item.servico,
                          valor: item.valor,
                        })
                      }
                    >
                      <Icon
                        name="trash"
                        size={15}
                        style={estilos.marcados_icones}
                      />
                    </TouchableOpacity>
                        
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditarServico', {
                        id: item.id,
                        veiculo: item.veiculo,
                        servico: item.servico,
                        })
                      }
                    >
                      <Icon
                        name="create"
                        size={15}
                        style={[estilos.marcados_icones,{ marginBottom: 0,}]} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
          }}
        />
    </ScrollView>
  );
};
export default AdminServicos;