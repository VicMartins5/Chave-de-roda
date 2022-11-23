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
import MaskInput from "react-native-mask-input";
import Modal from "react-native-modal";

import { banco, auth } from "../../firebase";
import estilos from "../Estilos"

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [modalCadastrado, setModalCadastrado] = useState(false);

  const Cadastrar = () => {
    if (nome == "" || telefone == "" || email == ""  || senha == "" || confSenha == "" || telefone.length < 15) {
      alert("Um ou mais campos vazios.");
    }
    
    else {
      if (senha != confSenha) {
        alert("Senhas não correspondem.")
      }

      else if (senha.length < 6) {
        alert("Senha precisa ter ao menos 6 caracteres.");
      }

      else {
        auth.createUserWithEmailAndPassword(email, senha).then(() => {
          banco.collection("Usuarios").add({
            nome,
            telefone,
            email: email.toLowerCase(),
            cargo: "Cliente",
            datacriacao: new Date(),
          })
            
          setModalCadastrado(!modalCadastrado);

          if (modalCadastrado == false) {
            setTimeout(() => {
              navigation.navigate("Login");
              setModalCadastrado(false);
            }, 2000);
          }
        })
        
        .catch(error => alert(error.message))
      }
    }
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      
      <Text style={estilos.titulo}>Cadastrar usuário</Text>

      <View style={estilos.input_grupo}>
        <Icon
          name="person-outline"
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input_campo}
          placeholder={"Nome"}
          value={nome}
          onChangeText={(text) => setNome(text)}
          keyboardType={"text"}
        />

        <Icon
          name="call-outline"
          style={estilos.input_icone}
        />
        <MaskInput
          style={estilos.input_campo}
          placeholder={"Telefone"}
          value={telefone}
          onChangeText={(masked, unmasked) => {setTelefone(masked);}}
          mask={["(", /\d/, /\d/, ") ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/,]}
        />

        <Icon
          name="mail-outline"
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input_campo}
          placeholder={"E-mail"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType={"text"}
        />

        <Icon
          name="key-outline"
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input_campo}
          placeholder={"Senha"}
          value={senha}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry={true}
        />

        <Icon
          name="key-outline"
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input_campo}
          placeholder={"Confirme a senha"}
          value={confSenha}
          onChangeText={(text) => setConfSenha(text)}
          secureTextEntry={true}
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
          onPress={Cadastrar}
        >
          <Text style={estilos.input_acao_texto}>Cadastrar-se</Text>
          <Icon
            name="person-add"
            style={estilos.input_acao_icone}
          />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalCadastrado}
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
          <Text style={estilos.modal_titulo}>Cadastro realizado com sucesso.</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Cadastro;