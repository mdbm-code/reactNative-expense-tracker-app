import React, { useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
// import { GlobalStyles } from '../constans/styles';
import IconButton from '../components/ui/IconButton';
import ProductMenu from '../components/ManageProductsScreen/ProductsMenu';
import ProductsOutput from '../components/ManageProductsScreen/ProductsOutput';
// import { useDrawerStatus } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../store/redux/selectors/products';
import { getThemePalette } from '../store/redux/selectors/theme';
import ProductsMenuButton from '../components/ManageProductsScreen/ProductsMenu/ProductsMenuButton';
import {
  setSearchString,
  // setSelectedMenuLevel_2,
  setUnselectMenu,
} from '../store/redux/slices/selectedsSlice';
import SearchPanel from '../components/SearchPanel';
import { findAndUpdateOrderRow } from '../store/redux/slices/currentOrdersSlice';

const ManageProductsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const drawerRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const { selectedMenuLevel_1, selectedMenuLevel_2, selectedCustomer } =
    useSelector((state) => state.selecteds);
  const products = useSelector(selectProducts);
  const theme = useSelector(getThemePalette);

  const openDrawer = () => {
    drawerRef.current?.openDrawer();
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    drawerRef.current?.closeDrawer();
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    dispatch(setSearchString(''));
    setShowSearchPanel(false);
    isDrawerOpen ? closeDrawer() : openDrawer();
  };

  const onPressTopHandler = () => {
    dispatch(setSearchString(''));
    setShowSearchPanel(false);
    dispatch(setUnselectMenu());
    closeDrawer();
  };

  const onPressHandler = (data) => {
    if (data?.from === 'head') {
      toggleDrawer();
    }
  };

  // console.log('isDrawerOpen', isDrawerOpen);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Подбор товаров',
      headerStyle: {
        backgroundColor: theme.bar.color,
      },
      headerTintColor: theme.bar.active,
      headerRight: () => (
        <>
          <IconButton
            name='search'
            color={showSearchPanel ? theme.warning.main : theme.bg.text}
            // color={selectedMenuLevel_1 || !selectedMenuLevel_2 ? theme.warning.main : theme.primary.contrastText}
            size={24}
            onPress={() => {
              setShowSearchPanel(!showSearchPanel);
              closeDrawer();
            }}
          />

          <IconButton
            name='funnel'
            color={isDrawerOpen ? theme.warning.main : theme.bg.text}
            // color={selectedMenuLevel_1 || !selectedMenuLevel_2 ? theme.warning.main : theme.primary.contrastText}
            size={24}
            onPress={toggleDrawer}
          />
        </>
      ),
    });
  }, [navigation, isDrawerOpen, selectedMenuLevel_2, showSearchPanel]);

  const renderDrawerContent = () => (
    <View style={[styles.drawerContent, { backgroundColor: theme.bg.color }]}>
      <ProductsMenuButton
        title={'Популярные'}
        selected={!selectedMenuLevel_1}
        // iconName={selectedMenuLevel_1 === code ? 'chevron-up-outline' : 'chevron-down-outline'}
        onPress={onPressTopHandler}
      />
      <ProductMenu closeDrawer={closeDrawer} />
    </View>
  );

  const handleSearch = (searchString) => {
    dispatch(setSearchString(searchString)); // Сохраняем поисковую строку в состоянии
    // setShowSearchPanel(false); // Закрываем панель поиска
  };

  function onChangeTextHandler(value) {
    const payload = {
      customerCode: selectedCustomer?.code,
      minSum: 0,
      productCode: value.code,
      base_price: value.base_price,
      price: value.price,
      qty: value.newValue,
      default_price: value?.default_price,
    };
    // console.log('onChangeTextHandler.payload:', payload);
    dispatch(findAndUpdateOrderRow(payload));

    //"base_price": 54.6, "code": "ТД000110", "description": "5-10", "id": "ТД000110", "multiple": 9, "name": "Айран БУДЬ ЗДОРОВ 0,1% 1 л.",
    // "newValue": "5", "oldValue": "", "parentCode": "29", "prices": { "price": "" }, "qty": "", "shortName": "Айран БУДЬ ЗДОРОВ 0, 1 % 1 л.",
    // "specs": [{"spec": "SO - 0 - 0 - 2817 - 0 - 0 - 1366E", "value": 53.39}, {"spec": "SO - 0 - 0 - 2817 - 0 - 0 - 1128389E", "value": 57}], "unit": "шт"}
  }

  function onLongPressHandler(event) {
    // if (deletable) {
    //   Alert.alert('Удалить?', `Вы хотите удалить элемент: ${event.name}?`, [
    //     {
    //       text: 'Отмена',
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'Удалить',
    //       onPress: () => {
    //         dispatch(
    //           deleteOrderRow({ customerCode, productCode: event?.code })
    //         );
    //       },
    //     },
    //   ]);
    // }
  }

  const renderContent = (
    <View style={styles.headerContentContainer}>
      {/* <Text style={{ color: 'white' }}>Наименование</Text> */}
      <IconButton
        name='search'
        color={showSearchPanel ? theme.warning.main : theme.bg.text}
        // color={selectedMenuLevel_1 || !selectedMenuLevel_2 ? theme.warning.main : theme.primary.contrastText}
        size={24}
        onPress={() => {
          setShowSearchPanel(!showSearchPanel);
          closeDrawer();
        }}
      />

      <IconButton
        name='funnel'
        color={isDrawerOpen ? theme.warning.main : theme.bg.text}
        // color={selectedMenuLevel_1 || !selectedMenuLevel_2 ? theme.warning.main : theme.primary.contrastText}
        size={24}
        onPress={toggleDrawer}
      />
    </View>
  );

  const columns = [
    {
      id: 'name',
      title: 'Наименование',
      content: renderContent,
      flex: 8,
      titleStyle: { textAlign: 'left' },
      // onPress: () => onPress({ from: 'head', id: 'name' }),
    },
    {
      id: 'base_price',
      title: 'Б.Цена',
      flex: 3,
      titleStyle: { textAlign: 'right' },
    },
    { id: 'price', title: 'Цена', flex: 3, titleStyle: { textAlign: 'right' } },
    { id: 'qty', title: 'Колво', flex: 2, as: 'input' },
  ];

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition='left'
      drawerType='front'
      renderNavigationView={renderDrawerContent}
    >
      <View
        style={[styles.container, { backgroundColor: theme.bg.color }]}
        onTouchStart={closeDrawer}
      >
        {showSearchPanel && (
          <>
            <SearchPanel
              onCancel={() => {
                dispatch(setSearchString(''));
                setShowSearchPanel(false);
              }}
              onSearch={handleSearch}
            />
          </>
        )}
        {/* <Text style={styles.text}>Component ManageOrderProducts</Text> */}

        <ProductsOutput
          // onLongPress={onLongPressHandler}
          onChangeText={onChangeTextHandler}
          onPress={onPressHandler}
          columns={columns}
          rows={products}
          style={showSearchPanel && { marginTop: 30 }}
        />
      </View>
    </DrawerLayout>
  );
};

export default ManageProductsScreen;

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
});
