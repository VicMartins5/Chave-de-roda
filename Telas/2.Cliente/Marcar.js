import {useState} from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";

import Icon from "@expo/vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker"
import DatePicker from "react-native-modern-datepicker";
import {getFormatedDate} from "react-native-modern-datepicker";
import MaskInput from "react-native-mask-input";
import Modal from "react-native-modal";

import {banco, auth} from "../../firebase";
import estilos, {fundo, fonte, fundosec} from "../Estilos"

const MarcarServico = ({ navigation, route }) => {
  const {veiculo, servico, valor} = route.params;
  const user = auth.currentUser;
  if (user != null) {
    usuario = user.email;
  }

  var cidades;

  const [cidadeAberto, setCidadeAberto] = useState(false);
  const [cidadeValor, setCidadeValor] = useState(null);
  const [cidade, setCidade] = useState([]);

  const [oficinaAberto, setOficinaAberto] = useState(false);
  const [oficinaValor, setOficinaValor] = useState(null);
  const [oficina, setOficina] = useState([]);

  const [modelo, setModelo] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [modalAviso, setModalAviso] = useState(false);

  const [modalCalendario, setModalCalendario] = useState(false);
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("")
  const [dataserv, setDataserv] = useState("Data")
  const [dataretorno, setDataretorno] = useState("");

  hoje = new Date(2022, 10, 11);
  hoje = hoje.toLocaleString(
    ["en-CA"],
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }
  )

  datamin = new Date();
  datamin.setDate(datamin.getDate() + 1);
  datamin = datamin.toLocaleString(
    ["en-CA"],
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }
  )

  datamax = new Date(new Date().getFullYear(), 11, 31);
  datamax = datamax.toLocaleString(
    ["en-CA"],
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }
  )

  feriados = [
    new Date(new Date().getFullYear(), 0, 1),
    new Date(new Date().getFullYear(), 4, 1),
    new Date(new Date().getFullYear(), 8, 7),
    new Date(new Date().getFullYear(), 9, 12),
    new Date(new Date().getFullYear(), 10, 2),
    new Date(new Date().getFullYear(), 10, 15),
    new Date(new Date().getFullYear(), 11, 24),
    new Date(new Date().getFullYear(), 11, 25),
    new Date(new Date().getFullYear(), 11, 31)
  ];

  banco.collection("Oficinas").orderBy("cidade").get().then((querySnapshot) => {
    cidade.splice(0,cidade.length)
    querySnapshot.forEach((doc) => {
      if (doc.data().cidade != cidades || cidades == "") {
        cidades = doc.data().cidade;
        cidade.push({label: doc.data().cidade, value: doc.data().cidade})
      }
    });
  });

  banco.collection("Oficinas").where("cidade", "==", cidadeValor).get().then((querySnapshot) => {
    oficina.splice(0,oficina.length)
    querySnapshot.forEach((doc) => {
      oficina.push({label: doc.data().bairro, value: doc.data().bairro})
    });
  });

  function AumentarHora (horas, date = new Date()) {
    date.setTime(date.getTime() + horas * 60 * 60 * 1000);
    return date;
  }

  const Data = () => {
    if (horario.length < 5){
      alert("Data ou horário incorretos.")
    }

    else {
      eferiado = 0
      dia = parseInt(data.substring(8, 10), 10);
      mes = parseInt(data.substring(5, 7), 10);
      ano = parseInt(data.substring(0, 4), 10);
      hora = parseInt(horario.substring(0, 2), 10);
      minuto = parseInt(horario.substring(3, 6), 10);

      if (hora > 23 || minuto > 59) {
        alert("Horário incorreto.")
      }

      else {
        dataservico = new Date(ano, mes -1, dia, hora, minuto)

        dataservicost = new Date(ano, mes -1, dia, hora, minuto)
        dataservicost.setHours(0,0,0);
      
        for (x=0; x < feriados.length; x++) {
          if(dataservicost.getTime() == feriados[x].getTime()) {
            eferiado = 1;
          }
        }

        if (eferiado == 1 || dataservico.getDay() == 0 || hora < 8 || hora >= 18) {
          if (hora < 8 || hora >= 18) {
            alert("Fora do horário de funcionamento.")
          }

          else if (dataservico.getDay() == 0) {
            alert("Não funcionamos aos domingos.")
          }

          else if (eferiado == 1) {
            alert("Não funcionamos aos feriados")
          }
        }

        else {
          dataser = dataservico
          dataser = dataser.toLocaleString(
            ["pt-BR"],
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit"
            }
          )

          setDataserv(dataser);
          setModalCalendario(false);
        }
      }
    }
  }

  const Marcar = () => {
    if (cidadeValor == "" || oficinaValor == "" || modelo == "" || dataserv == "Data") {
      alert("Um ou mais campos em vazio.")
    }

    else {
      dataret = new Date(ano, mes -1, dia, hora, minuto)

      if (servico == "Troca de óleo") {
        if (hora < 16) {
          dataret = AumentarHora(2, dataret)
        }
        
        else {
          dataret.setDate(dataret.getDate() + 1);
          dataret.setHours(8,0,0);
        }
      }

      else {
        dataret.setDate(dataret.getDate() + 1);
      }

      banco.collection("Marcados").add({
        usuario,
        servico: veiculo + ": " + servico,
        valor,
        oficina: cidadeValor + " - " + oficinaValor,
        modelo,
        datacriacao: new Date(),
        dataservico,
        dataretorno: dataret,
        observacoes,
        avaliacao: "",
        avaliado: false,
      })
      
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

      dataret = dataret.toLocaleString(
        ["pt-BR"],
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }
      )

      setDataserv(dataservico)
      setDataretorno(dataret)

      setModalAviso(!modalAviso)

      if (modalAviso == false) {
        setTimeout(() => {
        navigation.navigate("Marcados");
        setModalAviso(false);
        }, 4000);
      }
    }
  }

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      
      <Text style={estilos.titulo}>Marcação</Text>

      <View style={estilos.input_grupo}>
        <Icon
          name="build-outline"
          style={estilos.input_icone}
        />
        <Text style={estilos.input_campo}>{servico}</Text>

        <Icon
          name="cash-outline"
          style={estilos.input_icone}
        />
        <Text style={estilos.input_campo}>{valor}</Text>

        <View style={estilos.input_grupo_dropdown}>
          <Icon
            name="business-outline"
              style={[estilos.input_icone,{marginTop: 3}]} 
          />
          <DropDownPicker
            open={cidadeAberto}
            value={cidadeValor}
            items={cidade}
            setOpen={setCidadeAberto}
            setValue={setCidadeValor}
            setItems={setCidade}
            placeholder="Selecione a cidade"
            placeholderStyle={{fontSize: 15}}
            style={estilos.input_dropdown} 
            textStyle={{color: fonte, fontSize: 15, fontWeight: 500}}
            dropDownContainerStyle={{backgroundColor: fundo, borderWidth: 0,}}
            listItemLabelStyle={{textAlign: "left"}}
            showTickIcon={false}
            arrowIconStyle={{tintColor: fonte}}
          />
        </View>

        <Icon
          name="car-outline"
          style={estilos.input_icone}
        />
        <TextInput
          style={estilos.input_campo}
          placeholder={"Modelo"}
          onChangeText={setModelo}
          value={modelo}
          keyboardType={"text"}
        />

        <View style={[estilos.input_grupo_dropdown, {zIndex: 9}]}>
          <Icon
            name="business-outline"
              style={[estilos.input_icone,{marginTop: 3}]} 
          />
          <DropDownPicker
            open={oficinaAberto}
            value={oficinaValor}
            items={oficina}
            setOpen={setOficinaAberto}
            setValue={setOficinaValor}
            setItems={setOficina}
            placeholder="Selecione a oficina"
            placeholderStyle={{fontSize: 15}}
            style={estilos.input_dropdown} 
            textStyle={{color: fonte, fontSize: 15, fontWeight: 500}}
            dropDownContainerStyle={{backgroundColor: fundo, borderWidth: 0}}
            listItemLabelStyle={{textAlign: "left"}}
            showTickIcon={false}
            arrowIconStyle={{tintColor: fonte}}
            translation={{NOTHING_TO_SHOW: "Não temos oficinas nessa cidade."}}
          />
        </View>

        <Icon
          name="build-outline"
          style={estilos.input_icone} 
        />
        <TextInput
          style={estilos.input_campo}
          placeholder={"Observações"}
          keyboardType={"text"}
          onChangeText={setObservacoes}
          value={observacoes}
          multiline={true}
          numberOfLines={3}
        />

        <Icon
          name="calendar-outline"
          style={estilos.input_icone}
        />
        <TouchableOpacity
          style={estilos.input_campo}
          onPress={() => {setModalCalendario(!modalCalendario)}}
        >
          <Text style={[estilos.input_acao_texto, {color: fonte}]}>{dataserv}</Text>
        </TouchableOpacity>
      </View>

      <View style={estilos.input_acao_grupo}>
        <TouchableOpacity
          style={estilos.input_acao}
          onPress={() => navigation.navigate("Veiculo")}
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
          onPress={Marcar}
        >
            <Text style={estilos.input_acao_texto}>Marcar</Text>
            <Icon
              name="cog"
              size={20}
              style={estilos.input_acao_icone}
            />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalCalendario}
        animationIn={"slideInDown"}
        animationOut={"slideOutDown"}
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        transparent
      >
        <View style={estilos.modal}>
          <DatePicker
            selected={data}
            current={hoje}
            minimumDate={datamin}
            maximumDate={datamax}
            mode="calendar"
            options={{
              backgroundColor: "#383838",
              textHeaderColor: "#ffa500",
              textDefaultColor: "#ffa500",
              selectedTextColor: "#222222",
              mainColor: "#ffa500",
              textSecondaryColor: "#ffa500",
              borderColor: "#383838",
            }}
            onSelectedChange={data => setData(getFormatedDate(new Date(data), "YYYY-MM-DD"))}
            style={{ borderRadius: 10 }}
          />

          <View style={estilos.input_grupo}>
            <Icon
              name="time-outline"
              style={estilos.input_icone}
            />
            <MaskInput
              style={[estilos.input_campo, {width: "25%", backgroundColor: fundosec}]}
              placeholder={"Hora"}
              value={horario}
              onChangeText={(masked, unmasked) => {setHorario(masked);}}
              mask={[/\d/, /\d/, ":", /\d/, /\d/]}
            />
          </View>

          <View style={estilos.input_acao_grupo}>
            <TouchableOpacity style={estilos.input_acao} onPress={() => {setModalCalendario(!modalCalendario)}}>
              <Icon
                name="arrow-back-outline"
                style={estilos.input_acao_icone_modal}
              />
              <Text style={estilos.input_acao_texto}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.input_acao} onPress={Data}>
              <Icon
                name="calendar-outline"
                style={estilos.input_acao_icone_modal}
              />
              <Text style={estilos.input_acao_texto}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={modalAviso}
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
          <Text style={estilos.modal_titulo}>Serviço marcado com sucesso.</Text>
          <Text style={estilos.modal_subtitulo}>Data prevista para devolução do veículo: {dataretorno}</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MarcarServico;