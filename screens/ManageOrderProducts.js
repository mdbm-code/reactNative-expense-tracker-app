import React, { useContext, useLayoutEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import { GlobalStyles } from '../constans/styles';
import { ClientsContext } from '../store/context/client-context';
import IconButton from '../components/ui/IconButton';
import ProductMenu from '../components/ProductsMenu/';
import ProductsOutput from '../components/ProductsOutput';

const ManageOrderProducts = ({ navigation, route }) => {
  const { tabIndex } = useContext(ClientsContext);
  const drawerRef = useRef(null);

  const openDrawer = () => {
    drawerRef.current?.openDrawer();
  };

  const closeDrawer = () => {
    drawerRef.current?.closeDrawer();
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Подбор товаров',
      headerRight: () => (
        <IconButton
          name="menu"
          color="white"
          size={24}
          onPress={openDrawer}
        // onPress={() => navigation.toggleDrawer()}
        />
      ),
    });
  }, [navigation]);


  const renderDrawerContent = () => (
    <View style={styles.drawerContent}>
      {/* <Text style={styles.drawerText}>Drawer Content</Text> */}
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
        {/* <IconButton
          name="menu"
          color="white"
          size={24}
          onPress={openDrawer}
          style={styles.menuButton}
        /> */}
        {/* <Text style={styles.text}>
          client Id: {route?.params?.clientId} from tab: {tabIndex?.key} : {tabIndex?.title}
        </Text> */}
        <ProductsOutput />
      </View>
    </DrawerLayout>
  );
};

export default ManageOrderProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    justifyContent: 'center',
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
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 2,
  },
  drawerText: {
    color: 'white',
    fontSize: 18,
  },
});