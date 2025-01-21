import { StyleSheet, View, Text, Keyboard } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//store
import {
  setCustomerSearchString,
  setSelectedCustomerListItem,
  setSelectedRoute,
} from '../../store/redux/slices/selectedsSlice';
// import { loadColors } from '../../store/redux/slices/themeSlice';
import {
  getSelector_selectedManagerRoutes,
  selectCustomers,
} from '../../store/redux/selectors/routes';
import { getTheme } from '../../store/redux/selectors/theme';

//components
import SearchPanel from '../../components/SearchPanel';
import IconButton from '../../components/ui/IconButton';
import ScreenWithDropdown from '../ScreenWithDropdown';
import ClientsList from '../../components/Clients/ClientsList';
import Button from '../../components/ui/Button';

const CustomersListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState(''); // Поисковая строка
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const { selectedCustomerListItem } = useSelector((state) => state.selecteds);

  const rotesSelector = getSelector_selectedManagerRoutes();
  const options = useSelector(rotesSelector);

  const selecteds = useSelector((state) => state.selecteds);
  const points = useSelector(selectCustomers);
  const theme = useSelector(getTheme);
  // console.log('CustomersListScreen');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Маршрут',
      headerBackTitle: '',
      headerRight: ({ tintColor }) => (
        <IconButton
          name={showSearchPanel ? 'share-social-outline' : 'search'}
          color={tintColor}
          size={24}
          onPress={() => {
            if (showSearchPanel) {
              dispatch(setCustomerSearchString(''));
              setShowSearchPanel(false);
            } else {
              setShowSearchPanel(true);
            }
          }}
        />
      ),
    });
  }, [navigation, showSearchPanel]);

  function handleSearch() {
    dispatch(setCustomerSearchString(searchString)); // Сохраняем поисковую строку в состоянии
    Keyboard.dismiss(); // Закрываем клавиатуру
  }
  function handleCancelSearch() {
    dispatch(setCustomerSearchString('')); // Сохраняем поисковую строку в состоянии
    setSearchString('');
    setShowSearchPanel(false);
  }

  function onPressEditRouteList() {
    navigation.navigate('RoutesManageScreen');
  }

  // console.log('points', points);

  let content = <></>;
  if (typeof points === 'string') {
    content = <Text style={styles.infoText}>{points}</Text>;
  } else if (points.length > 0) {
    content = (
      <ClientsList
        rows={points}
        theme={theme}
        editedId={selectedCustomerListItem}
      />
    );
  }

  let footerComponent = <></>;
  footerComponent = (
    <View>
      <Button
        onPress={onPressEditRouteList}
        titleStyle={{ color: theme.style.text.main }}
      >
        Редактировать список
      </Button>
    </View>
  );

  function selectRouteHandler(value) {
    dispatch(setSelectedCustomerListItem(''));
    dispatch(setSelectedRoute(value));
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.style.bg }]}>
      {/* {showSearchPanel && (
        <SearchPanel
          onCancel={handleCancelSearch}
          onSearch={handleSearch}
          theme={theme}
        />
      )} */}
      <ScreenWithDropdown
        component={
          showSearchPanel && (
            <SearchPanel
              onCancel={handleCancelSearch}
              onSearch={handleSearch}
              theme={theme}
              value={searchString}
              onChangeText={setSearchString}
            />
          )
        }
        rows={options || []}
        value={selecteds?.selectedRoute}
        onSelect={selectRouteHandler}
        footerContent={footerComponent}
      >
        {content}
      </ScreenWithDropdown>
    </View>
  );
};

export default CustomersListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
