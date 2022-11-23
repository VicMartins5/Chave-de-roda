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
import DropDownPicker from "react-native-dropdown-picker"
import CurrencyInput from "react-native-currency-input";
import Modal from "react-native-modal";

import { banco } from "../../../firebase";
import estilos, {fundo, fonte} from "../../Estilos"

const NovoServico = ({ navigation }) => {
  const [servico, setServico] = useState("");
  const [valor, setValor] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [veiculo, setVeiculo] = useState([
    {label: "Carro", value: "Carro"},
    {label: "Moto", value: "Moto"},
    {label: "Bicicleta", value: "Bicicleta"},
  ]);

  const [modalServicoCriado, setModalServicoCriado] = useState(false);

  const Cadastrar = () => {
    if (value == "" || servico == "" || valor == "") {
      alert("Um ou mais campos vazios.");
    }

    else {
      banco.collection("Servicos").add({
        veiculo: value,
        servico,
        valor,
        datacriacao: new Date(),
      })

      setModalServicoCriado(!modalServicoCriado);

      if (modalServicoCriado == false) {
        setTimeout(() => {
        navigation.navigate("AdminServicos");
        setModalServicoCriado(false);
        }, 2000);
      }
    }
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      
      <Text style={estilos.titulo}>Cadastrar serviço</Text>

      <View style={estilos.input_grupo}>
        <View style={estilos.input_grupo_dropdown}>
          <Icon
            name="car-outline"
            style={[estilos.input_icone,{marginTop: 3}]} 
          />
          <DropDownPicker
            open={open}
            value={value}
            items={veiculo}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setVeiculo}
            placeholder="Selecione um veículo"
            placeholderStyle={{fontSize: 15, fontWeight: 500}}
            style={estilos.input_dropdown} 
            textStyle={{color: fonte, fontSize: 15, fontWeight: 500}}
            dropDownContainerStyle={{backgroundColor: fundo, borderWidth: 0}}
            listItemLabelStyle={{textAlign: "left"}}
            showTickIcon={false}
            arrowIconStyle={{tintColor: fonte}}
          />
        </View>

        <Icon
          name="build-outline"
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input_campo}
          placeholder={"Serviço"}
          value={servico}
          onChangeText={(text) => setServico(text)}
          keyboardType={"text"}
        />

        <Icon
          name="cash-outline"
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
          placeholder="Valor"
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
              style={estilos.input_acao_icone}
            />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={estilos.input_acao}
          onPress={Cadastrar}
        >
            <Text style={estilos.input_acao_texto}>Cadastrar</Text>
            <Icon
              name="build"
              style={estilos.input_acao_icone}
            />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalServicoCriado}
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
          <Text style={estilos.modal_titulo}>Serviço cadastrado com sucesso.</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default NovoServico;