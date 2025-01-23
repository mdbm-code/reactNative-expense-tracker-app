import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import FallbackText from '../../components/FallbackText';
import { getSelector_selectedManagerRoutes } from '../../store/redux/selectors/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../store/redux/selectors/theme';
import Table from '../../components/GridTable/v2/Table';
import IconButton from '../../components/ui/IconButton';
import { thunk_updateRoute } from '../../store/redux/slices/routesSlice';
import { Ionicons } from '@expo/vector-icons';

const RoutesManageScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const rotesSelector = getSelector_selectedManagerRoutes();
  const routes = useSelector(rotesSelector);
  const theme = useSelector(getTheme);
  const [editCode, setEditCode] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Управление маршрутами`,
      headerStyle: { backgroundColor: theme.style.bar },
      headerTintColor: theme.style.nav.text,
      headerBackTitle: '',
      headerBackVisible: true, // Показать кнопку "Назад"
      headerBackTitle: '', // Установка текста кнопки "Назад" на пустое значение
      headerBackImage: () => (
        <Ionicons
          name={'chevron-back-outline'}
          size={24}
          color={theme.style.text.main}
        />
      ), // ваш компонент иконки
    });
  }, [navigation]);

  if (typeof routes === 'string')
    return (
      <FallbackText titleStyle={{ color: theme.style.text.main }}>
        {routes}
      </FallbackText>
    );

  function pressOnItemHandler(payload) {
    console.log(payload);
  }

  const columns = [
    {
      id: 'code',
      hidden: true,
    },
    {
      id: 'title',
      keyboardType: 'default',
      as: {
        cond: {
          key: 'code',
          eq: editCode,
          iftrue: 'input',
        },
      },
      title: 'Маршрут',
      flex: 9,
      autofocus: true,
      inputStyle: {
        textAlign: 'left',
        color: theme.style.text.main,
        borderBottomWidth: 1,
        height: '100%',
        backgroundColor: theme.style.warning.light,
      },
      viewStyle: { borderBottomWidth: 1 },
    },
    {
      id: 'buttons',
      as: 'component',
      title: '',
      flex: 3,
      titleStyle: { textAlign: 'right', color: theme.style.customerList.title },
      viewStyle: { borderBottomWidth: 1 },
    },
    {
      id: 'count',
      title: 'Точек',
      flex: 3,
      titleStyle: { textAlign: 'right', color: theme.style.text.main },
      viewStyle: { borderColor: theme.style.text.main, borderBottomWidth: 1 },
    },
  ];

  const handleSubmitEditing = (item, newValue) => {
    const routeCode = item?.code;
    const newTitle = newValue;
    if (routeCode && newTitle) {
      dispatch(thunk_updateRoute(routeCode, { title: newTitle }));
    }
    setEditCode(null);
  };

  function pressIconHandle(routeCode) {
    if (routeCode === editCode) {
      setEditCode(null);
    } else {
      setEditCode((prevState) => (prevState === routeCode ? null : routeCode));
    }
  }

  const rows = routes.map((item) => {
    return {
      ...item,
      buttons: (
        <View style={{ flex: 1, padding: 4 }}>
          <IconButton
            onPress={() => pressIconHandle(item.code)}
            name={editCode === item.code ? 'close' : 'pencil-outline'}
            size={28}
          />
        </View>
      ),
    };
  });

  return (
    <View style={[styles.rootContainer, { backgroundColor: theme.style.bg }]}>
      <Table
        rowStyle={styles.rowStyle}
        selectedId={editCode}
        columns={columns}
        rows={rows}
        keyId='code'
        theme={theme}
        onPress={(returnParams) => pressOnItemHandler(returnParams)}
        onChangeText={handleSubmitEditing}
      />
    </View>
  );
};

export default RoutesManageScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 6,
  },
});
