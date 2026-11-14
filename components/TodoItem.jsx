import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ThemeContext } from "../context/ThemeContext";

export const TodoItem = React.memo(({ item, onToggle, onRemove, onDetails }) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.itemRow}>
      {/* Tocar = completar, mantener presionado = ver detalles */}
      <Text
        style={[styles.todoItem, item.completed && styles.completedText]}
        onPress={() => onToggle(item.id)}
        onLongPress={() => onDetails(item.id)}
      >
        {item.title}
      </Text>

      <Pressable onPress={() => onDetails(item.id)}>
        <MaterialCommunityIcons
          name="information-outline"
          size={24}
          color={theme.icon}
        />
      </Pressable>

      <Pressable onPress={() => onRemove(item.id)}>
        <MaterialCommunityIcons name="delete" size={24} color={theme.icon} />
      </Pressable>
    </View>
  );
});

function createStyles(theme) {
  return StyleSheet.create({
    itemRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      padding: 10,
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
    },
    todoItem: {
      flex: 1,
      fontSize: 18,
      color: theme.text,
    },
    completedText: {
      color: theme.completedText,
      textDecorationLine: "line-through",
    },
  });
}
