import {
  ScrollView,
  View,
  Image
} from "react-native";

import estilos from "../Estilos"
import Menu from "../0.Extras/Menu"

const Inicio = () => {
  return (
    <View style={estilos.main_topo}>
      <Menu/>
      <ScrollView
        style={estilos.main_meio}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Image style={estilos.admin_inicio} source={require("../../Imagens/Logo.svg")} />
      </ScrollView>
    </View>
  );
};

export default Inicio;