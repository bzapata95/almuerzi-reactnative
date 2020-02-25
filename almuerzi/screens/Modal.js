import React from "react";
import { AsyncStorage, View, Text, StyleSheet, Button } from "react-native";
import useFetch from "../hooks/useFetch";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default function Modal({ navigation }) {
  const id = navigation.getParam("_id");

  const { loading, data } = useFetch(
    `https://serverless.bzapata95.now.sh/api/meals/${id}`
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <>
          <Text>{data._id}</Text>
          <Text>{data.name}</Text>
          <Text>{data.description}</Text>
          <Button
            title="Aceptar"
            onPress={() => {
              AsyncStorage.getItem("token").then(x => {
                fetch("https://serverless.bzapata95.now.sh/api/orders", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: x
                  },
                  body: JSON.stringify({
                    meal_id: id
                  })
                }).then(data => {
                  console.log(data);
                  if (data.status !== 200)
                    return alert("La orden no pudo ser generada");

                  alert("Orden fue generada con éxito");
                  navigation.navigate("Meals");
                });
              });
            }}
          />
          <Button
            title="Cancelar"
            onPress={() => navigation.navigate("Meals")}
          />
        </>
      )}
    </View>
  );
}
