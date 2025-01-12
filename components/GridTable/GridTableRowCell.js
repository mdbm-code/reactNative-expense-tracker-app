import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constans/styles';
import InputCell from '../../components/ui/InputCell';

const GridTableRowCell = (props) => {
  const {
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
    prefix,
    postfix,
    selected,
    selectedContent
  } = props;

  let arrTitleStyle = [styles.text];
  if (titleStyle) {
    arrTitleStyle.push(titleStyle);
  }
  let titleContent = <Text style={[...arrTitleStyle]}>{title}</Text>;

  if (prefix || postfix) {
    titleContent = (
      <View style={styles.titleContainer}>
        {prefix && prefix}
        <Text style={[...arrTitleStyle]}>{title}</Text>
        {postfix && postfix}
      </View>
    );
  }

  let ComponentToRender = () => { };
  let componentProps = {};
  if (selected && selectedContent) {
    // console.log('selectedContent', selectedContent);
    ComponentToRender = selectedContent['component'];
    if (selectedContent['props']) {
      componentProps = selectedContent['props'];
      if (Array.isArray(selectedContent.props['keys'])) {
        selectedContent.props.keys.forEach(propKey => {
          componentProps[propKey] = props[propKey]
        });
      }
    }
  }

  // const titleContainer = <View style={styles.titleContainer}>{prefix}{title}{postfix}</View>

  let content = titleContent;

  if (selected && selectedContent) {
    // console.log('selectedContent', selectedContent);

    // if (selectedContent['component']) {
    //   const ComponentToRender = selectedContent['component'];
    //   if (selectedContent['props']) {
    //     content = <ComponentToRender {...selectedContent['props']} />;
    //   } else {
    //     content = <ComponentToRender />;
    //   }
    // }
    content = content;
  } else if (as === 'input') {
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
        {titleContent}
        {/* <Text style={[styles.text, titleStyle && titleStyle]}>{title}</Text> */}
      </TouchableOpacity>
    );
  }

  const rowCell = [styles.rowCell];
  if (flex) {
    rowCell.push(styles[`flex${flex}`]);
  }

  return <View style={[...rowCell, style && style]}>{selected && selectedContent ? <ComponentToRender {...componentProps} /> : content}</View>;
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
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
