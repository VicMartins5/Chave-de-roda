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

import {auth, banco} from "../../../firebase";
import estilos, {fundo, fonte, fundosec} from "../../Estilos"
import MenuAdmin from "../../0.Extras/MenuAdmin"

const AdminUsuarios = () => {
  const user = auth.currentUser;
  if (user != null){
    var usuario = user.email
  }

  let dados = [];
  const [data, setData] = useState([]);

  const [modalEdicao, setModalEdicao] = useState(false);
  
  const [cargoAberto, setCargoAberto] = useState(false);
  const [valorCargo, setValorCargo] = useState("Todos");
  const [cargo, setCargo] = useState([
    {label: "Todos", value: "Todos"},
    {label: "Supervisor", value: "Supervisor"},
    {label: "Gerente", value: "Gerente"},
    {label: "Cliente", value: "Cliente"},
    {label: "Desativado", value: "Desativado"},
  ]);

  const [cargoAlteradoAberto, setCargoAlteradoAberto] = useState(false);
  const [valorCargoAlterado, setValorCargoAlterado] = useState();
  const [cargoAlterado, setCargoAlterado] = useState([]);
  var numero;
  const [numerousuarios, setNumerousuarios] = useState();
  const [id, setId] = useState()
  const [nome, setNome] = useState()
  const [telefone, setTelefone] = useState()
  const [email, setEmail] = useState()
  const [cargousuario, setCargoUsuario] = useState();

  if (usuario != null){
    banco.collection('Usuarios').where('email', '==', usuario).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setCargoUsuario(doc.data().cargo);
      });
    });
  }

  const Usuarios = () => {
    if (valorCargo == "Todos") {
      banco.collection("Usuarios").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const usuarios = {
            id: doc.id,
            nome: doc.data().nome,
            email: doc.data().email,
            telefone: doc.data().telefone,
            cargo: doc.data().cargo,
          };
          dados.push(usuarios);
        });

        dados.sort((a, b) => (a.nome > b.nome) ? 1 : -1)
        setData(dados);
        numero = dados.length

        if (numero == 1) {
          setNumerousuarios("1 Usuário")
        }

        else {
          setNumerousuarios(numero + " Usuários")
        }
      });
    }

    else {
      banco.collection("Usuarios").where("cargo", "==", valorCargo).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const usuarios = {
            id: doc.id,
            nome: doc.data().nome,
            email: doc.data().email,
            telefone: doc.data().telefone,
            cargo: doc.data().cargo,
          };
          dados.push(usuarios);
        });

        dados.sort((a, b) => (a.nome > b.nome) ? 1 : -1)
        setData(dados);
        numero = dados.length

        if (numero == 1) {
          setNumerousuarios("1 Usuário")
        }

        else {
          setNumerousuarios(numero + " Usuários")
        }
      });
    }
  };

  useEffect(() => {
    Usuarios();
  },);

  const AbrirEdicao = (id, nome, cargo, email, telefone) => {
    setId(id)
    setNome(nome)
    setValorCargoAlterado(cargo)
    setEmail(email)
    setTelefone(telefone)
  }

  const Editar = () => {
    banco.collection("Usuarios").doc(id).update({
      cargo: valorCargoAlterado
    })
    .then(() => {
      setModalEdicao(!modalEdicao);
    });
  }

  return (
    <ScrollView
      style={estilos.main_topo}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <MenuAdmin />

      <Text style={estilos.titulo}>Usuários</Text>
      
      <View style={[estilos.input_grupo, {zIndex: 1}]}>
        <View style={estilos.input_grupo_dropdown}>
          <Text style={[estilos.input_campo, estilos.input_campo_dropdown_ajuste]}>{numerousuarios}</Text>
        
        <View style={{width: "49%"}}>
          <DropDownPicker
            open={cargoAberto}
            value={valorCargo}
            items={cargo}
            setOpen={setCargoAberto}
            setValue={setValorCargo}
            setItems={setCargo}
            placeholder="Cargo"
            placeholderStyle={{fontSize: 15}}
            style={[estilos.input_dropdown, estilos.input_dropdown_ajuste, {width: "100%"}]} 
            textStyle={{color: fonte, fontSize: 15, fontWeight: 500}}
            dropDownContainerStyle={{backgroundColor: fundo, borderWidth: 0,}}
            listItemLabelStyle={{textAlign: "left"}}
            showTickIcon={false}
            arrowIconStyle={{tintColor: fonte}}
          />
          </View>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => {
          cargousu = item.cargo
          if (cargousuario == "Supervisor") {
            if(cargousu == "Supervisor") {
              return (
                <View style={estilos.lista_grupo_listas}>
                  <View style={estilos.lista}>
                    <Text style={estilos.lista_texto}>{item.nome} ({item.cargo})</Text>
                    <Text style={estilos.lista_texto}>{item.email}</Text>
                    <Text style={estilos.lista_texto}>{item.telefone}</Text>
                  </View>
                </View>
              );
            }

            else {
              cargoAlterado.splice(0,cargoAlterado.length)
              cargoAlterado.push({label: "Cliente", value: "Cliente"})
              cargoAlterado.push({label: "Desativado", value: "Desativado"})
              cargoAlterado.push({label: "Gerente", value: "Gerente"})
              return(
                <View style={estilos.lista_grupo_listas}>
                  <View style={[estilos.lista, estilos.lista_acoes_ajustes]}>
                    <Text style={estilos.lista_texto}>{item.nome} ({item.cargo})</Text>
                    <Text style={estilos.lista_texto}>{item.email}</Text>
                    <Text style={estilos.lista_texto}>{item.telefone}</Text>
                  </View>
                  
                  <View style={estilos.lista_grupo_acoes}>
                    <Icon
                      name="create"
                      style={estilos.lista_acoes_icones}
                      onPress={() => {
                        AbrirEdicao(item.id, item.nome, item.cargo, item.email, item.telefone);
                        setModalEdicao(!modalEdicao)
                      }}
                    />
                  </View>
                </View>
              )
            }
          }

          else {
            if(cargousu == "Supervisor" || cargousu == "Gerente") {
              cargoAlterado.splice(0,cargoAlterado.length)
              cargoAlterado.push({label: "Cliente", value: "Cliente"})
              cargoAlterado.push({label: "Desativado", value: "Desativado"})
              return (
                <View style={estilos.lista_grupo_listas}>
                  <View style={estilos.lista}>
                    <Text style={estilos.lista_texto}>{item.nome} ({item.cargo})</Text>
                    <Text style={estilos.lista_texto}>{item.email}</Text>
                    <Text style={estilos.lista_texto}>{item.telefone}</Text>
                  </View>
                </View>
              );
            }

            else {
              return(
                <View style={estilos.lista_grupo_listas}>
                  <View style={[estilos.lista, estilos.lista_acoes_ajustes]}>
                    <Text style={estilos.lista_texto}>{item.nome} ({item.cargo})</Text>
                    <Text style={estilos.lista_texto}>{item.email}</Text>
                    <Text style={estilos.lista_texto}>{item.telefone}</Text>
                  </View>
                  
                  <View style={estilos.lista_grupo_acoes}>
                    <Icon
                      name="create"
                      style={estilos.lista_acoes_icones}
                      onPress={() => {
                        AbrirEdicao(item.id, item.nome, item.cargo, item.email, item.telefone);
                        setModalEdicao(!modalEdicao)
                      }}
                    />
                  </View>
                </View>
              )
            }
          }
        }}
      />

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
          <Text style={estilos.modal_titulo}>Alterar cargo?</Text>

        <View style={estilos.input_grupo}>
          <Icon
            name="person-outline"
            style={estilos.input_icone}
          />
          <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{nome}</Text>

        <View style={estilos.input_grupo_dropdown}>
          <Icon
            name="business-outline"
              style={[estilos.input_icone,{marginTop: 3}]} 
          />
          <DropDownPicker
            open={cargoAlteradoAberto}
            setOpen={setCargoAlteradoAberto}
            value={valorCargoAlterado}
            setValue={setValorCargoAlterado}
            items={cargoAlterado}
            setItems={setCargoAlterado}
            placeholder="Cargo"
            placeholderStyle={{fontSize: 15}}
            style={[estilos.input_dropdown, estilos.input_campo_modal]} 
            textStyle={{color: fonte, fontSize: 15, fontWeight: 500}}
            dropDownContainerStyle={{backgroundColor: fundosec, borderWidth: 0,}}
            listItemLabelStyle={{textAlign: "left"}}
            showTickIcon={false}
            arrowIconStyle={{tintColor: fonte}}
          />
        </View>

          <Icon
            name="call-outline"
            style={estilos.input_icone}
          />
          <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{telefone}</Text>


          <Icon
            name="mail-outline"
            style={estilos.input_icone}
          />
          <Text style={[estilos.input_campo, estilos.input_campo_modal]}>{email}</Text>
        </View>
          
          <View style={estilos.input_acao_grupo}>
            <TouchableOpacity
              style={estilos.input_acao}
              onPress={() => {setModalEdicao(!modalEdicao)}}
            >
              <Text style={estilos.input_acao_texto}>Não</Text>
              <Icon
                name="arrow-back"
                style={estilos.input_acao_icone_modal}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.input_acao}
              onPress={Editar}
            >
              <Text style={estilos.input_acao_texto}>Sim</Text>
              <Icon
                name="create"
                style={estilos.input_acao_icone_modal}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
export default AdminUsuarios;