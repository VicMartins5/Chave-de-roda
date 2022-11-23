import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity 
} from "react-native";

import { banco } from "../../../firebase";
import MenuAdmin from "../../0.Extras/MenuAdmin"
import estilos from "../../Estilos"

import Icon from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";

const AdminOficinas = ({ navigation }) => {
  let dados = [];
  const [data, setData] = useState([]);

  const [modalExclusao, setModalExclusao] = useState(false);
  const [id, setId] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefone2, setTelefone2] = useState("");

  const Oficinas = () => {
    banco.collection("Oficinas").orderBy("cidade").startAt(cidade).endAt(cidade + "\uf8ff").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const oficinas = {
          id: doc.id,
          cidade: doc.data().cidade,
          bairro: doc.data().bairro,
          endereco: doc.data().endereco,
          latitude: doc.data().latitude,
          longitude: doc.data().longitude,
          telefone: doc.data().telefone,
          telefone2: doc.data().telefone2,
        };

        dados.push(oficinas);
      });

      dados.sort((a, b) => (a.bairro > b.bairro) ? 1 : -1)
      setData(dados);
    });
  }

  useEffect(() => {
    Oficinas();
  },);

  const ConfExcluir = (id, cidade, bairro, endereco, telefone, telefone2) => {
    setModalExclusao(!modalExclusao);
    setId(id)
    setCidade(cidade)
    setBairro(bairro)
    setEndereco(endereco)
    setTelefone(telefone)
    setTelefone2(telefone2)
  }

  const FecharExcluir = () => {
    setModalExclusao(!modalExclusao);
  }

  const Excluir = () => {
    banco.collection("Oficinas").doc(id).delete()
    setModalExclusao(!modalExclusao);
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <MenuAdmin />

      <Text style={estilos.titulo}>Oficinas</Text>

      <View style={estilos.input_grupo}>
        <TouchableOpacity
          style={[estilos.input_acao, estilos.input_acao_dropdown_ajuste]} 
          onPress={() => navigation.navigate("CriarOficina")}
        >
            <Text style={estilos.input_acao_texto}>Novo</Text>
            <Icon
              name="add"
              style={estilos.input_acao_icone} 
            />
        </TouchableOpacity>
      
        <Icon
          name="search-outline"
          style={[estilos.input_icone, {marginTop: 9}]}
        />
        <TextInput
          style={[estilos.input_campo, estilos.input_dropdown_ajuste, {width: "43%", marginTop: 9, marginRight: 0}]}
          placeholder={"Cidade"}
          value={cidade}
          onChangeText={(text) => setCidade(text)}
          keyboardType={"text"}
        />
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
                name="create"
                style={estilos.lista_acoes_icones}
                onPress={() =>
                navigation.navigate("EditarOficina", {
                  id: item.id,
                  cidade: item.cidade,
                  bairro: item.bairro,
                  oficina_endereco: item.endereco,
                  oficina_latitude: item.latitude,
                  oficina_longitude: item.longitude,
                  oficina_telefone: item.telefone,
                  oficina_telefone2: item.telefone2,
                })}
              />

              <Icon
                name="trash"
                style={estilos.lista_acoes_icones}
                onPress={() => ConfExcluir(item.id, item.cidade, item.bairro, item.endereco, item.telefone, item.telefone2)}
              />
            </View>
          </View>
        );
      }}
    />

      <Modal
        isVisible={modalExclusao}
        animationIn={"slideInDown"}
        animationOut={"slideOutDown"}
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        transparent
      >
        <View style={estilos.modal}>   
          <Text style={estilos.modal_titulo}>Deseja excluir a oficina?</Text>   
          <View style={estilos.input_grupo}>
            <Icon name="map-outline" style={estilos.input_icone}/>
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{cidade} - {bairro}</Text>

            <Icon name="location-outline" style={estilos.input_icone}/>
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{endereco}</Text>

            <Icon name="call-outline" style={estilos.input_icone}/>
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{telefone}</Text>

            <Icon name="call-outline" style={estilos.input_icone}/>
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{telefone2}</Text>
          </View>
          
          <View style={estilos.input_acao_grupo}>
            <TouchableOpacity
              style={estilos.input_acao}
              onPress={FecharExcluir}
            >
              <Text style={estilos.input_acao_texto}>Não</Text>
              <Icon
                name="arrow-back"
                style={[estilos.input_acao_icone, estilos.input_acao_icone_modal]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.input_acao}
              onPress={Excluir}
            >
              <Text style={estilos.input_acao_texto}>Sim</Text>
              <Icon
                name="trash"
                style={[estilos.input_acao_icone, estilos.input_acao_icone_modal]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
export default AdminOficinas;