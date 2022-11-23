import {useState} from "react";
import {
  ScrollView,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";

import Icon from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";

import {banco, auth} from "../../firebase";
import estilos, {fundosec, fonte} from "../Estilos"
import Menu from "../0.Extras/Menu"

const Marcados = ({ navigation }) => {
  const user = auth.currentUser;
  if (user != null) {
    usuario = user.email;
  }

  const [modalCancelamento, setModalCancelamento] = useState(false);
  const [modalAvaliacao, setModalAvaliacao] = useState(false);
  const [id_serv, setId_serv] = useState("");
  const [servico_serv, setServico_serv] = useState("");
  const [valor_serv, setValor_serv] = useState("");
  const [dataservico_serv, setDataservico_serv] = useState("");
  const [oficina_serv, setOficina_serv] = useState("");
  const [modelo_serv, setModelo_serv] = useState("");
  const [avaliacao, setAvaliacao] = useState("");

  let dados = [];
  const [data, setData] = useState([]);

  var dataatual = new Date();

  banco.collection("Marcados").where("usuario", "==", usuario).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      dataservico = doc.data().dataservico.toDate();
      dataservico = dataservico.toLocaleString(
      ["pt-BR"],
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }
      )

      const marcados_info = {
        id: doc.id,
        servico: doc.data().servico,
        valor: doc.data().valor,
        oficina: doc.data().oficina,
        modelo: doc.data().modelo,
        observacoes: doc.data().observacoes,
        dataservico: dataservico,
        dataservicosf: doc.data().dataservico.toDate(),
        avaliado: doc.data().avaliado,
      };

      dados.push(marcados_info);
    });

    dados.sort((a, b) => (a.dataservico < b.dataservico) ? 1 : -1)

    setData(dados);
  });

  const Confirmar = (id, servico, valor, dataservico, oficina, modelo) => {
    setId_serv(id)
    setServico_serv(servico)
    setValor_serv(valor)
    setDataservico_serv(dataservico)
    setOficina_serv(oficina)
    setModelo_serv(modelo)
    setAvaliacao()
  }

  const Cancelar = () => {
    banco.collection("Marcados").doc(id_serv).delete()
    setModalCancelamento(!modalCancelamento);
  };

  const Avaliar = () => {
    if (avaliacao == "") {
      alert("Campo de avaliação vazio.")
    }
    
    else {
      banco.collection("Marcados").doc(id_serv).update({
        avaliacao: avaliacao,
        avaliado: true,
      })
      .then(() => {
        navigation.navigate("Avaliados");
        setModalAvaliacao(!modalAvaliacao);
      });
    }
  }

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <Menu />

      <Text style={estilos.titulo}>Serviços marcados</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => {
          dataser = item.dataservicosf

          if (dataser.getTime() > dataatual.getTime()) {
            return (
            <View style={estilos.lista_grupo_listas}>
              <View style={[estilos.lista, estilos.lista_acoes_ajustes]}>
                <Text style={estilos.lista_texto}>{item.dataservico}</Text>
                <Text style={estilos.lista_texto}>{item.servico} - {item.valor}</Text>
                <View style={estilos.lista_separador}></View>
                <Text style={estilos.lista_texto}>{item.oficina}</Text>
                <Text style={estilos.lista_texto}>{item.modelo}</Text>
                <Text style={estilos.lista_texto}>{item.observacoes}</Text>
              </View>
              
              <View style={estilos.lista_grupo_acoes}>
                <Icon
                  name="trash"
                  style={estilos.lista_acoes_icones}
                  onPress={() => {
                  Confirmar (
                    item.id,
                    item.servico,
                    item.valor,
                    item.dataservico,
                    item.oficina,
                    item.modelo
                  );
                  setModalCancelamento(!modalCancelamento);
                  }}
                />
              </View>
            </View>
            );
          }

          else {
            if (item.avaliado === true) {
            return (
            <View style={estilos.lista_grupo_listas}>
              <View style={estilos.lista}>
                <Text style={estilos.lista_texto}>{item.dataservico}</Text>
                <Text style={estilos.lista_texto}>{item.servico} - R$ {item.valor}</Text>
                <View style={estilos.lista_separador}></View>
                <Text style={estilos.lista_texto}>{item.oficina}</Text>
                <Text style={estilos.lista_texto}>{item.modelo}</Text>
                <Text style={estilos.lista_texto}>{item.observacoes}</Text>
              </View>
            </View>
            );
            }

            else {
            return (
            <View style={estilos.lista_grupo_listas}>
              <View style={[estilos.lista, estilos.lista_acoes_ajustes]}>
                <Text style={estilos.lista_texto}>{item.dataservico}</Text>
                <Text style={estilos.lista_texto}>{item.servico} - R$ {item.valor}</Text>
                <View style={estilos.lista_separador}></View>
                <Text style={estilos.lista_texto}>{item.oficina}</Text>
                <Text style={estilos.lista_texto}>{item.modelo}</Text>
                <Text style={estilos.lista_texto}>{item.observacoes}</Text>
              </View>
              
              <View style={estilos.lista_grupo_acoes}>
                <Icon
                  name="star"
                  style={estilos.lista_acoes_icones}
                  onPress={() => {
                  Confirmar (
                    item.id,
                    item.servico,
                    item.valor,
                    item.dataservico,
                    item.oficina,
                    item.modelo
                  );
                  setModalAvaliacao(!modalAvaliacao);
                  }}
                />
              </View>
            </View>
            );
            }
          }
        }}
      />

      <Modal
        isVisible={modalCancelamento}
        animationIn={"slideInDown"}
        animationOut={"slideOutDown"}
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        transparent
      >
        <View style={estilos.modal}>
          <Text style={estilos.modal_titulo}>Cancelar marcação?</Text>
          <View style={estilos.input_grupo}>
            <Icon
            name="build-outline"
            style={estilos.input_icone}
            />
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{servico_serv}</Text>

            <Icon
            name="cash-outline"
            style={estilos.input_icone}
            />
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{valor_serv}</Text>

            <Icon
            name="build-outline"
            style={estilos.input_icone}
            />
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{dataservico_serv}</Text>

            <Icon
            name="business-outline"
            style={estilos.input_icone}
            />
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{oficina_serv}</Text>


            <Icon
            name="car-outline"
            style={estilos.input_icone}
            />
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{modelo_serv}</Text>
          </View>
          
          <View style={estilos.input_acao_grupo}>
            <TouchableOpacity
            style={estilos.input_acao}
            onPress={() => {setModalCancelamento(!modalCancelamento)}}
            >
              <Text style={estilos.input_acao_texto}>Não</Text>
              <Icon
                name="arrow-back"
                style={estilos.input_acao_icone_modal}
              />
            </TouchableOpacity>

            <TouchableOpacity
            style={estilos.input_acao}
            onPress={Cancelar}
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

      <Modal
        isVisible={modalAvaliacao}
        animationIn={"slideInDown"}
        animationOut={"slideOutDown"}
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        transparent
      >
        <View style={estilos.modal}>      
          <Text style={estilos.modal_titulo}>Avaliar serviço</Text>

          <View style={estilos.input_grupo}>
            <Icon
              name="build-outline"
              style={estilos.input_icone}
            />
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{servico_serv}</Text>

            <Icon
              name="cash-outline"
              style={estilos.input_icone}
            />
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{valor_serv}</Text>

            <Icon
              name="build-outline"
              style={estilos.input_icone}
            />
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{dataservico_serv}</Text>

            <Icon
              name="business-outline"
              style={estilos.input_icone}
            />
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{oficina_serv}</Text>


            <Icon
              name="car-outline"
              style={estilos.input_icone}
            />
            <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{modelo_serv}</Text>

            <Icon
              name="star-outline"
              style={estilos.input_icone}
            />
            <TextInput
              style={[estilos.input_campo, estilos.input_campo_modal]}
              placeholder={"Avaliação"}
              onChangeText={setAvaliacao}
              value={avaliacao}
              keyboardType={"text"}
              multiline={true}
              numberOfLines={2}
            />
          </View>
          
          <View style={estilos.input_acao_grupo}>
            <TouchableOpacity
              style={estilos.input_acao}
              onPress={() => {setModalAvaliacao(!modalAvaliacao)}}
            >
              <Text style={estilos.input_acao_texto}>Não</Text>
              <Icon
                name="arrow-back"
                style={estilos.input_acao_icone_modal}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.input_acao}
              onPress={Avaliar}
            >
              <Text style={estilos.input_acao_texto}>Sim</Text>
              <Icon
                name="star"
                style={estilos.input_acao_icone_modal}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Marcados;