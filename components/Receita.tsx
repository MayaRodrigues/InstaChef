import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import receitas from "../data/receitas.json";

const imagemMap: Record<string, any> = {
  "../assets/img/misto_quente.jpg": require("../assets/images/misto_quente.jpg"),
  "../assets/img/pao_ovo.jpg": require("../assets/images/pao_com_ovo.jpg"),
  "../assets/img/batata_queijo.jepg": require("../assets/images/batata_queijo.jpeg"),
  "../assets/img/frango_alho.jpg": require("../assets/images/frango_alho.jpg"),
  "../assets/img/frango_tomate.jpg": require("../assets/images/frango_tomate.jpg"),
  "../assets/img/carne_refogada.jpg": require("../assets/images/carne_cebola.jpg"),
  "../assets/img/batata_cenoura.jpg": require("../assets/images/batata_cenoura.jpg"),
  "bolo.jpg": require("../assets/images/bolo.jpg"),
  "../assets/img/omelete.png": require("../assets/images/omelete.png"),
  "../assets/img/pudim-de-leite.jpg": require("../assets/images/pudim-de-leite.jpg"),
  "../assets/img/salada_tomate.jpg": require("../assets/images/salada_tomate.jpg"),
  "../assets/img/sopa_cenoura.jpg": require("../assets/images/sopa_cenoura.jpg"),
  "../assets/img/cenoura_cozida.jpg": require("../assets/images/cenoura_cozida.jpg"),
  "../assets/img/batata_assada.jpg": require("../assets/images/batata_assada.jpg"),
  "../assets/img/refogado_tomate.jpg": require("../assets/images/refogado_tomate.jpg"),
  "../assets/img/creme_de_leite.jpg": require("../assets/images/creme_de_leite.jpg"),
  "../assets/img/ovo_frito.jpg": require("../assets/images/ovo_frito.jpg"),
  "../assets/img/biscoito.jpg": require("../assets/images/biscoito.jpg"),
  "../assets/img/salada_cenoura.jpg": require("../assets/images/salada_cenoura.jpg"),
};

export default function Receita({ route, navigation }: any) {
  const selecionados: string[] = route.params?.ingredientes ?? [];

  const receitasFiltradas =
    selecionados.length > 0
      ? receitas.receitas.filter((receita) =>
          receita.ingredientes.some((ing) => selecionados.includes(ing)),
        )
      : receitas.receitas;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receitas</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {receitasFiltradas.map((item) => {
          const img = imagemMap[item.imagem];
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => navigation.navigate("Preparation", { receita: item, imagemSource: img })}
            >
              {img ? (
                <Image source={img} style={styles.image} />
              ) : (
                <View style={[styles.image, styles.imagePlaceholder]} />
              )}
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.categoria}>{item.categoria}</Text>
              <Text style={styles.ingredientes}>{item.ingredientes.join(" • ")}</Text>
            </TouchableOpacity>
          );
        })}

        {receitasFiltradas.length === 0 && (
          <Text style={styles.empty}>Nenhuma receita encontrada</Text>
        )}
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.tab}>Início</Text>
        </TouchableOpacity>
        <Text style={styles.activeTab}>Receitas</Text>
        <Text style={styles.tab}>Salvos</Text>
        <Text style={styles.tab}>Perfil</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEC89",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 15,
  },
  imagePlaceholder: {
    backgroundColor: "#e0e0e0",
  },
  nome: {
    fontWeight: "bold",
    marginTop: 5,
  },
  categoria: {
    color: "#4A69B3",
  },
  ingredientes: {
    color: "#4A69B3",
    fontSize: 11,
    marginTop: 4,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#ff6a00",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  activeTab: {
    color: "#fff",
    fontWeight: "bold",
  },
  tab: {
    color: "#4A69B3",
  },
});
