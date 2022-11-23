import {useState, useEffect} from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  FlatList,
  Linking
} from "react-native";

import { banco } from "../../firebase";
import Menu from "../0.Extras/Menu"
import estilos from "../Estilos"

import Icon from "@expo/vector-icons/Ionicons";

const Oficinas = () => {
  let dados = [];
  const [data, setData] = useState([]);

  const [cidade, setCidade] = useState("");
  const [numeroOficinas, setNumeroOficinas] = useState("");

  const Oficinas = () => {
    banco.collection("Oficinas").orderBy("cidade").startAt(cidade).endAt(cidade + "\uf8ff").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const oficinas = {
          id: doc.id,
          cidade: doc.data().cidade,
          bairro: doc.data().bairro,
          endereco: doc.data().endereco,
          mapa: "https://www.google.com/maps/search/?api=1&query=" + doc.data().latitude + "," + doc.data().longitude,
          telefone: doc.data().telefone,
          telefone2: doc.data().telefone2,
        };

        dados.push(oficinas);
      });

      dados.sort((a, b) => (a.bairro > b.bairro) ? 1 : -1)

      setData(dados);
      var numero = data.length
      if (numero == 1) {
        setNumeroOficinas(numero + " resultado")
      }
      
      else {
        setNumeroOficinas(numero + " resultados")
      }
    });
  }

  useEffect(() => {
    Oficinas();
  },);

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <Menu />

      <Text style={estilos.titulo}>Oficinas</Text>

      <View style={estilos.input_grupo}>
        <Icon
          name="search-outline"
          style={estilos.input_icone}
        />
        <TextInput
          style={[estilos.input_campo, {width: "46%"}]}
          placeholder={"Cidade"}
          value={cidade}
          onChangeText={(text) => setCidade(text)}
          keyboardType={"text"}
        />

        <Text style={[estilos.input_campo, {width: "46%", marginLeft: "2%"}]}>{numeroOficinas}</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
          <View style={estilos.lista_grupo_listas}>
            <View style={[estilos.lista, estilos.lista_acoes_ajustes]}>
              <Text style={estilos.lista_texto}>{item.cidade} - {item.bairro}</Text>
              <Text style={estilos.lista_texto}>{item.endereco}</Text>
              <Text style={estilos.lista_texto}>{item.telefone} / {item.telefone2}</Text>
            </View>
            
            <View style={estilos.lista_grupo_acoes}>
              <Icon
                name="location-sharp"
                style={estilos.lista_acoes_icones}
                onPress={() => Linking.openURL(item.mapa)}
              />
            </View>
          </View>
          );
        }}
      />

    </ScrollView>
  )
};
export default Oficinas;