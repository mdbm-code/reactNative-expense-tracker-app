import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductSales } from '../../store/redux/selectors/products';
import {
  setSearchString,
  setSelectedProduct,
  setTableOptions,
} from '../../store/redux/slices/selectedsSlice';
import {
  findAndUpdateOrderRow,
  findAndUpdateReturnRow,
} from '../../store/redux/slices/currentOrdersSlice';
import InputHelper from '../../components/ManageProductsScreen/InputHelper';
// import { getTheme } from '../../store/redux/selectors/theme';
import Table from '../../components/GridTable/v2/Table';
import Tally from '../../components/Tally';
// import Slider from '@react-native-community/slider';
import HeaderWithIcons from '../../components/GridTable/v2/HeaderWithIcons';
import Button from '../ui/Button';
import SearchPanel from '../SearchPanel';

const ProductsTable = ({ rows, goal, headerColor, theme, searchable }) => {
  const dispatch = useDispatch();
  const [showTableOptions, setShowTableOptions] = useState('');
  const { selectedCustomer, selectedProduct, tableOptions, searchString } =
    useSelector((state) => state.selecteds);
  const [fontSize, setFontsize] = useState(tableOptions?.fontSize || 12);
  const productSales = useSelector(selectProductSales); //история продаж
  const [enteredSearchText, setEnteredSearchText] = useState('');

  // useEffect(() => {
  //   if (!searchString && enteredSearchText) {
  //     setEnteredSearchText('');
  //     setShowTableOptions('');
  //   }
  // }, [searchString, enteredSearchText]);

  const handleSubmitEditing = (product, newValue) => {
    const payload = {
      ...product,
      customerCode: selectedCustomer?.code,
      productCode: product.code,
      qty: goal === 'order' ? newValue : undefined,
      ret: goal === 'return' ? newValue : undefined,
      goal,
    };

    if (goal === 'promo') {
    } else {
      dispatch(findAndUpdateOrderRow(payload));
    }
    dispatch(setSelectedProduct(null));
  };

  function pressOnItemHandler(returnParams) {
    setShowTableOptions(null);

    // console.log('returnParams', returnParams);
    if (returnParams?.item?.code === selectedProduct?.code) {
      dispatch(setSelectedProduct(null));
    } else if (returnParams?.item) {
      dispatch(setSelectedProduct(returnParams?.item));
    }
  }

  let selectedRowFooter;
  if (goal === 'order') {
    selectedRowFooter = (
      <InputHelper
        values={productSales?.values || []}
        postValue={productSales?.increased}
        theme={theme}
        onPress={(value) => {
          handleSubmitEditing(selectedProduct, value, 'InputHelper');
        }}
      />
    );
  }

  function onPressOptionsHandler(id) {
    dispatch(setSelectedProduct(null));
    if (id === 'style') {
      dispatch(setTableOptions({ key: 'fontSize', value: fontSize }));
    }
    if (showTableOptions === id) {
      setShowTableOptions(null);
    } else {
      setShowTableOptions(id);
    }
  }

  const HeaderOptions = () => {
    const icons = [
      {
        name: 'options-outline',
        color: theme.style.text.main,
        size: 24,
        onPress: () => onPressOptionsHandler('style'),
      },
    ];
    if (searchable) {
      icons.push({
        name: 'search-outline',
        color: theme.style.text.main,
        size: 24,
        onPress: () => onPressOptionsHandler('search'),
      });
    }
    return (
      <HeaderWithIcons
        titleStyle={{ color: theme.style.customerList.title }}
        title={'Наименование'}
        rows={icons}
      />
    );
  };

  const onChangeSlider = (value) => {
    setFontsize(value);
  };

  const onSearchHandler = () => {
    dispatch(setSearchString(enteredSearchText));
  };
  const onSearchCancelHandler = () => {
    setShowTableOptions(null);
    dispatch(setSearchString(''));
    setEnteredSearchText('');
  };

  const ButtonRow = (props) => {
    const {
      style,
      minimumValue,
      maximumValue,
      step,
      value,
      onValueChange,
      selectedStyle,
    } = props;
    const arr = [];
    for (let i = minimumValue; i <= maximumValue; i += step) {
      arr.push(i);
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          margin: 1,
        }}
      >
        {arr.map((item, index) => {
          return (
            <Button
              key={index}
              titleStyle={[
                { padding: 8, color: theme.style?.text?.main },
                item === value && {
                  borderWidth: 2,
                  borderRadius: 8,
                  borderColor: theme.style?.text?.main,
                },
              ]}
              onPress={() => onValueChange(item)}
            >
              {item}
            </Button>
          );
        })}
      </View>
    );
  };

  const headerFooter = (
    <Tally position='down' bg={theme.style?.bg} color={headerColor}>
      {showTableOptions === 'style' && (
        <ButtonRow
          selectedStyle={styles.slider}
          minimumValue={10}
          maximumValue={16}
          step={1}
          value={parseFloat(fontSize) || 10}
          onValueChange={onChangeSlider}
          minimumTrackTintColor='#FFFFFF'
          maximumTrackTintColor='#000000'
        />
      )}
      {showTableOptions === 'search' && (
        <SearchPanel
          value={enteredSearchText}
          onCancel={onSearchCancelHandler}
          onSearch={onSearchHandler}
          onChangeText={(enteredText) => setEnteredSearchText(enteredText)}
        />
      )}
    </Tally>
  );

  const columns = [
    {
      id: 'name',
      title: 'Наименование',
      flex: 9,
      titleStyle: {
        textAlign: 'left',
        color: theme.style.customerList.title,
        fontSize: fontSize,
        paddingLeft: 6,
      },
      viewStyle: { padding: 2, backgroundColor: theme.style.customerList.bg2 },
      headerViewStyle: {
        backgroundColor:
          headerColor || theme.style.drawer.header.button.light.bg,
        paddingHorizontal: 2,
      },
      headerContent: <HeaderOptions />,
    },
    {
      id: 'price',
      title: 'Цена',
      flex: 3,
      titleStyle: {
        textAlign: 'center',
        color: theme.style.customerList.title,
        width: '100%',
      },
      viewStyle: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        padding: 2,
        backgroundColor: theme.style.customerList.bg2,
      },
      headerViewStyle: {
        backgroundColor:
          headerColor || theme.style.drawer.header.button.light.bg,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        padding: 2,
      },
    },
    {
      id: 'qty',
      title: 'Кол.',
      flex: 2,
      as: 'input',
      autoFocus: goal === 'return',
      titleStyle: {
        textAlign: 'center',
        color: theme.style.customerList.title,
        width: '100%',
      },
      inputStyle: {
        color: theme.style?.text?.main,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: headerColor || theme.style.drawer.header.button.light.bg,
        textAlign: 'center',
        border: 1,
        height: '100%',
      },
      viewStyle: { padding: 2, backgroundColor: theme.style.customerList.bg2 },
      headerViewStyle: {
        backgroundColor:
          headerColor || theme.style.drawer.header.button.light.bg,
        padding: 2,
      },
    },
  ];

  return (
    <View style={[styles.rootContainer, { backgroundColor: theme.style.bg }]}>
      <Table
        headerFooter={!!showTableOptions && headerFooter}
        rowStyle={styles.rowStyle}
        columns={columns}
        rows={rows}
        keyId='code'
        theme={theme}
        onPress={(returnParams) => pressOnItemHandler(returnParams)}
        onChangeText={handleSubmitEditing}
        selectedId={selectedProduct?.code}
        selectedRowFooter={selectedRowFooter}
        onLongPress={() => {
          // console.log('long press');
        }}
        // headerViewStyle={{ backgroundColor: 'red' }}
        // headerTitleStyle={{ color: 'blue' }}
      />
    </View>
  );
};

export default ProductsTable;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingBottom: 6,
  },
  container: {
    flex: 1,
  },
  rowStyle: {
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerOptions_RootContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerOptions_Container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  slider: {
    flex: 1,
    margin: 10,
  },
  buttonRowTitle: {},
});
