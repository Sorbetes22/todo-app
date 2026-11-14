import { createContext } from "react";

import { useTodos } from "../hooks/useTodos";

export const TodosContext = createContext({});

// Comparte la misma lista entre todas las pantallas (lista y detalles)
export const TodosProvider = ({ children }) => {
  const todos = useTodos();

  return (
    <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>
  );
};
