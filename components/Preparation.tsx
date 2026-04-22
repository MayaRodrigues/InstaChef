import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Preparation({ route }: any) {
  const { receita, imagemSource } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        {imagemSource ? (
          <Image source={imagemSource} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]} />
        )}

        <View style={styles.header}>
          <Text style={styles.nome}>{receita.nome}</Text>

          <Text style={styles.descricao}>
            {receita.descricao || "Receita deliciosa e fácil de fazer."}
          </Text>

          <Text style={styles.section}>Ingredientes</Text>

          {receita.ingredientes.map((item: string, i: number) => (
            <Text key={i} style={styles.item}>
              • {item}
            </Text>
          ))}

          <Text style={styles.section}>Modo de preparo</Text>

          {receita.preparo?.map((passo: string, i: number) => (
            <Text key={i} style={styles.item}>
              {i + 1}. {passo}
            </Text>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.button}>Salvar receita</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf9f6",
  },
  header: {
    backgroundColor: "#FFEC89",
    borderRadius: 50,
    padding: 65,
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: -20,
    borderBottomRightRadius: -20,
  },

  imagePlaceholder: {
    backgroundColor: "#e0e0e0",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  nome: {
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 15,
    color: "#BA3801",
  },

  descricao: {
    margin: 15,
    color: "#555",
  },

  section: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginTop: 10,
    color: "#4A69B3",
  },

  item: {
    marginHorizontal: 20,
    marginTop: 5,
    fontSize: 17,
  },

  footer: {
    padding: 15,
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "#BA3801",
    color: "#fff",
    textAlign: "center",
    padding: 15,
    borderRadius: 20,
  },
});
