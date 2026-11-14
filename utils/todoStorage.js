import AsyncStorage from "@react-native-async-storage/async-storage";

const TODOS_KEY = "@todo-app:todos"; // llave donde se guarda la lista

// Guardar la lista
export const saveTodos = async (todos) => {
  try {
    const jsonValue = JSON.stringify(todos); // convertir el arreglo a texto
    await AsyncStorage.setItem(TODOS_KEY, jsonValue);
  } catch (error) {
    console.error("No se pudieron guardar las tareas:", error);
  }
};

// Recuperar la lista
export const getTodos = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TODOS_KEY);
    return jsonValue !== null ? JSON.parse(jsonValue) : null; // texto -> arreglo
  } catch (error) {
    console.error("No se pudieron cargar las tareas:", error);
    return null;
  }
};
