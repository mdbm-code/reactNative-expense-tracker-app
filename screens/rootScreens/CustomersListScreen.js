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
import ClientsList from '../../components/Clients/ClientsList';
import Button from '../../components/ui/Button';
import ScreenWithPicker from '../ScreenWithPicker';
import FallbackText from '../../components/FallbackText';

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
      headerLeft: ({ tintColor }) => (
        <IconButton
          name={'person-add'}
          color={tintColor}
          size={24}
          onPress={() => navigation.navigate('NewCustomerScreen')}
        />
      ),
    });
  }, [navigation, showSearchPanel]);

  if (typeof options === 'string')
    return <FallbackText>{options}</FallbackText>;

  function handleSearch() {
    dispatch(setCustomerSearchString(searchString)); // Сохраняем поисковую строку в состоянии
    Keyboard.dismiss(); // Закрываем клавиатуру
  }
  function handleCancelSearch() {
    dispatch(setCustomerSearchString('')); // Сохраняем поисковую строку в состоянии
    setSearchString('');
    setShowSearchPanel(false);
  }

  let content = null;
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

  const FooterComponent = ({ fn, navigation, theme }) => {
    const handlePress = () => {
      if (typeof fn === 'function') {
        fn(); // Вызов переданной функции
      }
      navigation.navigate('RoutesManageScreen'); // Навигация
    };

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onPress={handlePress}
          titleStyle={{
            color: theme.style.info.dark,
            textDecorationLine: 'underline',
          }}
        >
          Редактировать список
        </Button>
      </View>
    );
  };

  function pickHandler(listItem) {
    dispatch(setSelectedCustomerListItem(''));
    dispatch(setSelectedRoute(listItem?.value));
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.style.bg }]}>
      <ScreenWithPicker
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
        onSelect={pickHandler}
        footerContent={
          <FooterComponent navigation={navigation} theme={theme} />
        }
      >
        {content}
      </ScreenWithPicker>
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
