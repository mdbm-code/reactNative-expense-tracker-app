import { StyleSheet, View, Text, Keyboard } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//store
import { setCustomerSearchString, setSelectedCustomerListItem, setSelectedRoute } from '../store/redux/slices/selectedsSlice';
import { loadColors } from '../store/redux/slices/themeSlice';
import { selectCustomers, selectRoutePoints } from '../store/redux/selectors/routes';
import { getThemePalette } from '../store/redux/selectors/theme';

//components
import ClientsList from '../components/Clients/ClientsList';
import ClientsRouter from '../components/Clients/ClientsRouter';
import SearchPanel from '../components/SearchPanel';
import IconButton from '../components/ui/IconButton';
import Tally from '../components/Tally';

const CustomersListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const { selectedCustomerListItem } = useSelector(state => state.selecteds);

  useEffect(() => {
    dispatch(loadColors());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Маршрут',
      headerBackTitle: '',
      headerRight: ({ tintColor }) => (
        <IconButton
          name='search'
          color={tintColor}
          size={24}
          onPress={() => {
            if (showSearchPanel) {
              dispatch(setCustomerSearchString(''));
              setShowSearchPanel(false);
            } else {
              setShowSearchPanel(true);
            }
          }
          }
        />
      ),
    });
  }, [navigation, showSearchPanel]);

  function handleSearch(searchString) {
    dispatch(setCustomerSearchString(searchString)); // Сохраняем поисковую строку в состоянии
    Keyboard.dismiss(); // Закрываем клавиатуру
  };
  function handleCancelSearch() {
    dispatch(setCustomerSearchString('')); // Сохраняем поисковую строку в состоянии
    setShowSearchPanel(false);
  };

  const selecteds = useSelector(
    // const { selectedRoute, searchString } = useSelector(
    (state) => state.selecteds
  );
  // console.log('selecteds', selecteds);

  const points = useSelector(selectCustomers);
  // Получаем текущую тему и палитру из состояния Redux
  const theme = useSelector(getThemePalette);

  // console.log('points', points);

  let content = (<></>
    // <Text style={[styles.infoText, { color: theme.text?.primary }]}>
    //   Список ваших клиентов пуст
    // </Text>
  );
  if (typeof points === 'string') {
    content = <Text style={styles.infoText}>{points}</Text>;
  } else if (points.length > 0) {
    content = <ClientsList rows={points} theme={theme} editedId={selectedCustomerListItem} />;
  }

  function selectRouteHandler(value) {
    dispatch(setSelectedCustomerListItem(''));
    dispatch(setSelectedRoute(value));
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.style.bg }]}>
      {showSearchPanel && <SearchPanel onCancel={handleCancelSearch} onSearch={handleSearch} theme={theme} />}
      {/* <View style={[styles.container, { backgroundColor: palette.background.default }]}> */}
      {/* <ClientsSummary periodName={expensesPeriod} rows={rows} /> */}
      <Tally color={theme.style.nav.bg} bg={theme.style.bg}>
        <ClientsRouter
          theme={theme}
          value={selecteds?.selectedRoute || 'Выберите маршрут!'}
          onSelect={selectRouteHandler}
          isMultiple={false}
        />
      </Tally>
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
    // padding: 6
    // backgroundColor: theme.background,
    // backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
