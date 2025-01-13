import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export const Tally = ({ children, color, bg, position }) => {
  const tallyContainer = [styles.tallyContainer, { backgroundColor: color }];
  const tallyCenter = [styles.tallyCenter, { backgroundColor: bg }];
  const tallyLeft = [styles.tallyLeft, { backgroundColor: bg }];
  const tallyRight = [styles.tallyRight, { backgroundColor: bg }];
  const childrenContainer = [
    styles.childrenContainer,
    { backgroundColor: color },
  ];

  return (
    <View style={tallyContainer}>
      <View style={{ backgroundColor: color }}>
        <View style={tallyLeft} />
      </View>
      <View style={tallyCenter}>
        <View style={childrenContainer}>{children}</View>
      </View>
      <View style={{ backgroundColor: color }}>
        <View style={tallyRight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tallyContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'justify-between',
    // alignItems: 'center',
  },
  tallyLeft: {
    flex: 1,
    width: 20,
    height: '100%',
    borderTopRightRadius: 20,
  },
  tallyCenter: {
    flex: 16,
    overflow: 'hidden',
  },
  childrenContainer: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 10,
  },
  tallyRight: {
    flex: 1,
    width: 20,
    height: '100%',
    borderTopLeftRadius: 20,
  },
});
