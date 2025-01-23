import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { selecteOrderData } from '../../store/redux/selectors/orders';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProductManageView } from '../../store/redux/slices/selectedsSlice';
import { Ionicons } from '@expo/vector-icons';

const OrderFooter = ({ theme, view }) => {
  const { totalAmount, minSum, selectedProductManageView } = useSelector(selecteOrderData);

  const dispatch = useDispatch();

  const pressChangeManageViewHandler = () => {
    dispatch(setSelectedProductManageView(
      selectedProductManageView.type === 'table'
        ? { ...selectedProductManageView, type: 'card' }
        : { ...selectedProductManageView, type: 'table' }
    ));
  }
  const pressChangeManageViewModeHandler = (mode) => {
    dispatch(setSelectedProductManageView({ ...selectedProductManageView, mode }));
  }


  let proc = '';
  if (totalAmount > 0) {
    proc = Math.round((minSum / totalAmount) * 100) / 100;
  }


  function modeIconColor(mode) {
    if (selectedProductManageView?.mode === mode) return theme?.style?.customerList?.warningBorder
    return theme?.style?.nav?.text;
  }

  let buttons = null;
  const modeButtons = [
    ['single-column', 'square'],
    ['two-column', 'grid'],
    ['three-column', 'list']
  ];

  buttons = (
    <View style={styles.buttonsContainer} >
      <TouchableOpacity
        onPress={pressChangeManageViewHandler}
      >
        <Ionicons
          name={selectedProductManageView.type !== 'table' ? 'images-outline' : 'reorder-four-outline'}
          size={24}
          color={theme?.style?.nav?.text} />
      </TouchableOpacity>
      {selectedProductManageView.type === 'table' && (
        <View style={styles.buttonModeContainer}>
          {modeButtons.map(([mode, iconName]) => (
            <TouchableOpacity
              key={mode}
              style={styles.buttonModeItem}
              onPress={() => pressChangeManageViewModeHandler(mode)}
            >
              <Ionicons
                name={iconName}
                size={24}
                color={modeIconColor(mode)} />
            </TouchableOpacity>
          ))}

        </View>
      )}
    </View >
  );


  let content = (
    <View style={styles.sumContainer}>
      <Text style={{ color: theme?.style?.nav?.text }}>
        Сумма: {totalAmount?.toLocaleString('ru-RU')}
      </Text>
    </View>
  );
  if (minSum) {
    content = (
      <View style={styles.sumContainer}>
        <Text style={{ color: theme?.style?.nav?.text }}>
          {minSum?.toLocaleString('ru-RU')}
        </Text>
        <Text style={{ color: theme?.style?.nav?.text }}>{'/'}</Text>
        <Text style={{ color: theme?.style?.nav?.text }}>
          {totalAmount?.toLocaleString('ru-RU')}
        </Text>
        {proc && <Text style={{ color: theme?.style?.nav?.text }}>{':'}</Text>}
        {proc && <Text style={{ color: theme?.style?.nav?.text }}>{proc}</Text>}
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme?.style?.nav?.bg }]}
    >
      {buttons}
      {content}
    </View>
  );
};

export default OrderFooter;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonModeContainer: {
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  buttonModeItem: {
    marginHorizontal: 5
  },
  sumContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
