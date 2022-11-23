import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Icon from "@expo/vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker"
import Modal from "react-native-modal";

import {banco} from "../../../firebase";
import estilos, {fundo, fonte} from "../../Estilos"
import MenuAdmin from "../../0.Extras/MenuAdmin"

const AdminServicos = ({ navigation }) => {
  let dados = [];
  const [data, setData] = useState([]);

  const [modalExclusao, setModalExclusao] = useState(false);
  const [veiculo_serv, setVeiculo_serv] = useState();
  const [id_serv, setId_serv] = useState();
  const [servico_serv, setServico_serv] = useState();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Carro");
  const [veiculo, setVeiculo] = useState([
    {label: "Bicicleta", value: "Bicicleta"},
    {label: "Carro", value: "Carro"},
    {label: "Moto", value: "Moto"},
  ]);

  const Servicos = () => {
    banco.collection("Servicos").where("veiculo", "==", value).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        valor = doc.data().valor
        if (valor == 0.01) {
          valor = "A combinar"
        }

        else {
          valor = "R$ " + valor + ",00"
        }
        const servicos_cadastrados = {
          id: doc.id,
          veiculo: doc.data().veiculo,
          servico: doc.data().servico,
          valor: valor,
        };
        dados.push(servicos_cadastrados);
      });

      dados.sort((a, b) => (a.servico > b.servico) ? 1 : -1)
      setData(dados);
      });
  };

  useEffect(() => {
    Servicos();
  },);

  const ConfExcluir = (id, servico, veiculo) => {
    setModalExclusao(!modalExclusao);
    setId_serv(id)
    setServico_serv(servico)
    setVeiculo_serv(veiculo)
  }

  const Excluir = () => {
    banco.collection("Servicos").doc(id_serv).delete()
    setModalExclusao(!modalExclusao);
  };

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <MenuAdmin />

      <Text style={estilos.titulo}>Serviços</Text>
      
      <View style={[estilos.input_grupo, {zIndex: 1}]}>
        <View style={estilos.input_grupo_dropdown}>
          <TouchableOpacity
            style={[estilos.input_acao, estilos.input_acao_dropdown_ajuste]} 
            onPress={() => navigation.navigate("CriarServico")}
          >
              <Text style={estilos.input_acao_texto}>Novo</Text>
              <Icon
              name="add"
              style={estilos.input_acao_icone} 
              />
          </TouchableOpacity>

          <DropDownPicker
            open={open}
            value={value}
            items={veiculo}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setVeiculo}
            placeholder="Selecione a cidade"
            placeholderStyle={{fontSize: 15}}
            style={[estilos.input_dropdown, estilos.input_dropdown_ajuste]} 
            textStyle={{color: fonte, fontSize: 15, fontWeight: 500}}
            dropDownContainerStyle={{backgroundColor: fundo, borderWidth: 0,}}
            listItemLabelStyle={{textAlign: "left"}}
            showTickIcon={false}
            arrowIconStyle={{tintColor: fonte}}
          />
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={estilos.lista_grupo_listas}>
              <View style={[estilos.lista, estilos.lista_acoes_ajustes]}>
                <Text style={estilos.lista_texto}>{item.veiculo}</Text>
                <Text style={estilos.lista_texto}>{item.servico} - {item.valor}</Text>
              </View>
              
              <View style={estilos.lista_grupo_acoes}>
                <Icon
                  name="create"
                  style={estilos.lista_acoes_icones}
                  onPress={() => navigation.navigate("EditarServico", { id: item.id, veiculo: item.veiculo, servico: item.servico, valor_serv: item.valor, })}
                />
                <Icon
                  name="trash"
                  style={estilos.lista_acoes_icones}
                  onPress={() => ConfExcluir(item.id, item.servico, item.veiculo)}
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
          <Text style={estilos.modal_titulo}>Deseja excluir o serviço?</Text>
          <View style={estilos.input_grupo}>
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{veiculo_serv} - {servico_serv}</Text>
          </View>
          
          <View style={estilos.input_acao_grupo}>
            <TouchableOpacity
              style={estilos.input_acao}
              onPress={() => {setModalExclusao(!modalExclusao)}}
            >
              <Text style={estilos.input_acao_texto}>Não</Text>
              <Icon
                name="arrow-back"
                style={estilos.input_acao_icone_modal}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.input_acao}
              onPress={Excluir}
            >
              <Text style={estilos.input_acao_texto}>Sim</Text>
              <Icon
                name="trash"
                style={estilos.input_acao_icone_modal}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
export default AdminServicos;