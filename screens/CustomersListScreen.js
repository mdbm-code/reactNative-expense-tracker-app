import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRoute } from '../store/redux/slices/selectedsSlice';
import { selectRoutePoints } from '../store/redux/selectors/routes';
import ClientsList from '../components/Clients/ClientsList';
import ClientsRouter from '../components/Clients/ClientsRouter';
import { getThemePalette } from '../store/redux/selectors/theme';
import { loadColors } from '../store/redux/slices/themeSlice';
// import { GlobalStyles } from '../constans/styles';
// import { useTheme } from '../store/context/theme-context';

const CustomersListScreen = () => {
  const dispatch = useDispatch();
  // const { theme } = useTheme();
  useEffect(() => {
    dispatch(loadColors());
  }, [dispatch]);

  const { selectedRoute } = useSelector((state) => state.selecteds);
  const points = useSelector(selectRoutePoints);
  // Получаем текущую тему и палитру из состояния Redux
  const theme = useSelector(getThemePalette);

  // console.log('points', points);

  let content = <Text style={styles.infoText}>Список ваших клиентов пуст</Text>;
  if (typeof points === 'string') {
    content = <Text style={styles.infoText}>{points}</Text>;
  } else if (points.length > 0) {
    content = <ClientsList rows={points} theme={theme} />;
  }

  function selectRouteHandler(value) {
    dispatch(setSelectedRoute(value));
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* <View style={[styles.container, { backgroundColor: palette.background.default }]}> */}
      {/* <ClientsSummary periodName={expensesPeriod} rows={rows} /> */}
      <ClientsRouter
        value={selectedRoute}
        onSelect={selectRouteHandler}
        isMultiple={false}
      />
      {content}
    </View>
  );
  //   return (
  //     <View style={styles.root}>
  //       <ClientsOutput fallbackText={'Вы не сделали ни одной заявки'} />
  //     </View>
  //   );
};

export default CustomersListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme.background,
    // backgroundColor: GlobalStyles.colors.primary700,
  },
});
