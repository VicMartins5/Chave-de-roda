import {
  StyleSheet,
  Dimensions,
} from 'react-native';

var fundo = '#222222';
var fundosec = '#383838';
var fonte = '#ffa500';

var width = Dimensions.get('window').width;

const estilos = StyleSheet.create({
  main_meio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: fundo,
    paddingHorizontal: '5%',
  },

  main_topo: {
    flex: 1,
    paddingHorizontal: '5%',
    alignContent: 'center',
    textAlign: 'center',
    paddingTop: 20,
    backgroundColor: fundo,
  },

  logo: {
    width: width * 0.4,
    height: width * 0.4 * 0.55,
    alignSelf: 'center',
    marginBottom: 10,
    tintColor: fonte,
  },

  input_gp: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },

  input_icone: {
    paddingTop: 13,
    width: '6%',
    borderBottomWidth: 1,
    borderBottomColor: fonte,
    marginBottom: 10,
    paddingLeft: '1%',
    color: fonte,
  },

  input: {
    width: '94%',
    backgroundColor: fundo,
    padding: '10px',
    color: fonte,
    borderBottomWidth: 1,
    borderBottomColor: fonte,
    fontSize: 15,
    marginBottom: 10,
    outlineStyle: 'none',
    textAlign: 'left'
  },

  acao_gp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    flexWrap: 'wrap',
  },

  acao_senha: {
    color: fonte,
    fontWeight: 'bold',
    fontSize: 12,
    width: '100%',
    textAlign: 'center',
  },

  acao: {
    marginTop: 10,
    width: '49%',
    backgroundColor: fonte,
    padding: '10px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: fundo,
  },

  acao_icone: {
    color: fundo,
  },

  titulo: {
    color: fonte,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },

  card: {
    backgroundColor: fundo,
    marginBottom: 20,
    width: '100%',
    height: 200,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },

  veiculo: {
    width: '100%',
    backgroundColor: fundosec,
    opacity: 0.8,
    color: fonte,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 2,
  },

  menu: {
    marginBottom: 60,
    position: 'absolute',
    justifyContent: 'center',
    right: 0,
    top: 0,
    backgroundColor: fundo,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  menu_botao: {
    width: '25%',
    height: 50,
    backgroundColor: fundo,
  },

  menu_icones: {
    alignSelf: 'center',
    color: fonte,
  },

  rodape: {
    textAlign: 'center',
    backgroundColor: fundo,
    paddingVertical: 10,
  },

  rodape_texto: {
    color: fonte,
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  rodape_dev: {
    marginBottom: 0,
  },

  marcados: {
    backgroundColor: fundosec,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    flex: 1,
  },

  marcados_info: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    padding: 10,
  },

  marcados_veiculo: {
    width: '40%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
    color: fonte,
  },

  marcados_data: {
    width: '60%',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 12,
    color: fonte,
  },

  marcados_descricao: {
    width: '90%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
    color: fonte,
  },

  marcados_icones: {
    color: fonte,
    width: '5%',
  },
});

export default estilos;