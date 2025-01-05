import React, { useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import { GlobalStyles } from '../constans/styles';
import IconButton from '../components/ui/IconButton';
import ProductMenu from '../components/ManageProductsScreen/ProductsMenu';
import ProductsOutput from '../components/ManageProductsScreen/ProductsOutput';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../store/redux/selectors/products';
import { getThemePalette } from '../store/redux/selectors/theme';
import ProductsMenuButton from '../components/ManageProductsScreen/ProductsMenu/ProductsMenuButton';
import { setSelectedMenuLevel_2, setUnselectMenu } from '../store/redux/slices/selectedsSlice';

const ManageProductsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const drawerRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { selectedMenuLevel_1, selectedMenuLevel_2 } = useSelector(state => state.selecteds);
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
    isDrawerOpen ? closeDrawer() : openDrawer();
  };

  const onPressTopHandler = () => {
    dispatch(setUnselectMenu());
    closeDrawer();
  };

  // console.log('isDrawerOpen', isDrawerOpen);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Подбор товаров',
      headerStyle: {
        backgroundColor: theme.primary.main
      },
      headerTintColor: theme.primary.contrastText,
      headerRight: () => (
        <IconButton
          name="funnel"
          color={theme.warning.main}
          // color={selectedMenuLevel_1 || !selectedMenuLevel_2 ? theme.warning.main : theme.primary.contrastText}
          size={24}
          onPress={toggleDrawer}
        />
      ),
    });
  }, [navigation, isDrawerOpen, selectedMenuLevel_2]);


  const renderDrawerContent = () => (
    <View style={[styles.drawerContent, { backgroundColor: theme.bg }]}>
      <ProductsMenuButton
        title={'Популярные'}
        selected={!selectedMenuLevel_1}
        // iconName={selectedMenuLevel_1 === code ? 'chevron-up-outline' : 'chevron-down-outline'}
        onPress={onPressTopHandler} />
      <ProductMenu closeDrawer={closeDrawer} />
    </View>
  );

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition="left"
      drawerType="front"
      renderNavigationView={renderDrawerContent}
    >

      <View style={[styles.container, { backgroundColor: theme.bg }]} onTouchStart={closeDrawer}>
        {/* <Text style={styles.text}>Component ManageOrderProducts</Text> */}
        <ProductsOutput rows={products} />
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