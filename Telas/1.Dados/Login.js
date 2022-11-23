import { useState } from "react";
import {
  ScrollView,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text
} from "react-native";

import Icon from "@expo/vector-icons/Ionicons";

import { banco, auth } from "../../firebase";
import estilos from "../Estilos"

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const Logar = () => {
    if (senha == "" || email == "") {
      alert("Um ou mais campos obrigatórios vázios.");
    } 
    
    else {
      auth.signInWithEmailAndPassword(email, senha).then(() => {
        var cargo
        banco.collection("Usuarios").where("email", "==", email.toLowerCase()).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            cargo = doc.data().cargo
            if (cargo == "Gerente" || cargo == "Supervisor") {
              navigation.navigate("AdminInicio");
            }
            
            if (cargo == "Cliente") {
              navigation.navigate("Inicio");
            }

            if (cargo == "Desativado") {
              alert("Acesso desativado, contate o administrador.");
            }
          })
        });
      })
      
      .catch(error => alert(error.message))
    }
  };

  return (
    <ScrollView
      style={estilos.main_meio}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <Image
        style={estilos.logo}
        source={require("../../Imagens/Logo.svg")}
      />

      <View style={estilos.input_grupo}>
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
      </View>

      <TouchableOpacity
        style={estilos.input_acao_senha}
        onPress={() => navigation.navigate("Senha")}
      >
        <Text style={estilos.input_acao_texto_senha}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <View style={estilos.input_acao_grupo}>
        <TouchableOpacity
          style={estilos.input_acao}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={estilos.input_acao_texto}>Cadastrar-se</Text>
          <Icon
            name="person-add"
            style={estilos.input_acao_icone}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={estilos.input_acao}
          onPress={Logar}
        >
          <Text style={estilos.input_acao_texto}>Entrar</Text>
          <Icon
            name="log-in"
            style={estilos.input_acao_icone}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;