import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";

import { banco } from "../../firebase";
import estilos from "../Estilos"
import Menu from "../0.Extras/Menu"

const Servicos = ({ navigation, route }) => {
  const { veiculo } = route.params;

  let dados = [];
  const [data, setData] = useState([]);

  banco.collection("Servicos").where("veiculo", "==", veiculo).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    valor = doc.data().valor;

    if(valor == 0.01) {
      valor = "A combinar";
    }

    else {
      valor = "R$ " + doc.data().valor + ",00";
    }
    
    const servicos_cadastrados = {
      servico: doc.data().servico,
      valor: valor,
    };
    
    dados.push(servicos_cadastrados);
    
    });

    dados.sort((a, b) => (a.servico > b.servico ? 1 : -1));
    setData(dados);
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
              navigation.navigate("Marcar", {
              veiculo: veiculo,
              servico: item.servico,
              valor: item.valor,
              })
            }>
              <View style={estilos.lista}>
                <Text style={estilos.lista_texto}>{item.servico} - {item.valor}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
};

export default Servicos;
