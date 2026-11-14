import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemeContext } from "../../../context/ThemeContext";
import { TodosContext } from "../../../context/TodosContext";

export default function Details() {
  const { id } = useLocalSearchParams();

  const { theme } = useContext(ThemeContext);
  const { todos, loaded } = useContext(TodosContext);

  const styles = createStyles(theme);

  // Buscar la tarea con el id de la ruta
  const todo = todos.find((item) => item.id === Number(id));

  let content;
  if (!loaded) {
    content = <Text style={styles.label}>Cargando tarea...</Text>;
  } else if (!todo) {
    content = <Text style={styles.label}>No se encontró la tarea {id}</Text>;
  } else {
    content = <EditTodo todo={todo} styles={styles} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      {content}
    </SafeAreaView>
  );
}

// Formulario para editar la tarea
function EditTodo({ todo, styles }) {
  const router = useRouter();
  const { updateTodo, toggleTodo } = useContext(TodosContext);
  const [title, setTitle] = useState(todo.title);

  // Guardar el nuevo título y regresar a la lista
  const handleSave = () => {
    const updated = updateTodo(todo.id, title);
    if (updated) {
      router.back();
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.label}>Tarea #{todo.id}</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={handleSave}
        placeholder="Título de la tarea"
        placeholderTextColor="gray"
      />

      <Pressable style={styles.statusRow} onPress={() => toggleTodo(todo.id)}>
        <Text style={styles.label}>
          Estado: {todo.completed ? "Completada ✅" : "Pendiente ⏳"}
        </Text>
        <Text style={styles.link}>(tocar para cambiar)</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
      </Pressable>
    </View>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      gap: 15,
      padding: 10,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
    },
    label: {
      color: theme.text,
      fontSize: 18,
      padding: 10,
    },
    input: {
      borderWidth: 2,
      borderRadius: 5,
      borderColor: theme.border,
      padding: 10,
      fontSize: 18,
      color: theme.text,
    },
    statusRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    link: {
      color: theme.completedText,
      fontSize: 14,
    },
    button: {
      backgroundColor: theme.primary,
      borderColor: theme.border,
      borderWidth: 2,
      borderRadius: 5,
      padding: 10,
      alignItems: "center",
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 18,
    },
  });
}
