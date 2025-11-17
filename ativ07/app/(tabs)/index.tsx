import { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  Animated
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

function ProdutoItem({ item, onEditar, onRemover }: any) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.item, { opacity: fade, transform: [{ scale }] }]}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text>Qtd: {item.quantidade}</Text>
      <Text>Preço: R$ {item.preco.toFixed(2)}</Text>

      <View style={styles.botoes}>
        <Button title="Editar" onPress={() => onEditar(item)} />
        <Button title="Remover" onPress={() => onRemover(item.id)} color="red" />
      </View>
    </Animated.View>
  );
}

export default function EstoqueScreen() {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [idEditando, setIdEditando] = useState<string | null>(null);

  const formAnim = useRef(new Animated.Value(1)).current;

  const ref = collection(db, "estoque");

  function animarForm() {
    Animated.sequence([
      Animated.timing(formAnim, {
        toValue: 1.05,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(formAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }

  async function listar() {
    const snapshot = await getDocs(ref);
    setProdutos(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Produto[]);
  }

  async function salvar() {
    if (!nome || !quantidade || !preco) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    animarForm();

    if (idEditando) {
      const docRef = doc(db, "estoque", idEditando);
      await updateDoc(docRef, {
        nome,
        quantidade: Number(quantidade),
        preco: Number(preco),
      });
      setIdEditando(null);
    } else {
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
    await deleteDoc(doc(db, "estoque", id));
    listar();
  }

  function selecionar(item: Produto) {
    setNome(item.nome);
    setQuantidade(String(item.quantidade));
    setPreco(String(item.preco));
    setIdEditando(item.id);

    Animated.spring(formAnim, {
      toValue: 1.07,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(formAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });
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
      <Animated.View style={{ transform: [{ scale: formAnim }] }}>
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
      </Animated.View>

      <Text style={styles.titulo}>Lista de Produtos</Text>

      <FlatList
        data={produtos}
        renderItem={({ item }) => (
          <ProdutoItem item={item} onEditar={selecionar} onRemover={remover} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

// Estilos
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
