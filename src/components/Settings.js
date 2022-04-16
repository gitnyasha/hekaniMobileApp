import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import axios from "axios";

const Settings = ({ handleLogout }) => {
  handleLogoutButton = () => {
    axios
      .delete("https://hekani-social-media.herokuapp.com/api/v1/logout", {
        withCredentials: true,
      })
      .then((response) => {
        handleLogout();
      })
      .catch((error) => {
        console.log("Logout error ", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>
        {/* handle logout */}
        <Button
          title="Logout"
          style={styles.button}
          onPress={handleLogoutButton}
        />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Settings;
