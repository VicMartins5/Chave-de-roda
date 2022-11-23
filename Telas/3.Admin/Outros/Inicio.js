import {
  ScrollView,
  View,
  Image
} from "react-native";

import estilos from "../../Estilos"
import MenuAdmin from "../../0.Extras/MenuAdmin"

const AdminInicio = () => {
  return (
    <View style={estilos.main_topo}>
      <MenuAdmin/>
      <ScrollView
        style={estilos.main_meio}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Image style={estilos.admin_inicio} source={require("../../../Imagens/Logo.svg")} />
      </ScrollView>
    </View>
  );
};

export default AdminInicio;