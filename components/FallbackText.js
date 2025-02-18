import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getTheme } from '../store/redux/selectors/theme';

const FallbackText = ({ children, title, style, titleStyle, onPress }) => {
  const theme = useSelector(getTheme);

  const Content = () => {
    return (
      <Text
        style={[
          styles.titleText,
          {
            color: theme.style.customerList.title,
            borderColor: theme.style.warning.main,
          },
          titleStyle,
        ]}
      >
        {children}
      </Text>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.style.bg,
        },
        style,
      ]}
    >
      {typeof onPress === 'function' ? (
        <TouchableOpacity onPress={onPress}>
          <Content />
        </TouchableOpacity>
      ) : (
        <Content />
      )}
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
    // fontWeight: 'bold',
    // color: 'white',
    borderWidth: 1,
    padding: 8,
    borderRadius: 12,
  },
});
