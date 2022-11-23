import {useState} from "react";
import {
  ScrollView,
  Text,
  FlatList,
  View,
} from "react-native";

import {banco} from "../../../firebase";
import estilos from "../../Estilos"
import MenuAdmin from "../../0.Extras/MenuAdmin"

const AdminMarcados = () => {
  let dados = [];
  const [data, setData] = useState([]);

  banco.collection("Marcados").where("avaliado", "==", false).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      dataservico = doc.data().dataservico.toDate();
      dataservico = dataservico.toLocaleString(
      ["pt-BR"],
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }
      )

      const marcados_info = {
        usuario: doc.data().usuario,
        servico: doc.data().servico,
        oficina: doc.data().oficina,
        modelo: doc.data().modelo,
        observacoes: doc.data().observacoes,
        dataservico: dataservico,
        dataservicosf: doc.data().dataservico.toDate(),
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

      <MenuAdmin />

      <Text style={estilos.titulo}>Serviços marcados</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => {
          dataser = item.dataservicosf
          if (dataser.getTime() > new Date().getTime()) {
            return (
            <View style={estilos.lista_grupo_listas}>
              <View style={estilos.lista}>
                <Text style={estilos.lista_texto}>{item.dataservico}</Text>
                <Text style={estilos.lista_texto}>{item.usuario}</Text>
                <View style={estilos.lista_separador}></View>
                <Text style={estilos.lista_texto}>{item.oficina}</Text>
                <Text style={estilos.lista_texto}>{item.servico}</Text>
                <Text style={estilos.lista_texto}>{item.modelo}</Text>
                <Text style={estilos.lista_texto}>{item.observacoes}</Text>
              </View>
            </View>
            );
          }
        }}
      />
    </ScrollView>
  );
};

export default AdminMarcados;