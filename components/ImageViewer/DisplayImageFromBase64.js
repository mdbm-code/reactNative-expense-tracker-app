import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const DisplayImageFromBase64 = ({ base64String }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${base64String}` }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default DisplayImageFromBase64;
