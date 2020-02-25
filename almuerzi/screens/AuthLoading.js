import React, { useEffect } from "react";
import { ActivityIndicator, AsyncStorage, View } from "react-native";

export default function AuthLoading({ navigation }) {
  useEffect(() => {
    AsyncStorage.getItem("token").then(x => {
      navigation.navigate(x ? "Root" : "OnBoarding");
    });
  }, []);
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}
