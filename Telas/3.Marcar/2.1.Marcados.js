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
import { banco, auth } from '../../firebase';

import estilos from '../0.Outros/Estilos'

const Marcados = ({ navigation }) => {
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

  var dataatual = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const ServicosMarcados = () => {
    banco
      .collection('Marcados')
      .where('usuario', '==', usuario)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const marcados_info = {
            id: doc.id,
            veiculo: doc.data().veiculo,
            data: doc.data().data,
            servico: doc.data().servico,
            descricao: doc.data().descricao,
            dataserv: new Date(
              (ano = parseInt(doc.data().data.substring(6, 10), 10)),
              parseInt(doc.data().data.substring(3, 5), 10) - 1,
              parseInt(doc.data().data.substring(0, 2), 10)
            ),
            avaliado: doc.data().avaliado,
          };
          dados.push(marcados_info);
        });

        dados.sort((a, b) => (a.dataserv < b.dataserv) ? 1 : -1)

        setData(dados);
      });
  };

  useEffect(() => {
    ServicosMarcados();
  },);

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <Text style={estilos.titulo}>Serviços marcados</Text>

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
          style={estilos.menu_botao}>
            <Icon
              name="calendar"
              size={25}
              style={estilos.menu_icones}
            />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Avaliados')}
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
          renderItem={({ item }) => {
            if (item.dataserv > dataatual) {
              return (
                <View style={estilos.marcados}>
                  <View
                    style={estilos.marcados_info}>
                    <Text style={estilos.marcados_veiculo}>{item.veiculo}</Text>
                    <Text style={estilos.marcados_data}>{item.data}</Text>
                  </View>

                  <View style={estilos.marcados_info}>
                    <Text style={estilos.marcados_descricao}>{item.servico}</Text>
                    <Text style={estilos.marcados_descricao}>{item.descricao}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Cancelar', {
                            id: item.id,
                            veiculo: item.veiculo,
                            servico: item.servico,
                            data: item.data,
                            descricao: item.descricao,
                          })
                        }
                      >
                        <Icon
                          name="trash"
                          size={15}
                          style={estilos.marcados_icones}
                        />
                      </TouchableOpacity>
                  </View>
                </View>
              );
            } else {
              if (item.avaliado === true) {
                return (
                  <View style={estilos.marcados}>
                    <View
                      style={estilos.marcados_info}>
                      <Text style={estilos.marcados_veiculo}>{item.veiculo}</Text>
                      <Text style={estilos.marcados_data}>{item.data}</Text>
                    </View>

                    <View style={estilos.marcados_info}>
                      <Text style={estilos.marcados_descricao}>{item.servico}</Text>
                      <Text style={estilos.marcados_descricao}>{item.descricao}</Text>
                    </View>
                  </View>
                );
              }

              if (item.avaliado === false) {
                return (
                  <View style={estilos.marcados}>
                    <View
                      style={estilos.marcados_info}>
                      <Text style={estilos.marcados_veiculo}>{item.veiculo}</Text>
                      <Text style={estilos.marcados_data}>{item.data}</Text>
                    </View>

                    <View style={estilos.marcados_info}>
                      <Text style={estilos.marcados_descricao}>{item.servico}</Text>
                      <Text style={estilos.marcados_descricao}>{item.descricao}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Avaliar', {
                              id: item.id,
                              veiculo: item.veiculo,
                              servico: item.servico,
                              descricao: item.descricao,
                              data: item.data,
                            })
                          }
                        >
                          <Icon
                            name="star"
                            size={15}
                            style={estilos.marcados_icones}
                          />
                        </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            }
          }}
        />
    </ScrollView>
  );
};
export default Marcados;