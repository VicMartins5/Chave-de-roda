import {
  StyleSheet,
  Dimensions,
} from "react-native";

var fundo = "#222222";
var fundosec = "#383838";
var fonte = "#ffa500";

export { fundo, fundosec, fonte};

var width = Dimensions.get("window").width;

const estilos = StyleSheet.create({
  // CADASTRO
  main_topo: {
    flex: 1,
    paddingHorizontal: "5%",
    alignContent: "center",
    paddingTop: 20,
    backgroundColor: fundo,
  },

  titulo: {
    color: fonte,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },

  input_grupo: {
    flexDirection: "row",
    width: "90%",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center"
  },

  input_icone: {
    fontSize: 15,
    paddingTop: 13,
    width: "6%",
    borderBottomWidth: 1,
    borderBottomColor: fonte,
    marginBottom: 10,
    color: fonte,
    textAlign: "center"
  },

  input_campo: {
    width: "94%",
    backgroundColor: fundo,
    padding: 10,
    color: fonte,
    borderBottomWidth: 1,
    borderBottomColor: fonte,
    fontSize: 15,
    marginBottom: 10,
    outlineStyle: "none",
    textAlign: "left",
    fontWeight: 500
  },

  input_acao_grupo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    flexWrap: "wrap",
    zIndex: 1,
  },

  input_acao: {
    width: "49%",
    backgroundColor: fonte,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },

  input_acao_texto: {
    fontSize: 15,
    fontWeight: 500,
    color: fundo,
  },

  input_acao_icone: {
    color: fundo,
    fontSize: 20,
  },

  modal: {
    borderRadius: 10,
    paddingHorizontal: "1%",
    backgroundColor: fundosec,
    paddingVertical: 20,
    width: "90%",
    alignSelf: "center"
  },

  logo: {
    width: width * 0.4,
    height: width * 0.4 * 0.55,
    alignSelf: "center",
    marginBottom: 20,
    tintColor: fonte,
  },

  modal_titulo: {
    color: fonte,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },

  modal_subtitulo: {
    color: fonte,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 10,
  },

  // RODAPÉ
  rodape: {
    backgroundColor: fundo,
    paddingVertical: 10,
    width: "100%"
  },

  rodape_texto: {
    color: fonte,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },

  rodape_dev: {
    color: fonte,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 5,
  },

  // LOGIN
  main_meio: {
    flex: 1,
    paddingHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: fundo,
  },

  input_acao_senha: {
    paddingHorizontal: 10,
    backgroundColor: fundo,
    alignSelf: "center",
    marginTop: 10,
  },

  input_acao_texto_senha: {
    color: fonte,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },

  // MENU
  menu: {
    justifyContent: "space-between",
    backgroundColor: fundo,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: "2%"
  },

  menu_itens: {
    color: fonte,
    fontSize: 25,
    padding: 5,
  },

  // SELEÇÃO VEICULO
  servicos_veiculo_card: {
    backgroundColor: fundo,
    marginBottom: 20,
    width: "100%",
    height: 200,
  },

  servicos_veiculo_texto: {
    width: "100%",
    backgroundColor: fundosec,
    opacity: 0.8,
    color: fonte,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
    bottom: 0,
    paddingVertical: 2,
  },

  // SERVIÇOS (MARCAR)
  lista_grupo_listas: {
    marginTop: 10,
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",
  },

  lista: {
    backgroundColor: fundosec,
    borderRadius: 10,
    width: "100%",
    paddingVertical: 10,
    marginBottom: 10
  },

  lista_texto: {
    textAlign: "left",
    fontWeight: "500",
    fontSize: 12,
    color: fonte,
    paddingHorizontal: 10,
  },

  input_grupo_dropdown: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    flexWrap: "nowrap",
    zIndex: 10
  },

  input_dropdown: {
    marginBottom: 10,
    backgroundColor: fundo,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: fonte,
    borderBottomWidth: 1,
    textAlign: "left",
    width: '95%'
  },

  // LISTAS (MARCADOS)
  lista_separador: {
    width: "100%",
    marginVertical: "2%",
    borderBottomColor: fonte,
    borderBottomWidth: 1,
  },

  lista_acoes_ajustes: {
    width: "90%",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 0,
  },

  lista_grupo_acoes: {
    width: "10%",
    borderLeftColor: fonte,
    borderLeftWidth: 1,
    backgroundColor: fundosec,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "column",
    justifyContent: "space-around",
  },

  lista_acoes_icones: {
    fontSize: 15,
    color: fonte,
    alignSelf: "center",
    marginVertical: 10
  },

  input_campo_modal: {
    backgroundColor: fundosec,
    textAlign: "left",
  },

  input_acao_icone_modal: {
    color: fundosec,
    fontSize: 20,
  },

  // SERVICOS (CRIAR)
  input_acao_dropdown_ajuste: {
    width: "49%",
    marginRight: "2%",
    marginTop: 10,
    height: 40,
  },

  input_dropdown_ajuste: {
    width: "49%",
  },

  // USUARIOS (LISTAR)
  input_campo_dropdown_ajuste: {
    width: "49%",
    height: 40,
    marginTop: 10,
  },

  admin_inicio: {
    width: width * 0.8,
    height: width * 0.8 * 0.55,
    alignSelf: "center",
    tintColor: fonte,
    marginBottom: 20,
  }
});

export default estilos;