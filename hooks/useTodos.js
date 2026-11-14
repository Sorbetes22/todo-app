import { useEffect, useState } from "react";

import { data } from "../data/todos";
import { getTodos, saveTodos } from "../utils/todoStorage";

export const useTodos = () => {
  // [...data] hace una copia para no modificar el arreglo original
  const [todos, setTodos] = useState(() =>
    [...data].sort((a, b) => b.id - a.id),
  );

  // Indica si ya terminó de leer lo guardado
  const [loaded, setLoaded] = useState(false);

  // Al abrir la app: recuperar lo que se guardó la última vez.
  // Si no hay nada guardado (null), se quedan los ejemplos de data/todos.js
  useEffect(() => {
    const loadTodos = async () => {
      const savedTodos = await getTodos();

      if (savedTodos !== null) {
        setTodos(savedTodos);
      }

      setLoaded(true);
    };

    loadTodos();
  }, []);

  // Cada vez que agrego, completo o elimino una tarea, se guarda la lista
  useEffect(() => {
    if (!loaded) return; // no guardar mientras todavía está leyendo

    saveTodos(todos);
  }, [todos, loaded]);

  // Agregar tarea
  const addTodo = (title) => {
    if (!title.trim()) return false;

    const newId =
      todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

    setTodos((prevTodos) => [
      { id: newId, title: title.trim(), completed: false },
      ...prevTodos,
    ]);

    return true;
  };

  // Marcar / desmarcar tarea
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Editar el título de una tarea
  const updateTodo = (id, title) => {
    if (!title.trim()) return false;

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: title.trim() } : todo,
      ),
    );

    return true;
  };

  // Eliminar tarea
  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    loaded,
    addTodo,
    toggleTodo,
    updateTodo,
    removeTodo,
  };
};
