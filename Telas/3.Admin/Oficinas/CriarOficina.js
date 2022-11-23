import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import Icon from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";
import MaskInput from "react-native-mask-input";

import {banco} from "../../../firebase";
import estilos from "../../Estilos"

const NovaOficina = ({ navigation }) => {
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefone2, setTelefone2] = useState("");

  const [modalOficinaCriada, setModalOficinaCriada] = useState(false);

  const Cadastrar = () => {
    if (cidade == "" || bairro == ""|| endereco == "" || latitude == "" || longitude == "" || telefone == "" || telefone2 == "") {
      alert("Um ou mais campos vazios.");
    }
    else {
      banco.collection("Oficinas").add({
        cidade,
        bairro,
        endereco,
        latitude,
        longitude,
        telefone,
        telefone2,
        datacriacao: new Date(),
      })

      setModalOficinaCriada(!modalOficinaCriada);

      if (modalOficinaCriada == false) {
        setTimeout(() => {
          navigation.navigate("AdminOficinas");
          setModalOficinaCriada(false);
        }, 2000);
      }
    }
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      
      <Text style={estilos.titulo}>Cadastrar oficina</Text>

      <View style={estilos.input_grupo}>
        <Icon
          name="map-outline"
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input_campo}
          placeholder={"Cidade"}
          value={cidade}
          onChangeText={(text) => setCidade(text)}
          keyboardType={"text"}
        />

        <Icon
          name="map-outline"
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input_campo}
          placeholder={"Bairro"}
          value={bairro}
          onChangeText={(text) => setBairro(text)}
          keyboardType={"text"}
        />

        <Icon
          name="map-outline"
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input_campo}
          placeholder={"Endereço"}
          value={endereco}
          onChangeText={(text) => setEndereco(text)}
          keyboardType={"text"}
        />

        <Icon
          name="location-outline"
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input_campo}
          placeholder={"Latitude"}
          value={latitude}
          onChangeText={(text) => setLatitude(text)}
          keyboardType={"number"}
        />

        <Icon
          name="location-outline"
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input_campo}
          placeholder={"Longitude"}
          value={longitude}
          onChangeText={(text) => setLongitude(text)}
          keyboardType={"number"}
        />

        <Icon
          name="call-outline"
          style={estilos.input_icone}
        />
        <MaskInput
          style={estilos.input_campo}
          placeholder={"Telefone fixo"}
          value={telefone}
          onChangeText={(masked, unmasked) => {setTelefone(masked);}}
          mask={["(", /\d/, /\d/, ") ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/,]}
        />

        <Icon
          name="call-outline"
          style={estilos.input_icone}
        />
        <MaskInput
          style={estilos.input_campo}
          placeholder={"Celular"}
          value={telefone2}
          onChangeText={(masked, unmasked) => {setTelefone2(masked);}}
          mask={["(", /\d/, /\d/, ") ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/,]}
        />
      </View>

      <View style={estilos.input_acao_grupo}>
        <TouchableOpacity
          style={estilos.input_acao}
          onPress={() => navigation.navigate("AdminOficinas")}
        >
            <Text style={estilos.input_acao_texto}>Cancelar</Text>
            <Icon
              name="arrow-back"
              style={estilos.input_acao_icone}
            />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={estilos.input_acao}
          onPress={Cadastrar}
        >
            <Text style={estilos.input_acao_texto}>Cadastrar</Text>
            <Icon
              name="business"
              style={estilos.input_acao_icone}
            />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalOficinaCriada}
        animationIn={"slideInDown"}
        animationOut={"slideOutDown"}
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        transparent
      >
        <View style={estilos.modal}>      
          <Image
            style={estilos.logo}
            source={require("../../../Imagens/Logo.svg")}
          />
          <Text style={estilos.modal_titulo}>Oficina cadastrada com sucesso.</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default NovaOficina;