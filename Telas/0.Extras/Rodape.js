import {
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import estilos from '../Estilos'

const Rodape = () => {
  return (
    <View style={estilos.rodape}>
      <Text style={estilos.rodape_texto}>Desenvolvido por</Text>

      <TouchableOpacity
        style={{alignSelf: "center"}}
        onPress={() => Linking.openURL('https://github.com/Anderson780')}
      >
        <Text style={estilos.rodape_dev}>Anderson Soares Gomes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{alignSelf: "center"}}
        onPress={() => Linking.openURL('https://github.com/VicMartins5')}
      >
        <Text style={estilos.rodape_dev}>Victor Aurelio Camelo Martins</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Rodape;