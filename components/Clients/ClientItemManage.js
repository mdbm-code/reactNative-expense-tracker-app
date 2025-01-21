import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tally from '../Tally';
import IconButton from '../ui/IconButton';
import {
  customerSortDown,
  customerSortUp,
  removeCustomerFromRoute,
} from '../../store/redux/slices/routesSlice';
import { setSelectedCustomerListItem } from '../../store/redux/slices/selectedsSlice';

const ClientItemManage = ({
  children,
  theme,
  itemId,
  selectedManager,
  selectedRoute,
}) => {
  const dispatch = useDispatch();

  function manageItemHandler(task) {
    switch (task) {
      case 'trash':
        dispatch(setSelectedCustomerListItem(''));
        dispatch(
          removeCustomerFromRoute({
            customerCode: itemId,
            selectedRoute: selectedRoute,
            selectedManager: selectedManager,
          })
        );
        break;
      case 'up':
        dispatch(
          customerSortUp({
            customerCode: itemId,
            selectedRoute: selectedRoute,
            selectedManager: selectedManager,
          })
        );
        break;
      case 'down':
        dispatch(
          customerSortDown({
            customerCode: itemId,
            selectedRoute: selectedRoute,
            selectedManager: selectedManager,
          })
        );
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.rootContainer}>
      {children}
      <Tally color={theme.style.customerList.subtitle} bg={theme.style.bg}>
        <View style={styles.longPressContent}>
          <IconButton
            onPress={() => manageItemHandler('trash')}
            name={'trash-outline'}
            size={24}
          />
          <IconButton
            onPress={() => manageItemHandler('up')}
            name={'arrow-up-outline'}
            size={24}
          />
          <IconButton
            onPress={() => manageItemHandler('down')}
            name={'arrow-down-outline'}
            size={24}
          />
        </View>
      </Tally>
    </View>
  );
};

export default ClientItemManage;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'column',
  },
  longPressContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
