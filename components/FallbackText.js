import { StyleSheet, Text, View } from 'react-native';

const FallbackText = ({ children, title, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.titleText}>{children}</Text>
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
