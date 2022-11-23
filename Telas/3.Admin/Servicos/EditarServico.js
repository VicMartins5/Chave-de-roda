import {useState} from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";

import Icon from "@expo/vector-icons/Ionicons";
import CurrencyInput from "react-native-currency-input";
import Modal from "react-native-modal";

import estilos from "../../Estilos"
import { banco } from "../../../firebase";

const EditarServico = ({ navigation, route }) => {
  let {id, veiculo, servico, valor_serv} = route.params;
  if (valor_serv == "A combinar") {
    valor_serv = 0.01
  }

  else {
    valor_serv = valor_serv.replace("R$ ", "")
    valor_serv = valor_serv.replace(",00", "")
    valor_serv = parseInt(valor_serv)
    console.log(valor_serv)
  }

  const [valor, setValor] = useState(valor_serv);
  const [modalEdicao, setModalEdicao] = useState(false);

  const Editar = () => {
    if (valor == "") {
      alert("Campo valor vazio.")
    }
    
    else {
      banco.collection("Servicos").doc(id).update({
          valor: valor,
      })

      setModalEdicao(!modalEdicao);

      if (modalEdicao == false) {
        setTimeout(() => {
        navigation.navigate("AdminServicos");
        setModalEdicao(false);
        }, 2000);
      }
    }
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      
      <Text style={estilos.titulo}>Edite o serviço</Text>

      <View style={estilos.input_acao_grupo}>
        <Icon
          name="car-outline"
          size={15}
          style={estilos.input_icone}
        />
        <Text style={estilos.input_campo}>{veiculo}</Text>

        <Icon
          name="build-outline"
          size={15}
          style={estilos.input_icone}
        />
        <Text style={estilos.input_campo}>{servico}</Text>


        <Icon
          name="cash-outline"
          size={15}
          style={estilos.input_icone}
        />
        <CurrencyInput
          style={estilos.input_campo}
          value={valor}
          onChangeValue={setValor}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
        />
      </View>

      <View style={estilos.input_acao_grupo}>
        <TouchableOpacity
          style={estilos.input_acao}
          onPress={() => navigation.navigate("AdminServicos")}
        >
            <Text style={estilos.input_acao_texto}>Cancelar</Text>
            <Icon
              name="arrow-back"
              size={20}
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
              size={20}
              style={estilos.input_acao_icone}
            />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalEdicao}
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
          <Text style={estilos.modal_titulo}>Serviço alterado com sucesso.</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};
export default EditarServico;