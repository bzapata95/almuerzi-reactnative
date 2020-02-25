import React from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";

import useForm from "../hooks/useForm";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 16
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    alignSelf: "stretch",
    marginBottom: 10,
    paddingHorizontal: 5
  }
});

export default function RegisterScreen({ navigation }) {
  const initialState = {
    email: "",
    password: ""
  };

  const onSubmit = values => {
    fetch("https://serverless.bzapata95.now.sh/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Usuario creado con éxito") {
          return Alert.alert("Éxito", data.message, [
            {
              text: "Ir al inicio",
              onPress: () => {
                navigation.navigate("Login");
              }
            }
          ]);
        }
        Alert.alert("Error", data.message);
      });
  };

  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        value={inputs.email}
        onChangeText={subscribe("email")}
        textContentType="emailAddress"
        autoCapitalize="none"
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={inputs.password}
        onChangeText={subscribe("password")}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <Button title="Enviar" onPress={handleSubmit} />
      <Button
        title="Volver al inicio"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}
