import React, { useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
// import { DrawerLayout } from 'react-native-gesture-handler';
// import { GlobalStyles } from '../constans/styles';
// import IconButton from '../../components/ui/IconButton';
// import ProductMenu from '../../components/ManageProductsScreen/ProductsMenu';
import ProductsOutput from '../../components/ManageProductsScreen/ProductsOutput';
// import { useDrawerStatus } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, selectProductSales } from '../../store/redux/selectors/products';
import { getThemePalette } from '../../store/redux/selectors/theme';
// import ProductsMenuButton from '../../components/ManageProductsScreen/ProductsMenu/ProductsMenuButton';
// import {
//   setSearchString,
//   // setSelectedMenuLevel_2,
//   // setUnselectMenu,
// } from '../../store/redux/slices/selectedsSlice';
// import SearchPanel from '../../components/SearchPanel';
import { findAndUpdateOrderRow } from '../../store/redux/slices/currentOrdersSlice';
import GridTable from '../../components/GridTable';
// import { Tally } from '../../components/Tally/Tally';
import { setSelectedProduct } from '../../store/redux/slices/selectedsSlice';
// import Button from '../../components/ui/Button';
import InputHelper from '../../components/ManageProductsScreen/InputHelper/';
import InputOrder from './InputOrder';



const SimpleInput = () => {
  const [inputValue, setInputValue] = useState('');

  const onSubmitEditingHandler = () => {
    console.log('onSubmitEditingHandler вызван');
  };

  return (
    <View>
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        returnKeyType='done' // или 'go'
        keyboardType='default' // или 'numeric'
        onSubmitEditing={onSubmitEditingHandler}
        style={styles.input}
      />
    </View>
  );
};

export const ManageProductsHomeScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  // const drawerRef = useRef(null);
  // const [showFooterFor, setShowFooterFor] = useState(null);
  // const [showSearchPanel, setShowSearchPanel] = useState(false);
  const { selectedCustomer, selectedProduct } = useSelector((state) => state.selecteds);
  const products = useSelector(selectProducts);
  const productSales = useSelector(selectProductSales);
  const theme = useSelector(getThemePalette);
  const [inputValue, setInputValue] = useState('');





  // const openDrawer = () => {
  //   drawerRef.current?.openDrawer();
  //   setIsDrawerOpen(true);
  // };

  // const closeDrawer = () => {
  //   // drawerRef.current?.closeDrawer();
  //   // setIsDrawerOpen(false);
  // };

  // const toggleDrawer = () => {
  //   dispatch(setSearchString(''));
  //   setShowSearchPanel(false);
  //   isDrawerOpen ? closeDrawer() : openDrawer();
  // };

  // const onPressTopHandler = () => {
  //   dispatch(setSearchString(''));
  //   setShowSearchPanel(false);
  //   dispatch(setUnselectMenu());
  //   // closeDrawer();
  // };

  const onPressHandler = (data) => {
    // console.log('data', data);

    if (data?.column === 'qty') {
      dispatch(setSelectedProduct({
        code: data?.code,
        name: data?.name,
        base_price: data?.base_price,
        price: data?.price,
        default_price: data?.default_price,
        qty: data?.qty,
      }));

    } else if (data?.column === 'name') {
      // {"base_price": 37.76, "code": "ТД007773", "column": "name", "default_price": 44.62, 
      // "description": "1-5", "multiple": 8, "name": "Йогурт ANGELATO 2,5% пит.черника бут. 0,27 л.", 
      // "parentCode": "6", "price": 44.62, 
      // "prices": {"base_price": 37.76, "default_price": 44.62}, "qty": "", 
      // "shortName": "Йог ANGELATO 2,5% черн. бут. 0,27 л.", "specs": [], "unit": "шт"}
      dispatch(setSelectedProduct({
        code: data?.code,
        name: data?.name,
        base_price: data?.base_price,
        price: data?.price,
        default_price: data?.default_price,
        qty: data?.qty,
      }));
    } else if (data?.column === 'inputHelper') {


      if (data?.code && data?.name && data?.newValue) {
        const payload = { ...data, customerCode: selectedCustomer?.code, productCode: data?.code, qty: data?.newValue };
        // console.log('payload', payload);
        dispatch(findAndUpdateOrderRow(payload));
      }
    }
  };


  function onChangeTextHandler(value) {
    let payload = null;
    if (value?.column === 'inputHelper') {
      payload = {
        customerCode: selectedCustomer?.code,
        productCode: selectedProduct?.code,
        name: selectedProduct?.name,
        base_price: selectedProduct?.base_price,
        price: selectedProduct?.price,
        default_price: selectedProduct?.default_price,
        qty: value?.newValue,
      }
    } else {
      payload = {
        customerCode: selectedCustomer?.code,
        productCode: value?.code,
        base_price: value?.base_price,
        price: value?.price,
        qty: value?.newValue,
        default_price: value?.default_price,
      };
    }

    // console.log('onChangeTextHandler.payload:', payload);
    if (payload) {
      dispatch(findAndUpdateOrderRow(payload));
    }

    //"base_price": 54.6, "code": "ТД000110", "description": "5-10", "id": "ТД000110", "multiple": 9, "name": "Айран БУДЬ ЗДОРОВ 0,1% 1 л.",
    // "newValue": "5", "oldValue": "", "parentCode": "29", "prices": { "price": "" }, "qty": "", "shortName": "Айран БУДЬ ЗДОРОВ 0, 1 % 1 л.",
    // "specs": [{"spec": "SO - 0 - 0 - 2817 - 0 - 0 - 1366E", "value": 53.39}, {"spec": "SO - 0 - 0 - 2817 - 0 - 0 - 1128389E", "value": 57}], "unit": "шт"}
  }

  const columns = [
    {
      id: 'name',
      title: 'Наименование',
      // content: renderContent,
      flex: 8,
      titleStyle: { textAlign: 'left', color: theme.text.primary },
      // onPress: () => onPress({ from: 'head', id: 'name' }),
    },
    // {
    //   id: 'base_price',
    //   title: 'Б.Цена',
    //   flex: 3,
    //   titleStyle: { textAlign: 'right', color: theme.text.primary },
    // },
    {
      id: 'price',
      title: 'Цена',
      flex: 3,
      titleStyle: { textAlign: 'right', color: theme.text.primary },
    },
    {
      id: 'qty',
      title: 'Колво',
      flex: 2,
      // as: 'input',
      titleStyle: { color: theme.text.primary },
      selectedContent: {
        component: InputOrder,
        props: { text: 'Hello', keys: ['title', 'returnParams'] }
      }
    },
  ];


  let rowFooter = '';
  if (typeof selectedProduct === 'object' && selectedProduct !== null && Array.isArray(productSales?.values) && productSales.values.length > 0) {
    rowFooter = {
      key: 'code',
      condition: { eq: selectedProduct?.code },
      content:
        <InputHelper
          values={productSales?.values}
          postValue={productSales?.increased}
          theme={theme}
          onPress={(item) => onPressHandler({
            column: 'inputHelper',
            code: selectedProduct?.code,
            name: selectedProduct?.name,
            base_price: selectedProduct.base_price,
            price: selectedProduct.price,
            default_price: selectedProduct?.default_price,
            newValue: item,
          })}
        // onChangeText={onChangeText}
        // inputValue={inputValue}
        // inputConfig={{
        //   style: { width: 45, color: theme.text.primary, backgroundColor: 'white', padding: 4 },
        //   defaultValue: selectedProduct?.qty,
        //   onChangeText: (newValue) => onChangeTextHandler({ column: 'inputHelper', newValue }),
        //   onFocus: (item) => { console.log('item', item) },
        //   returnParams: {}
        // }}
        />
    };
  }
  let rowHeader = '';
  if (false) {
    rowHeader = {
      key: 'code',
      condition: { eq: 0 },
      content: 'Нет в наличии',
    };
  }


  return (
    <View style={[styles.container]}>
      <GridTable
        selectedValue={selectedProduct?.code}
        seelectedKey='code'
        rows={products}
        columns={columns}
        rowId='code'
        onPress={onPressHandler}
        onChangeText={onChangeTextHandler}
        onLongPress={() => { }}
        rowFooter={rowFooter}
        rowHeader={rowHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: GlobalStyles.colors.primary800,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  headerContentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  text: {
    color: 'white',
  },
  drawerContent: {
    flex: 1,
    // backgroundColor: GlobalStyles.colors.primary700,
    padding: 2,
  },
  drawerText: {
    color: 'white',
    fontSize: 18,
  },
  rowFooterButton: {
    // backgroundColor: 'green',
    marginHorizontal: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'green',
  },
  rowFooterButtonText: {
    fontWeight: 'bold',
  },
  rowFooterLastButton: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'blue',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
});
