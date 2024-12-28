import { StyleSheet, Text, View } from 'react-native';

const FallbackText = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default FallbackText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
