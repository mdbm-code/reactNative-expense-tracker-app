import { StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';
import IconButton from '../components/ui/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProducts,
  selectProductSales,
} from '../store/redux/selectors/products';
import { setSelectedProduct } from '../store/redux/slices/selectedsSlice';
import { findAndUpdateOrderRow } from '../store/redux/slices/currentOrdersSlice';
import InputHelper from '../components/ManageProductsScreen/InputHelper';
import { getTheme } from '../store/redux/selectors/theme';
import Table from '../components/GridTable/v2/Table';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { selectedCustomer, selectedProduct } = useSelector(
    (state) => state.selecteds
  );
  const theme = useSelector(getTheme);
  const products = useSelector(selectProducts);
  const productSales = useSelector(selectProductSales);

  const handleSubmitEditing = (product, newValue, from) => {
    const payload = {
      ...product,
      customerCode: selectedCustomer?.code,
      productCode: product.code,
      qty: newValue || '',
    };

    dispatch(findAndUpdateOrderRow(payload));
    dispatch(setSelectedProduct(null));
  };

  function pressOnItemHandler(returnParams) {
    // console.log('returnParams', returnParams);
    if (returnParams?.item?.code === selectedProduct?.code) {
      dispatch(setSelectedProduct(null));
    } else if (returnParams?.item) {
      dispatch(setSelectedProduct(returnParams?.item));
    }
  }

  function pressOnHeadHandler(columnId) {
    console.log(columnId);
  }

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      // title: 'Заявка',
      headerRight: () => (
        <IconButton
          name='add-circle-outline'
          color={'white'}
          size={24}
          onPr
          ess={toggleDrawer}
        />
      ),
    });
  }, [navigation]);

  const selectedRowFooter = (
    <InputHelper
      values={productSales?.values || []}
      postValue={productSales?.increased}
      theme={theme}
      onPress={(value) => {
        handleSubmitEditing(selectedProduct, value, 'InputHelper');
      }}
    />
  );

  const columns = [
    {
      id: 'name',
      title: 'Наименование',
      flex: 9,
      titleStyle: { textAlign: 'left', color: theme.style?.text?.main },
      viewStyle: { padding: 2 },
      headerViewStyle: { backgroundColor: theme.style?.bars[2]?.bg },
      onPress: pressOnHeadHandler,
    },
    {
      id: 'price',
      title: 'Цена',
      flex: 3,
      titleStyle: {
        textAlign: 'center',
        color: theme.style?.text?.main,
        width: '100%',
      },
      viewStyle: { borderLeftWidth: 1, borderRightWidth: 1, padding: 2 },
      headerViewStyle: { backgroundColor: theme.style?.bars[2]?.bg },
    },
    {
      id: 'qty',
      title: 'Колво',
      flex: 2,
      as: 'input',
      titleStyle: {
        textAlign: 'right',
        color: theme.style?.text?.main,
        width: '100%',
      },
      inputStyle: {
        color: theme.style?.text?.main,
        textAlign: 'right',
        border: 1,
      },
      viewStyle: { padding: 2 },
      headerViewStyle: { backgroundColor: theme.style?.bars[2]?.bg },
    },
  ];

  return (
    <Table
      rowStyle={styles.rowStyle}
      columns={columns}
      rows={products}
      keyId='code'
      theme={theme}
      onPress={(returnParams) => pressOnItemHandler(returnParams)}
      onChangeText={handleSubmitEditing}
      selectedId={selectedProduct?.code}
      selectedRowFooter={selectedRowFooter}
      onLongPress={() => {
        console.log('long press');
      }}
      headerViewStyle={{ backgroundColor: 'red' }}
      headerTitleStyle={{ color: 'blue' }}
    />
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowStyle: {
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});
