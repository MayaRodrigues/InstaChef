import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import receitas from "../data/receitas.json";

export default function Home({ navigation }: any) {
  const nome = "InstaChef";

  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);

  const ingredientes = [
    "Ovo",
    "Leite",
    "Farinha",
    "Açucar",
    "Manteiga",
    "Fermento",
    "Tomate",
    "Cebola",
    "Alho",
    "Queijo",
    "Frango",
    "Carne",
    "Pão",
    "Batata",
    "Cenoura",
  ];

  const ingredientesDaCategoria = categoriaSelecionada
    ? Array.from(
        new Set(
          receitas.receitas
            .filter((r) => r.categoria === categoriaSelecionada)
            .flatMap((r) => r.ingredientes),
        ),
      )
    : ingredientes;

  const ingredientesFiltrados = ingredientesDaCategoria.filter((item) =>
    item.toLowerCase().includes(busca.toLowerCase()),
  );

  function toggleCategoria(cat: string) {
    setCategoriaSelecionada((prev) => (prev === cat ? null : cat));
    setSelecionados([]);
  }

  function toggleIngrediente(item: string) {
    if (selecionados.includes(item)) {
      setSelecionados(selecionados.filter((i) => i !== item));
    } else {
      setSelecionados([...selecionados, item]);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bem-vindo ao {nome}</Text>

        <Text style={styles.title}>
          O que você tem em casa{"\n"}
          <Text style={{ color: "#BA3801" }}>hoje</Text>, chef?
        </Text>

        <TextInput
          placeholder="Buscar ingrediente..."
          placeholderTextColor="#aaa"
          style={styles.search}
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Categorias</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["Lanche", "Jantar", "Sobremesa", "Vegano"].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.category,
                categoriaSelecionada === item && styles.categoryAtiva,
              ]}
              onPress={() => toggleCategoria(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  categoriaSelecionada === item && styles.categoryTextAtiva,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Seus Ingredientes</Text>
          <Text style={styles.seeAll}>
            {ingredientesFiltrados.length} disponíveis
          </Text>
        </View>

        <View style={styles.grid}>
          {ingredientesFiltrados.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.Card,
                selecionados.includes(item) && styles.cardSelecionado,
              ]}
              onPress={() => toggleIngrediente(item)}
            >
              <Text
                style={[
                  styles.cardText,
                  selecionados.includes(item) && { color: "#fff" },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {ingredientesFiltrados.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum ingrediente encontrado 😢
          </Text>
        )}

        {selecionados.length > 0 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Receita", {
                ingredientes: selecionados,
              })
            }
          >
            <Text style={styles.buttonText}>
              Buscar receitas ({selecionados.length})
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={styles.tabBar}>
        <Text style={styles.activeTab}>Início</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Receita", { ingredientes: [] })}
        >
          <Text style={styles.tab}>Receitas</Text>
        </TouchableOpacity>
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
  },
  header: {
    backgroundColor: "#FFEC89",
    padding: 65,
    alignItems: "center",
  },
  greeting: {
    color: "#4A69B3",
    fontSize: 16,
    textAlign: "right",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  search: {
    backgroundColor: "#fffdfd",
    borderRadius: 30,
    marginTop: 20,
    width: 300,
    padding: 25,
    color: "#4A69B3 ",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    marginTop: -30,
    // marginBottom: -20,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "600",
  },
  seeAll: {
    color: "#FF6A00",
  },
  category: {
    backgroundColor: "#FFEC89",
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    marginRight: 10,
  },
  categoryAtiva: {
    backgroundColor: "#BA3801",
  },
  categoryText: {
    color: "#4a69b3a6",
  },
  categoryTextAtiva: {
    color: "#fff",
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  Card: {
    width: "48%",
    backgroundColor: "#f0efef",
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  cardSelecionado: {
    backgroundColor: "#BA3801",
  },

  button: {
    backgroundColor: "#BA3801",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: -30,
    marginBottom: 50,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  cardText: {
    color: "#4A69B3",
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
