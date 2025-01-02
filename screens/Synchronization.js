import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FallbackText from '../components/FallbackText';
import { GlobalStyles } from '../constans/styles';

import { routes } from '../data/routes';
import { useDispatch, useSelector } from 'react-redux';
import { addRoutes } from '../store/redux/slices/routesSlice';
import Button from '../components/ui/Button';
import { selectRoutePoints } from '../store/redux/selectors/routes';

const Synchronization = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.routes);
  const [showSelecteds, setShowSelecteds] = useState(false);
  const selectedData = useSelector((state) => state.selecteds);
  const selectedPoints = useSelector(selectRoutePoints);

  const loadRoutesHandler = () => {
    dispatch(addRoutes(routes));
  };
  const showRoutesHandler = () => {
    setShowSelecteds(true);
  };

  // return <FallbackText style={styles.bg}>Synchronization Screen</FallbackText>;

  return (
    <View style={styles.root}>
      <View>
        <Button onPress={loadRoutesHandler}>Загрузить маршруты</Button>
      </View>
      <View>
        <Button onPress={showRoutesHandler}>Показать текущие состояния</Button>
      </View>
      <View>
        {showSelecteds && (
          <View>
            <View>
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
                selectedPoints: {typeof selectedPoints}
              </Text>
              {/* {Array.isArray(selectedPoints) &&
                selectedPoints?.map((item) => (
                  <View>
                    <View>
                      <Text style={styles.text}> {item?.name}</Text>
                    </View>
                  </View>
                ))} */}
            </View>
          </View>
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
  bg: {
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
  },
});
