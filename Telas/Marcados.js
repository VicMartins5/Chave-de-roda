import React  from "react";
import { Text , View, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';

const Marcados = ({navigation}) => {
    return(
      <View style={styles.container}>
        <View style={styles.menu}>
          <View style={styles.touchableOpacityStyle}>
            <TouchableOpacity onPress={() => navigation.navigate("Veiculo")} style={styles.floatingButtonStyle}>
              <View style={styles.menuboxicones}>
                <Icon name="car" size={30} style={styles.menuicones}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Marcados")} style={styles.floatingButtonStyle}>
              <View style={styles.menuboxicones}>
                <Icon name="calendar" size={30} style={styles.menuicones}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Dados")} style={styles.floatingButtonStyle}>
              <View style={styles.menuboxicones}>
                <Icon name="settings" size={30} style={styles.menuicones}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.floatingButtonStyle,{ borderRightWidth: 0}]}>
              <View style={styles.menuboxicones}>
                <Icon name="log-out" onPress={() => navigation.navigate("Login")} size={30} style={styles.menuicones}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={{paddingHorizontal: '10%'}}>
          <Text style={styles.titulo}>Serviços marcados</Text>

          <View style={styles.marcados}>
            <View style={[styles.info,{ borderBottomColor: '#ffa500', borderBottomWidth: 1}]}>
              <Text style={styles.veiculo}>Carro</Text>
              <Text style={styles.data}>16/11/2022 - 08:12</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.desc}>Serviço de suspensão, pastilhas, troca de óleo, troca de filtros, revisão geral.</Text>
              <View style={styles.gpicones}>
                <Icon name="create" size={15} style={styles.icones}/>
                <Icon name="trash" size={15} style={[styles.icones,{ marginTop: 10}]}/>
              </View>
            </View>
          </View>

          <View style={styles.marcados}>
            <View style={[styles.info,{ borderBottomColor: '#ffa500', borderBottomWidth: 1}]}>
              <Text style={styles.veiculo}>Carro</Text>
              <Text style={styles.data}>16/11/2022 - 08:12</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.desc}>Serviço de suspensão, pastilhas, troca de óleo, troca de filtros, revisão geral.</Text>
              <View style={styles.gpicones}>
                <Icon name="create" size={15} style={styles.icones}/>
                <Icon name="trash" size={15} style={[styles.icones,{ marginTop: 10}]}/>
              </View>
            </View>
          </View>

          <View style={styles.marcados}>
            <View style={[styles.info,{ borderBottomColor: '#ffa500', borderBottomWidth: 1}]}>
              <Text style={styles.veiculo}>Carro</Text>
              <Text style={styles.data}>16/11/2022 - 08:12</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.desc}>Serviço de suspensão, pastilhas, troca de óleo, troca de filtros, revisão geral.</Text>
              <View style={styles.gpicones}>
                <Icon name="create" size={15} style={styles.icones}/>
                <Icon name="trash" size={15} style={[styles.icones,{ marginTop: 10}]}/>
              </View>
            </View>
          </View>

        </View>
      </View>
    )
}
export default Marcados;
  
const styles = StyleSheet.create({
  container :{
    flex: 1,
    alignContent:'center',
    textAlign: 'center',
    backgroundColor: '#222222',
  },

  titulo: {
    color: '#ffa500',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },

  marcados: {
    backgroundColor: '#383838',
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    height: 'auto',
    flex: 1
  },

  info: {
    flexDirection: "row",
    width: '100%',
    alignSelf: 'center',
    flexWrap: "wrap",
    padding: 10,
  },

  veiculo: {
    width: '40%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffa500',
  },

  data: {
    width: '60%',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffa500',
  },

  desc: {
    width: '90%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffa500',
  },

  gpicones: {
    flexDirection: "column",
    marginLeft: "5%",
    width: '5%',
    flexWrap: "wrap",
  },

  icones: {
    color: '#ffa500',
  },

  menu: {
    marginBottom: 60,
  },

  menuicones: {
    alignSelf: 'center',
    color: '#ffa500',
  },

  menuboxicones: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  touchableOpacityStyle: {
    position: 'absolute',
    justifyContent: 'center',
    right: 0,
    top: 0,
    backgroundColor: '#222222',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  floatingButtonStyle: {
    width: '25%',
    height: 50,
    backgroundColor: '#222222',
  },
})