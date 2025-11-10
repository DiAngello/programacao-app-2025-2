import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

type Produto = {
  id: string;
  nome: string;
  quantidade: number;
  preco: number;
};

export default function EstoqueScreen() {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [idEditando, setIdEditando] = useState<string | null>(null);

  const ref = collection(db, "estoque");

  async function listar() {
    const snapshot = await getDocs(ref);
    setProdutos(
      snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Produto[]
    );
  }

  async function salvar() {
    if (!nome.trim() || !quantidade || !preco) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    if (idEditando) {
      // Atualiza produto existente
      const docRef = doc(db, "estoque", idEditando);
      await updateDoc(docRef, {
        nome,
        quantidade: Number(quantidade),
        preco: Number(preco),
      });
      setIdEditando(null);
    } else {
      // Cria novo produto
      await addDoc(ref, {
        nome,
        quantidade: Number(quantidade),
        preco: Number(preco),
      });
    }

    limpar();
    listar();
  }

  async function remover(id: string) {
    const docRef = doc(db, "estoque", id);
    await deleteDoc(docRef);
    listar();
  }

  function selecionar(item: Produto) {
    setNome(item.nome);
    setQuantidade(String(item.quantidade));
    setPreco(String(item.preco));
    setIdEditando(item.id);
  }

  function limpar() {
    setNome("");
    setQuantidade("");
    setPreco("");
    setIdEditando(null);
  }

  useEffect(() => {
    listar();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {idEditando ? "Editar Produto" : "Cadastrar Produto"}
      </Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button
        title={idEditando ? "Atualizar Produto" : "Salvar Produto"}
        onPress={salvar}
      />

      <Text style={styles.titulo}>Lista de Produtos</Text>

      <FlatList
        data={produtos}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>Qtd: {item.quantidade}</Text>
            <Text>Preço: R$ {item.preco.toFixed(2)}</Text>

            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => selecionar(item)} />
              <Button
                title="Remover"
                onPress={() => remover(item.id)}
                color="red"
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  nome: { fontWeight: "bold", fontSize: 16 },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
});
