import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useState } from 'react';

export const Tally = ({ children, color, bg, position }) => {
  // const [slideAnim] = useState(new Animated.Value(-20)); // Начальная позиция панели
  // // Анимация появления панели
  // React.useEffect(() => {
  //   Animated.timing(slideAnim, {
  //     toValue: 0,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start();
  // }, [slideAnim]);

  const tallyContainer = [
    styles.tallyContainer,
    { backgroundColor: color },
    // { transform: [{ translateY: slideAnim }] },
  ];
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
