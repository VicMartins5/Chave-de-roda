import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';

import estilos from './0.Outros/Estilos'

const Rodape = () => {
  return (
    <View style={estilos.rodape}>
      <Text style={estilos.rodape_texto}>
        Desenvolvido por
      </Text>

      <TouchableOpacity
        onPress={() => Linking.openURL('https://github.com/Anderson780')}
        style={[estilos.rodape_texto, estilos.rodape_dev]}>
        Anderson Soares Gomes
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => Linking.openURL('https://github.com/VicMartins5')}
        style={[estilos.rodape_texto, estilos.rodape_dev]}>
        Victor Aurelio Camelo Martins
      </TouchableOpacity>
    </View>
  );
};

export default Rodape;