import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TodoItem } from "../../components/TodoItem";
import { ThemeContext } from "../../context/ThemeContext";
import { TodosContext } from "../../context/TodosContext";

export default function Index() {
  const [text, setText] = useState("");
  const router = useRouter();

  const { todos, loaded, addTodo, toggleTodo, removeTodo } =
    useContext(TodosContext);
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

  const styles = createStyles(theme);

  // Agregar tarea y limpiar el campo si se agregó
  const handleAdd = () => {
    const added = addTodo(text);
    if (added) {
      setText("");
    }
  };

  // Abrir la pantalla de detalles
  const handlePress = (id) => {
    router.push(`/details/${id}`);
  };

  // Cambiar entre tema claro y oscuro
  const handleTheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  if (!loaded) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Cargando tareas...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una tarea"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAdd}
        />

        <Pressable style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>

        {/* Botón de tema */}
        <Pressable style={styles.button} onPress={handleTheme}>
          <MaterialCommunityIcons
            name={
              colorScheme === "light" ? "weather-sunny" : "moon-waning-crescent"
            }
            size={24}
            color={theme.buttonText}
          />
        </Pressable>
      </View>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            onDetails={handlePress}
          />
        )}
        keyExtractor={(todo) => todo.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    loadingText: {
      color: theme.text,
      fontSize: 18,
      padding: 10,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
      padding: 10,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
    },
    input: {
      flex: 1,
      minWidth: 0,
      borderWidth: 2,
      borderRadius: 5,
      borderColor: theme.border,
      padding: 10,
      fontSize: 18,
      color: theme.text,
    },
    button: {
      backgroundColor: theme.primary,
      borderColor: theme.border,
      borderWidth: 2,
      borderRadius: 5,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 18,
    },
  });
}
