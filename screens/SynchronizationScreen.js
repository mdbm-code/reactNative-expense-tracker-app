import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { GlobalStyles } from '../constans/styles';
import { useDispatch, useSelector } from 'react-redux';

//components
import Button from '../components/ui/Button';

//actions
import { addRoutes } from '../store/redux/slices/routesSlice';
import { addProducts } from '../store/redux/slices/productsSlice';
import { addGroups } from '../store/redux/slices/groupsSlice';
import { addDocuments } from '../store/redux/slices/debitCreditSlice';
import { addSales } from '../store/redux/slices/salesSlice';
import { toggleTheme } from '../store/redux/slices/themeSlice';

//selectors
import { selectProducts } from '../store/redux/selectors/products';
import { selectGroups } from '../store/redux/selectors/groups';

//initial data
import { routes } from '../data/routes';
import { products } from '../data/products';
import { documents } from '../data/documents';
import { groups } from '../data/groups';
import { sales } from '../data/sales';
import ScreenWithDropdown from './ScreenWithDropdown';
import { getTheme } from '../store/redux/selectors/theme';

const SynchronizationScreen = () => {
  const dispatch = useDispatch();
  const [currentView, setCurrentView] = useState('_1');
  // const state = useSelector((state) => state.routes);
  const [showSelecteds, setShowSelecteds] = useState(false);
  const selectedData = useSelector((state) => state.selecteds);
  // const selectedPoints = useSelector(selectRoutePoints);
  const selectedProducts = useSelector(selectProducts);
  const selectedGroups = useSelector(selectGroups);
  const selectedDocs = useSelector((state) => state.debitCredit.documents);
  const theme = useSelector(getTheme);

  const loadRoutesHandler = () => {
    dispatch(addRoutes(routes));
  };
  const loadProductsHandler = () => {
    dispatch(addProducts(products));
  };
  const loadDebitCredit = () => {
    dispatch(addDocuments(documents));
  };

  const loadGroupsHandler = () => {
    dispatch(addGroups(groups));
  };
  const loadSalesHandler = () => {
    dispatch(addSales(sales));
  };

  const showRoutesHandler = () => {
    setShowSelecteds(true);
  };

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  const rows = [
    { label: 'Синхронизация', value: '_1' },
    { label: 'Служебные данные', value: '_2' },
  ];

  function onSelectView(value) {
    setCurrentView(value);
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.style.bg }]}>
      <ScreenWithDropdown
        rows={rows}
        value={currentView}
        onSelect={onSelectView}
      >
        <View style={styles.root}>
          <View style={styles.buttonContainer}>
            <Button onPress={loadRoutesHandler}>Загрузить маршруты</Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={loadProductsHandler}>Загрузить товары</Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={loadGroupsHandler}>
              Загрузить группы товаров
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={loadDebitCredit}>Загрузить акты-сверки</Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={loadSalesHandler}>
              Загрузить продажи клиентов
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={toggleThemeHandler}>Сменить тему</Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={showRoutesHandler}>
              Показать текущие состояния
            </Button>
          </View>
          <View>
            {showSelecteds && (
              <ScrollView>
                <View>
                  <Text style={styles.text}>
                    selectedManager: {selectedData.selectedManager}
                  </Text>
                  <Text style={styles.text}>
                    selectedRoute: {selectedData.selectedRoute}
                  </Text>
                  <View>
                    <Text style={styles.text}>
                      selectedCustomer.name:{' '}
                      {selectedData.selectedCustomer?.name}
                    </Text>
                    <Text style={styles.text}>
                      selectedCustomer.code:{' '}
                      {selectedData.selectedCustomer?.code}
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
                    products: {typeof selectedProducts}{' '}
                    {Array.isArray(selectedProducts)
                      ? ` array(${selectedProducts.length})`
                      : selectedProducts}
                  </Text>
                  <Text style={styles.text}>
                    groups: {typeof selectedGroups}{' '}
                    {Array.isArray(selectedGroups)
                      ? ` array(${selectedGroups.length})`
                      : selectedGroups}
                  </Text>
                  <Text style={styles.text}>
                    documents: {typeof selectedDocs}{' '}
                    {Array.isArray(selectedDocs)
                      ? ` array(${selectedDocs.length})`
                      : selectedDocs}
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
      </ScreenWithDropdown>
    </View>
  );
};

export default SynchronizationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  root: {
    flex: 1,
  },
  scrollView: { flex: 1 },
  bg: {},
  text: {},
  buttonContainer: {
    marginVertical: 2,
  },
});
