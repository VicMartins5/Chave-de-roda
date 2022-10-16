import React from 'react';
 import {StyleSheet, View, TouchableOpacity} from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
 
const Menu = ({navigation}) => {
  return (
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
  );
};
 
export default Menu;
 
const styles = StyleSheet.create({
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
});