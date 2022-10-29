import React, { useEffect, useState } from 'react';
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
import Menu from '../Menu.js';

const Marcados = ({ navigation }) => {
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
      .collection('Servicos')
      .where('usuario', '==', usuario)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const info = {
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
          dados.push(info);
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
      style={styles.main}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Menu />

      <View style={{ paddingHorizontal: '10%' }}>
        <Text style={styles.titulo}>Serviços marcados</Text>

        <FlatList
          data={data}
          renderItem={({ item }) => {
            if (item.dataserv > dataatual) {
              return (
                <View style={styles.marcados}>
                  <View
                    style={[
                      styles.info,
                      { borderBottomColor: '#ffa500', borderBottomWidth: 1 },
                    ]}>
                    <Text style={styles.veiculo}>{item.veiculo}</Text>
                    <Text style={styles.data}>{item.data}</Text>
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.desc}>{item.servico}</Text>
                    <Text style={styles.desc}>{item.descricao}</Text>
                    <View style={styles.gpicones}>
                      <TouchableOpacity>
                        <Icon
                          name="trash"
                          size={15}
                          style={styles.icones}
                          onPress={() =>
                            navigation.navigate('Cancelar', {
                              id: item.id,
                              veiculo: item.veiculo,
                              servico: item.servico,
                              data: item.data,
                              descricao: item.descricao,
                            })
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            } else {
              if (item.avaliado === true) {
                return (
                  <View style={styles.marcados}>
                    <View
                      style={[
                        styles.info,
                        { borderBottomColor: '#ffa500', borderBottomWidth: 1 },
                      ]}>
                      <Text style={styles.veiculo}>{item.veiculo}</Text>
                      <Text style={styles.data}>{item.data}</Text>
                    </View>

                    <View style={styles.info}>
                      <Text style={styles.desc}>{item.servico}</Text>
                      <Text style={styles.desc}>{item.descricao}</Text>
                    </View>
                  </View>
                );
              }

              if (item.avaliado === false) {
                return (
                  <View style={styles.marcados}>
                    <View
                      style={[
                        styles.info,
                        { borderBottomColor: '#ffa500', borderBottomWidth: 1 },
                      ]}>
                      <Text style={styles.veiculo}>{item.veiculo}</Text>
                      <Text style={styles.data}>{item.data}</Text>
                    </View>

                    <View style={styles.info}>
                      <Text style={styles.desc}>{item.servico}</Text>
                      <Text style={styles.desc}>{item.descricao}</Text>
                      <View style={styles.gpicones}>
                        <TouchableOpacity>
                          <Icon
                            name="star"
                            size={15}
                            style={styles.icones}
                            onPress={() =>
                              navigation.navigate('Avaliar', {
                                id: item.id,
                                veiculo: item.veiculo,
                                servico: item.servico,
                                data: item.data,
                              })
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }
            }
          }}
        />
      </View>
    </ScrollView>
  );
};
export default Marcados;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#222222',
  },

  titulo: {
    color: '#ffa500',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },

  marcados: {
    backgroundColor: '#383838',
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    height: 'auto',
    flex: 1,
    alignItems: 'top',
  },

  info: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    flexWrap: 'wrap',
    padding: 10,
  },

  veiculo: {
    width: '40%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffa500',
  },

  data: {
    width: '60%',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffa500',
  },

  desc: {
    width: '90%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffa500',
  },

  gpicones: {
    flexDirection: 'column',
    marginLeft: '5%',
    width: '5%',
    flexWrap: 'wrap',
  },

  icones: {
    color: '#ffa500',
    marginBottom: 10,
  },
});
