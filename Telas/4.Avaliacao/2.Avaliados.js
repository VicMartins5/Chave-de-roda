import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';

import { banco, auth } from '../../firebase';
import Menu from '../Menu.js';

const Avaliados = () => {
  const usuario = auth.currentUser.email;

  let dados = [];

  const [data, setData] = useState([]);

  const ServicosAvaliados = () => {
    banco
      .collection('Servicos')
      .where('usuario', '==', usuario)
      .where('avaliado', '==', true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const info = {
            veiculo: doc.data().veiculo,
            data: doc.data().data,
            servico: doc.data().servico,
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
      style={styles.main}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Menu />

      <View style={{ paddingHorizontal: '10%' }}>
        <Text style={styles.titulo}>Serviços avaliados</Text>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.marcados}>
              <View
                style={[
                  styles.info,
                  { borderBottomColor: '#ffa500', borderBottomWidth: 1 },
                ]}>
                <Text style={styles.veiculo}>{item.veiculo}</Text>
                <Text style={styles.data}>{item.data}</Text>
              </View>

              <View
                style={[
                  styles.info,
                  { borderBottomColor: '#ffa500', borderBottomWidth: 1 },
                ]}>
                <Text style={styles.desc}>{item.servico}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.desc}>{item.avaliacao}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};
export default Avaliados;

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
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffa500',
  },
});
