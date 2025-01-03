import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
// import FallbackText from '../components/FallbackText';
import { GlobalStyles } from '../constans/styles';

import { useDispatch, useSelector } from 'react-redux';
import { addRoutes } from '../store/redux/slices/routesSlice';
import Button from '../components/ui/Button';
// import { selectRoutePoints } from '../store/redux/selectors/routes';
import { addProducts } from '../store/redux/slices/productsSlice';


import { routes } from '../data/routes';
import { products } from '../data/products';
import { groups } from '../data/groups';
import { selectProducts } from '../store/redux/selectors/products';
import { addGroups } from '../store/redux/slices/groupsSlice';
import { selectGroups } from '../store/redux/selectors/groups';
const Synchronization = () => {
  const dispatch = useDispatch();
  // const state = useSelector((state) => state.routes);
  const [showSelecteds, setShowSelecteds] = useState(false);
  const selectedData = useSelector((state) => state.selecteds);
  // const selectedPoints = useSelector(selectRoutePoints);
  const selectedProducts = useSelector(selectProducts);
  const selectedGroups = useSelector(selectGroups);

  const loadRoutesHandler = () => {
    dispatch(addRoutes(routes));
  };
  ;
  const loadProductsHandler = () => {
    dispatch(addProducts(products));
  };

  const loadGroupsHandler = () => {
    dispatch(addGroups(groups));
  };

  const showRoutesHandler = () => {
    setShowSelecteds(true);
  }

  // return <FallbackText style={styles.bg}>Synchronization Screen</FallbackText>;

  return (
    <View style={styles.root}>
      <View style={styles.buttonContainer}>
        <Button onPress={loadRoutesHandler}>Загрузить маршруты</Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={loadProductsHandler}>Загрузить товары</Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={loadGroupsHandler}>Загрузить группы товаров</Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={showRoutesHandler}>Показать текущие состояния</Button>
      </View>
      <View>
        {showSelecteds && (
          <ScrollView>
            <View >
              <Text style={styles.text}>
                selectedManager: {selectedData.selectedManager}
              </Text>
              <Text style={styles.text}>
                selectedRoute: {selectedData.selectedRoute}
              </Text>
              <View>
                <Text style={styles.text}>
                  selectedCustomer.name: {selectedData.selectedCustomer?.name}
                </Text>
                <Text style={styles.text}>
                  selectedCustomer.code: {selectedData.selectedCustomer?.code}
                </Text>
                <Text style={styles.text}>
                  selectedCustomer.id: {selectedData.selectedCustomer?.id}
                </Text>
              </View>

              <Text style={styles.text}>
                selectedOrder: {selectedData.selectedOrder}
              </Text>
              <Text style={styles.text}>
                selectedOrderTab: {selectedData.selectedOrderTab}
              </Text>
              <Text style={styles.text}>
                selectedTheme: {selectedData.selectedTheme}
              </Text>
              <Text style={styles.text}>
                selectedGroup: {selectedData.selectedMenuLevel_2}
              </Text>
              <Text style={styles.text}>
                products: {typeof selectedProducts} {Array.isArray(selectedProducts) ? ` array(${selectedProducts.length})` : selectedProducts}
              </Text>
              <Text style={styles.text}>
                groups: {typeof selectedGroups} {Array.isArray(selectedGroups) ? ` array(${selectedGroups.length})` : selectedGroups}
              </Text>
              {/* <Text style={styles.text}>
                selectedPoints: {typeof selectedPoints}
              </Text> */}
              {/* {Array.isArray(selectedPoints) &&
                selectedPoints?.map((item) => (
                  <View>
                    <View>
                      <Text style={styles.text}> {item?.name}</Text>
                    </View>
                  </View>
                ))} */}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Synchronization;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  scrollView: { flex: 1, },
  bg: {
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
  },
  buttonContainer: {
    marginVertical: 2,
    backgroundColor: GlobalStyles.colors.primary800,
  }
});
