import {useState} from "react";
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

import estilos from "../../Estilos"
import {banco} from "../../../firebase";

const EditarOficina = ({ navigation, route }) => {
  const {id, cidade, bairro, oficina_endereco, oficina_latitude, oficina_longitude, oficina_telefone, oficina_telefone2} = route.params;

  const [endereco, setEndereco] = useState(oficina_endereco);
  const [latitude, setLatitude] = useState(oficina_latitude);
  const [longitude, setLongitude] = useState(oficina_longitude);
  const [telefone, setTelefone] = useState(oficina_telefone);
  const [telefone2, setTelefone2] = useState(oficina_telefone2);
  const [isModalVisible, setModalVisible] = useState(false);

  const Editar = () => {
    if (endereco == "" || telefone == "" || telefone2 == "" || latitude == "" || longitude == "") {
      alert("Um ou mais campos vazios.")
    }
    
    else {
      banco.collection("Oficinas").doc(id).update({
        endereco: endereco,
        latitude: latitude,
        longitude: longitude,
        telefone: telefone,
        telefone2: telefone2
      })

      setModalVisible(!isModalVisible);

      if (isModalVisible == false) {
        setTimeout(() => {
          navigation.navigate("AdminOficinas");
          setModalVisible(false);
        }, 2000);
      }
    }
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Text style={estilos.titulo}>Edite a oficina</Text>

      <View style={estilos.input_grupo}>
        <Icon
          name="map-outline"
          style={estilos.input_icone}
        />
        <Text style={estilos.input_campo}>{cidade}</Text>

        <Icon
          name="map-outline"
          style={estilos.input_icone}
        />
        <Text style={estilos.input_campo}>{bairro}</Text>

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
          keyboardType={"text"}
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
          keyboardType={"text"}
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
          onPress={Editar}
        >
            <Text style={estilos.input_acao_texto}>Editar</Text>
            <Icon
              name="create"
              style={estilos.input_acao_icone}
            />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
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
          <Text style={estilos.modal_titulo}>Oficina alterada com sucesso.</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EditarOficina;