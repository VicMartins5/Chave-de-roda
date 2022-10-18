import React  from "react";
import { Text , View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';

const Veiculo = ({navigation}) => {
    return(
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.menu}>
          <View style={styles.touchableOpacityStyle}>
            <TouchableOpacity onPress={() => navigation.navigate("Veiculos")} style={styles.floatingButtonStyle}>
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
          <Text style={styles.titulo}>Selecione o veículo</Text>

          <TouchableOpacity onPress={() => navigation.navigate("Marcar")}>
            <ImageBackground style={styles.card} imageStyle={{ borderRadius: 10 }} source={require('../Imagens/Carro.jpg')}>
              <Text style={styles.veiculo}>Carro</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Marcar")}>
            <ImageBackground style={styles.card} imageStyle={{ borderRadius: 10 }} source={require('../Imagens/Moto.jpg')}>
              <Text style={styles.veiculo}>Moto</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Marcar")}>
            <ImageBackground style={styles.card} imageStyle={{ borderRadius: 10 }} source={require('../Imagens/Bicicleta.jpg')}>
              <Text style={styles.veiculo}>Bicicleta</Text>
            </ImageBackground>
                    
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Marcar")}>
            <ImageBackground style={styles.card} imageStyle={{ borderRadius: 10 }} source={require('../Imagens/Outros.jpg')}>
            <Text style={styles.veiculo}>Outros</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
}
export default Veiculo;
  
const styles = StyleSheet.create({
  main :{
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

  card: {
    backgroundColor: '#383838',
    marginBottom: 20,
    width: '100%',
    height: 200,
    position: "relative",
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },

  veiculo: {
    width: '100%',
    backgroundColor: 'rgba(56,56,56,0.8)',
    color: '#ffa500',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    position: "absolute",
    bottom: 0,
    paddingVertical: 1,
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