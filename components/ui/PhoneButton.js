import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const PhoneButton = ({ style, textStyle, number }) => {
  makeCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number?.trim()}`;
    } else {
      phoneNumber = `telprompt:${number?.trim()}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <TouchableOpacity
      onPress={makeCall}
      activeOpacity={0.7}
      style={[styles.touchableButton, style]}
    >
      <Text style={textStyle}>{number}</Text>
    </TouchableOpacity>
  );
};

export default PhoneButton;

const styles = StyleSheet.create({
  touchableButton: {
    // borderWidth: 2,
    borderRadius: 8,
    margin: 2,
    padding: 10,
  },
});
