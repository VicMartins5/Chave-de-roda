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

import { auth } from "../../firebase";
import estilos from "../Estilos"
import Modal from "react-native-modal";

const Senha = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [modalSenha, setModalSenha] = useState(false);

  const AlterarSenha = () => {
    if (email == "") {
      alert("Campo de e-mail vazio.")
    }

    else {
      auth.sendPasswordResetEmail(email).then(() => {
        setModalSenha(!modalSenha);

        if (modalSenha == false) {
          setTimeout(() => {
            navigation.navigate("Login");
            setModalSenha(false);
          }, 2000);
        }
      })
      
      .catch(error => alert(error.message))
    }
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      
      <Text style={estilos.titulo}>Alterar senha</Text>

      <View style={estilos.input_acao_grupo}>
        <Icon
          name="mail-outline"
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input_campo}
          placeholder={"Email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType={"text"}
        />
      </View>

      <View style={estilos.input_acao_grupo}>
        <TouchableOpacity
          style={estilos.input_acao}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={estilos.input_acao_texto}>Cancelar</Text>
          <Icon
            name="arrow-back"
            style={estilos.input_acao_icone}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={estilos.input_acao}
          onPress={AlterarSenha}
        >
          <Text style={estilos.input_acao_texto}>Alterar</Text>
          <Icon
            name="key"
            style={estilos.input_acao_icone}
          />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalSenha}
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
            source={require("../../Imagens/Logo.svg")}
          />
          <Text style={estilos.modal_titulo}>Email de redefinição de senha enviado.</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Senha;