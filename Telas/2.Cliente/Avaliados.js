import {useState} from "react";
import {
  ScrollView,
  Text,
  View,
  FlatList,
} from "react-native";

import { banco, auth } from "../../firebase";
import estilos from "../Estilos"
import Menu from "../0.Extras/Menu"

const Avaliados = () => {
  const user = auth.currentUser;
  if (user != null) {
    usuario = user.email;
  }

  let dados = [];

  const [data, setData] = useState([]);

  banco.collection("Marcados").where("usuario" , "==", usuario).where("avaliado", "==", true).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      dataservico = doc.data().dataservico.toDate();
      dataservico = dataservico.toLocaleString(
      ["pt-BR"],
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
      )

      const marcados_info = {
        servico: doc.data().servico,
        oficina: doc.data().oficina,
        modelo: doc.data().modelo,
        dataservico: dataservico,
        observacoes: doc.data().observacoes,
        avaliacao: doc.data().avaliacao,
        };

        dados.push(marcados_info);
    });

    dados.sort((a, b) => (a.dataservico < b.dataservico) ? 1 : -1)
    setData(dados);
  });

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <Menu />

      <Text style={estilos.titulo}>Serviços avaliados</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={estilos.lista_grupo_listas}>
              <View style={estilos.lista}>
                <Text style={estilos.lista_texto}>{item.dataservico}</Text>
                <Text style={estilos.lista_texto}>{item.servico}</Text>
                <View style={estilos.lista_separador}></View>
                <Text style={estilos.lista_texto}>{item.oficina}</Text>
                <Text style={estilos.lista_texto}>{item.modelo}</Text>
                <Text style={estilos.lista_texto}>{item.observacoes}</Text>
                <View style={estilos.lista_separador}></View>
                <Text style={estilos.lista_texto}>{item.avaliacao}</Text>
              </View>
            </View>
          )
        }}
      />
    </ScrollView>
  );
};
export default Avaliados;