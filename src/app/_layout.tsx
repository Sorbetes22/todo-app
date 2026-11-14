import { ThemeContext, ThemeProvider } from "@/context/ThemeContext";
import { TodosProvider } from "@/context/TodosContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// El Stack usa los colores del tema (header y fondo de las pantallas)
function RootStack() {
  const { colorScheme, theme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="details/[id]" options={{ title: "Detalles" }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TodosProvider>
          <RootStack />
        </TodosProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
