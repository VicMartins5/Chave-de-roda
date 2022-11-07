import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';

import { banco, auth } from '../../firebase';
import estilos from '../0.Outros/Estilos'

const Avaliados = ({ navigation }) => {
  const Deslogar = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };
  
  const usuario = auth.currentUser.email;

  let dados = [];

  const [data, setData] = useState([]);

  const ServicosAvaliados = () => {
    banco
      .collection('Marcados')
      .where('usuario', '==', usuario)
      .where('avaliado', '==', true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const info = {
            veiculo: doc.data().veiculo,
            data: doc.data().data,
            servico: doc.data().servico,
            descricao: doc.data().descricao,
            dataserv: new Date(
              (ano = parseInt(doc.data().data.substring(6, 10), 10)),
              parseInt(doc.data().data.substring(3, 5), 10) - 1,
              parseInt(doc.data().data.substring(0, 2), 10)
            ),
            avaliacao: doc.data().avaliacao,
          };
          dados.push(info);
        });

        dados.sort((a, b) => (a.dataserv < b.dataserv ? 1 : -1));

        setData(dados);
      });
  };

  useEffect(() => {
    ServicosAvaliados();
  },);

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <Text style={estilos.titulo}>Serviços avaliados</Text>

      <View style={estilos.menu}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Veiculo')}
          style={estilos.menu_botao}>
            <Icon
              name="car"
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Marcados')}
          style={estilos.menu_botao}>
            <Icon
              name="calendar"
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.menu_botao}>
            <Icon
              name="star"
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={Deslogar}
          style={estilos.menu_botao}>
            <Icon
              name="log-out"
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={estilos.marcados}>
            <View style={estilos.marcados_info}>
              <Text style={estilos.marcados_veiculo}>{item.veiculo}</Text>
              <Text style={estilos.marcados_data}>{item.data}</Text>
            </View>

            <View
              style={estilos.marcados_info}>
              <Text style={estilos.marcados_descricao}>{item.servico}</Text>
              <Text style={estilos.marcados_descricao}>{item.descricao}</Text>
            </View>

            <View style={estilos.marcados_info}>
              <Text style={estilos.marcados_descricao}>{item.avaliacao}</Text>
            </View>
        </View>
        )}
      />
    </ScrollView>
  );
};
export default Avaliados;