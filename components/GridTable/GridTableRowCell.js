import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constans/styles';
import InputCell from '../../components/ui/InputCell';

const GridTableRowCell = ({
  id,
  onPress,
  title,
  style,
  titleStyle,
  inputConfig,
  onChangeValue,
  returnParams,
  as,
  flex = 1,
  onLongPress,
}) => {
  let content = (
    <Text style={[styles.text, titleStyle && titleStyle]}>{title}</Text>
  );

  if (as === 'input') {
    content = (
      <InputCell
        style={[styles.text, styles.numberText, titleStyle && titleStyle]}
        {...inputConfig}
        defaultValue={title}
        onChangeValue={onChangeValue}
        onFocus={onPress}
        returnParams={returnParams}
      />
    );
  } else if (typeof onPress === 'function') {
    content = (
      <TouchableOpacity
        // android_ripple={true}
        onPress={() => onPress(returnParams)}
        onLongPress={() => onLongPress && onLongPress(returnParams, id)}
        // style={({ pressed }) => pressed && styles.pressed}
      >
        <Text style={[styles.text, titleStyle && titleStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }

  const rowCell = [styles.rowCell];
  if (flex) {
    rowCell.push(styles[`flex${flex}`]);
  }

  return <View style={[...rowCell, style && style]}>{content}</View>;
};

export default GridTableRowCell;

const styles = StyleSheet.create({
  rowCell: {
    flex: 1,
    borderWidth: 0.2,
    borderColor: GlobalStyles.colors.primary100,
    paddingHorizontal: 4,
    justifyContent: 'center',
    minHeight: 36,
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  numberText: {
    textAlign: 'right',
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flex4: { flex: 4 },
  flex5: { flex: 5 },
  flex6: { flex: 6 },
  flex7: { flex: 7 },
  flex8: { flex: 8 },
  flex9: { flex: 9 },
  flex10: { flex: 10 },
  flex11: { flex: 11 },
  flex12: { flex: 12 },
});
