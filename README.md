# Todo App

App de tareas hecha con React Native y Expo (Expo Router).

## Qué hace

- Muestra las tareas iniciales de `data/todos.js`.
- Agrega una tarea con el botón **Add** (o con Enter). No acepta textos vacíos.
- Tocar una tarea la marca como completada (gris y tachada); tocarla otra vez la desmarca.
- El ícono de basura elimina la tarea.
- El ícono de información (o mantener presionada la tarea) abre `/details/[id]`, donde se puede editar el título y cambiar el estado.
- El botón de sol/luna cambia entre tema claro y oscuro.
- La lista se guarda con AsyncStorage, así que no se pierde al cerrar la app.

## Estructura

```text
components/
  TodoItem.jsx        # Cada fila de la lista
constants/
  colors.js           # Colores del tema claro y oscuro
context/
  ThemeContext.js     # Contexto del tema
  TodosContext.js     # Comparte la lista entre pantallas
data/
  todos.js            # Tareas iniciales
hooks/
  useTodos.js         # Estado de la lista: agregar, completar, editar, eliminar, cargar y guardar
utils/
  todoStorage.js      # Guardar y leer la lista con AsyncStorage
src/app/
  _layout.tsx         # Stack de navegación + providers
  index.jsx           # Pantalla principal
  details/
    [id].jsx          # Pantalla de detalles (editar tarea)
```

## Cómo se creó

```bash
npx create-expo-app@latest todo-app
npm run reset-project
npx expo install @expo/vector-icons @react-native-async-storage/async-storage
```

## Cómo correrla

```bash
npm install
npm start
```

Para abrirla directo en el navegador:

```bash
npm run web
```
