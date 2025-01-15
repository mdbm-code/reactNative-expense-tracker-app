import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductSales } from '../../store/redux/selectors/products';
import {
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

const ProductsTable = ({ rows, goal, headerColor, theme }) => {
  const dispatch = useDispatch();
  const [showTableOptions, setShowTableOptions] = useState(false);
  const { selectedCustomer, selectedProduct, tableOptions } = useSelector(
    (state) => state.selecteds
  );
  const [fontSize, setFontsize] = useState(tableOptions?.fontSize || 12);
  const productSales = useSelector(selectProductSales);

  const handleSubmitEditing = (product, newValue, from) => {
    const payload = {
      ...product,
      customerCode: selectedCustomer?.code,
      productCode: product.code,
      qty: newValue || '',
    };

    if (goal === 'order') {
      dispatch(findAndUpdateOrderRow(payload));
    } else if (goal === 'return') {
      dispatch(findAndUpdateReturnRow(payload));
    } else if (goal === 'promo') {
    } else {
      console.log('Не указана цель подбора');
    }
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

  function onPressOptionsHandler() {
    dispatch(setTableOptions({ key: 'fontSize', value: fontSize }));
    setShowTableOptions(!showTableOptions);
  }

  const HeaderOptions = () => {
    const icons = [
      {
        name: 'options-outline',
        color: theme.style.text.main,
        size: 36,
        onPress: onPressOptionsHandler,
      },
    ];
    return <HeaderWithIcons title={'Наименование'} rows={icons} />;
  };

  const onChangeSlider = (value) => {
    setFontsize(value);
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
    <Tally
      position='down'
      bg={theme.style?.bg}
      color={theme.style?.bars[2]?.bg}
    >
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
    </Tally>
  );

  const columns = [
    {
      id: 'name',
      title: 'Наименование',
      flex: 9,
      titleStyle: {
        textAlign: 'left',
        color: theme.style?.text?.main,
        fontSize: fontSize,
        paddingLeft: 6,
      },
      viewStyle: { padding: 2 },
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
        color: theme.style?.text?.main,
        width: '100%',
      },
      viewStyle: { borderLeftWidth: 1, borderRightWidth: 1, padding: 2 },
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
      titleStyle: {
        textAlign: 'center',
        color: theme.style?.text?.main,
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
      viewStyle: { padding: 2 },
      headerViewStyle: {
        backgroundColor:
          headerColor || theme.style.drawer.header.button.light.bg,
        padding: 2,
      },
    },
  ];

  return (
    <Table
      headerFooter={showTableOptions && headerFooter}
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
      headerViewStyle={{ backgroundColor: 'red' }}
      headerTitleStyle={{ color: 'blue' }}
    />
  );
};

export default ProductsTable;

const styles = StyleSheet.create({
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
    margin: 18,
  },
  buttonRowTitle: {},
});
