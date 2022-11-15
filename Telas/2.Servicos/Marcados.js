import { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modal';

import { banco, auth } from '../../firebase';
import estilos, {fundo, fundosec, fonte, height} from '../0.Outros/Estilos';
import Menu from '../Menu'

const Marcados = ({ navigation }) => {
  const usuario = auth.currentUser.email;

  const [isModalVisible, setModalVisible] = useState(false);
  const [id_serv, setId_serv] = useState();
  const [servico_serv, setServico_serv] = useState();
  const [valor_serv, setValor_serv] = useState();
  const [dataservico_serv, setDataservico_serv] = useState();
  const [oficina_serv, setOficina_serv] = useState();
  const [modelo_serv, setModelo_serv] = useState();
  const [descricao_serv, setDescricao_serv] = useState();

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
            servico: doc.data().servico,
            valor: doc.data().valor,
            oficina: doc.data().oficina,
            modelo: doc.data().modelo,
            descricao: doc.data().descricao,
            data: doc.data().data,
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

  const ConfCancelar = (id, servico, valor, dataservico, oficina, modelo, descricao) => {
    setModalVisible(!isModalVisible);
    setId_serv(id)
    setServico_serv(servico)
    setValor_serv(valor)
    setDataservico_serv(dataservico)
    setOficina_serv(oficina)
    setModelo_serv(modelo)
    setDescricao_serv(descricao)
  }

  const FecharCancelar = () => {
    setModalVisible(!isModalVisible);
  }

  const Cancelar = () => {
    banco
      .collection('Marcados')
      .doc(id_serv)
      .delete()
      setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <Menu />

      <Text style={estilos.titulo}>Serviços marcados</Text>

        <FlatList
          data={data}
          renderItem={({ item }) => {
            if (item.dataserv > dataatual) {
              return (
                <View style={estilos.marcados}>
                  <View
                    style={estilos.marcados_info}>
                    <Text style={estilos.marcados_veiculo}>{item.servico} - R$ {item.valor}</Text>
                    <Text style={estilos.marcados_data}>{item.data}</Text>
                  </View>

                  <View style={[estilos.marcados_info,{ borderTopColor: fonte, borderTopWidth: 1}]}>
                    <Text style={estilos.marcados_descricao}>{item.oficina}</Text>
                    <Text style={estilos.marcados_descricao}>{item.modelo}</Text>
                    <Text style={estilos.marcados_descricao}>{item.descricao}</Text>
                      <TouchableOpacity
                        onPress={() => ConfCancelar(item.id, item.servico, item.valor, item.data, item.oficina, item.modelo, item.descricao)}>
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
                      <Text style={estilos.marcados_veiculo}>{item.servico} - R$ {item.valor}</Text>
                      <Text style={estilos.marcados_data}>{item.data}</Text>
                    </View>

                    <View style={[estilos.marcados_info,{ borderTopColor: fonte, borderTopWidth: 1}]}>
                      <Text style={estilos.marcados_descricao}>{item.oficina}</Text>
                      <Text style={estilos.marcados_descricao}>{item.modelo}</Text>
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
                      <Text style={estilos.marcados_veiculo}>{item.servico} - R$ {item.valor}</Text>
                      <Text style={estilos.marcados_data}>{item.data}</Text>
                    </View>

                    <View style={[estilos.marcados_info,{ borderTopColor: fonte, borderTopWidth: 1}]}>
                      <Text style={estilos.marcados_descricao}>{item.oficina}</Text>
                      <Text style={estilos.marcados_descricao}>{item.modelo}</Text>
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
          <View style={[estilos.modal_content, { height: height * 0.2}]}>      
            <View style={estilos.marcados}>
              <View
                style={estilos.marcados_info}>
                <Text style={estilos.marcados_veiculo}>{servico_serv} - R$ {valor_serv}</Text>
                <Text style={estilos.marcados_data}>{dataservico_serv}</Text>
              </View>

              <View style={[estilos.marcados_info,{ borderTopColor: fonte, borderTopWidth: 1}]}>
                <Text style={estilos.marcados_descricao}>{oficina_serv}</Text>
                <Text style={estilos.marcados_descricao}>{modelo_serv}</Text>
                <Text style={estilos.marcados_descricao}>{descricao_serv}</Text>
              </View>
            </View>
            
            <View style={estilos.acao_gp}>
              <TouchableOpacity
                style={estilos.acao}
                onPress={FecharCancelar}
              >
                  Não
                  <Icon
                    name="arrow-back"
                    size={20}
                    style={estilos.acao_icone}
                  />
              </TouchableOpacity>

              <TouchableOpacity
                style={estilos.acao}
                onPress={() => Cancelar(id_serv)}
              >
                  Sim
                  <Icon
                    name="trash"
                    size={20}
                    style={estilos.acao_icone}
                  />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

    </ScrollView>
  );
};
export default Marcados;