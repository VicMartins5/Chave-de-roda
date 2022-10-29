import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { auth } from '../firebase';

export default class Menu extends Component {
  deslogar = () => {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };
  render() {
    return (
      <View style={styles.menu}>
        <View style={styles.touchableOpacityStyle}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Veiculo')}
            style={styles.floatingButtonStyle}>
            <View style={styles.menuboxicones}>
              <Icon name="car" size={30} style={styles.menuicones} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Marcados')}
            style={styles.floatingButtonStyle}>
            <View style={styles.menuboxicones}>
              <Icon name="calendar" size={30} style={styles.menuicones} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.floatingButtonStyle, { borderRightWidth: 0 }]}>
            <View style={styles.menuboxicones}>
              <Icon
                name="star"
                onPress={() => navigation.navigate('Avaliados')}
                size={30}
                style={styles.menuicones}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.floatingButtonStyle, { borderRightWidth: 0 }]}>
            <View style={styles.menuboxicones}>
              <Icon
                name="log-out"
                onPress={this.deslogar}
                size={30}
                style={styles.menuicones}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
