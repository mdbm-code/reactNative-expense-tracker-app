import React, { useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import { GlobalStyles } from '../constans/styles';
import IconButton from '../components/ui/IconButton';
import ProductMenu from '../components/ManageProductsScreen/ProductsMenu';
import ProductsOutput from '../components/ManageProductsScreen/ProductsOutput';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { selectProducts } from '../store/redux/selectors/products';

const ManageProductsScreen = ({ navigation, route }) => {

  const drawerRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const products = useSelector(selectProducts);

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

  // console.log('isDrawerOpen', isDrawerOpen);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Подбор товаров',
      headerRight: () => (
        <IconButton
          name="menu"
          color="white"
          size={24}
          onPress={toggleDrawer}
        />
      ),
    });
  }, [navigation, isDrawerOpen]);


  const renderDrawerContent = () => (
    <View style={styles.drawerContent}>
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

      <View style={styles.container} onTouchStart={closeDrawer}>
        {/* <Text style={styles.text}>Component ManageOrderProducts</Text> */}
        <ProductsOutput products={products} />
      </View>
    </DrawerLayout>
  );
};

export default ManageProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
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
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 2,
  },
  drawerText: {
    color: 'white',
    fontSize: 18,
  },
});