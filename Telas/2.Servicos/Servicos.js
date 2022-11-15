import { useEffect, useState } from 'react';
import {
  Text,
  ScrollView,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';

import { banco } from '../../firebase';
import estilos, { fundo, fundosec, fonte } from '../0.Outros/Estilos';
import Menu from '../Menu';

const Servicos = ({ navigation, route }) => {
  const { veiculo } = route.params;

  let dados = [];
  const [data, setData] = useState([]);

  const Servicos = () => {
    banco
      .collection('Servicos')
      .where('veiculo', '==', veiculo)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const servicos_cadastrados = {
            servico: doc.data().servico,
            valor: doc.data().valor,
          };
          dados.push(servicos_cadastrados);
        });

        dados.sort((a, b) => (a.servico > b.servico ? 1 : -1));

        setData(dados);
      });
  };

  useEffect(() => {
    Servicos();
  });

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Menu />

      <Text style={estilos.titulo}>Selecione o serviço</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
              navigation.navigate('Marcar', {
              veiculo: veiculo,
              servico: item.servico,
              valor: item.valor,
              })
            }>
              <View style={estilos.marcados}>
                <View style={estilos.marcados_info}>
                  <Text style={estilos.marcados_veiculo}>{item.servico}</Text>
                  <Text style={estilos.marcados_data}>R$ {item.valor}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
};

export default Servicos;
