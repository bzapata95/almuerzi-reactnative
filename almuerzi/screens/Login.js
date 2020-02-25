import React from "react";
import {
  AsyncStorage,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert
} from "react-native";

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

export default function LoginScreen({ navigation }) {
  const initialState = {
    email: "",
    password: ""
  };

  const onSubmit = values => {
    fetch("https://serverless.bzapata95.now.sh/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          Alert.alert("Error", data.message);
        }
        if (data.token) {
          AsyncStorage.setItem("token", data.token);
          navigation.navigate("Meals");
        }
      });
  };

  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
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
      <Button title="Iniciar sesión" onPress={handleSubmit} />
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}
