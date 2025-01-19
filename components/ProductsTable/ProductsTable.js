import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
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
import { updateOrderItem } from '../../store/redux/slices/ordersSlice';
import { createUpdateOrderItem } from '../../store/redux/thunks/orders';

const ProductsTable = ({ rows, goal, headerColor, theme, searchable, showRest }) => {
  const dispatch = useDispatch();
  const [showTableOptions, setShowTableOptions] = useState('');
  const { selectedCustomer, selectedProduct, tableOptions } =
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
    // console.log(product);
    // {"base_price": 22, "code": "ТД000151", "default_price": 29, "description": "1-5", "multiple": 24,
    // "name": "Йогурт ГЕК 0,1% клубника,персик, маракуйа пл-ст 0,100 кг.", "parentCode": "8", "price": 29,
    // "prices": {"base_price": 22, "default_price": 29}, "qty": "", "rest": "800",
    // "shortName": "Йог ГЕК 0,1% клуб-перс-марак пл-ст 0,100 кг.",
    // "specs": [{"spec": "SO-0-0-2817-0-0-2452E", "value": 25.23}, {"spec": "SO-0-0-2817-0-0-1366E", "value": 22}],
    // "unit": "шт"}

    //тут можно реагировать на попытку заказть товар без остатка
    if (goal === 'order') {
      // const restExist = product?.hasOwnProperty('rest') ?? false;
      // if (restExist && ['', '0', 0, undefined].includes(product?.rest)) {
      //   Alert.alert('', 'Товара нет на складе', [
      //     {
      //       text: 'Ок',
      //       style: 'cancel',
      //     },
      //   ]);
      //   return;
      // }
    }



    const payload = {
      ...product,
      customerCode: selectedCustomer?.code,
      customerName: selectedCustomer?.name,
      productCode: product.code,
      productName: product?.name,
      orderQty: goal === 'order' ? newValue : undefined,
      returnQty: goal === 'return' ? newValue : undefined,
      // goal,
    };

    if (goal === 'promo') {
    } else {

      // dispatch(findAndUpdateOrderRow(payload));
      dispatch(createUpdateOrderItem(payload));
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
        title={'Товар'}
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

  const redRowStyle = {
    cond: {
      key: 'rest',
      inc: ['', '0', 0, undefined],
      iftrue: {
        borderLeftWidth: 1,
        padding: 2,
        backgroundColor: theme.style.customerList.dangerBg,
      },
      iffalse: {
        borderLeftWidth: 1,
        padding: 2,
        backgroundColor: theme.style.customerList.bg2,
      },
    },
  };

  // console.log('redRowStyle', redRowStyle);

  const columns = [
    {
      id: 'name',
      title: 'Товар',
      flex: 9,
      titleStyle: {
        textAlign: 'left',
        color: theme.style.customerList.title,
        fontSize: fontSize,
        paddingLeft: 6,
      },
      viewStyle: redRowStyle,
      headerViewStyle: {
        backgroundColor:
          headerColor || theme.style.drawer.header.button.light.bg,
        paddingHorizontal: 2,
      },
      headerContent: <HeaderOptions />,
    },
    {
      id: 'price',
      group: 'priceRest',
      title: 'Цена',
      flex: 3,
      titleStyle: {
        textAlign: 'center',
        color: theme.style.customerList.title,
        width: '100%',
      },
      viewStyle: redRowStyle,
      headerViewStyle: {
        backgroundColor:
          headerColor || theme.style.drawer.header.button.light.bg,
        borderLeftWidth: 1,
        // borderRightWidth: 1,
        padding: 2,
      },
    },
    {
      id: 'rest',
      group: 'priceRest',
      title: 'Ост.',
      flex: 3,
      titleStyle: {
        textAlign: 'center',
        color: theme.style.customerList.title,
        width: '100%',
      },
      viewStyle: redRowStyle,
      headerViewStyle: {
        backgroundColor:
          headerColor || theme.style.drawer.header.button.light.bg,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        padding: 2,
      },
    },
    {
      id: 'autofocus',
      hidden: true,
    },
    {
      id: 'qty',
      title: 'Кол.',
      flex: 2,
      as: 'input',
      autoFocus: {
        or: [
          { iftrue: goal === 'return' },
          {
            cond: {
              key: 'autofocus',
              eq: true,
              iftrue: true,
              iffalse: false,
            }
          }
        ]
      },
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
      viewStyle: redRowStyle,
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
        onLongPress={() => { }}
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
