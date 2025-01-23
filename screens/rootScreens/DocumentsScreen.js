import { StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { getTheme } from '../../store/redux/selectors/theme';
import { useDispatch, useSelector } from 'react-redux';
import DocumentsTable from '../../components/DocumentsTable';
import { setSelectedOrderByCode } from '../../store/redux/slices/ordersSlice';
import { getSelector_customerOrderList } from '../../store/redux/selectors/orders';
import Paginator from '../../components/ui/Pager/Paginator';
import { periods } from '../../constans/dates';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWithPicker from '../ScreenWithPicker';

const DocumentsScreen = ({ navigation }) => {
  const theme = useSelector(getTheme);
  const [selectedPeriod, setSelectedPeriod] = useState('D');
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  // Локальное состояние для управления вызовом селектора
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Создаем селектор с учетом текущего состояния
  const selector = getSelector_customerOrderList(
    page,
    selectedPeriod,
    'byManager',
    refreshTrigger
  );
  const { rows, pages } = useSelector(selector);

  useFocusEffect(
    useCallback(() => {
      // Увеличиваем значение триггера, чтобы перезапустить селектор
      setRefreshTrigger((prev) => prev + 1);
    }, [page, selectedPeriod]) // Зависимости для обновления при изменении этих значений
  );

  // Обработчик для кнопки "Обновить"
  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  function pickHandler(listItem) {
    setSelectedPeriod(listItem?.value);
  }

  //Обновление при открытии. Варинат 2
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Действие при фокусе экрана
      // console.log('Screen is focused');
    });

    return unsubscribe; // Отписываемся от события при размонтировании
  }, [navigation]);

  const onRefreshHandler = useCallback(() => {
    setRefreshing(true);
    // Имитация обновления данных
    setTimeout(() => {
      setRefreshing(false);
      handleRefresh();
    }, 2000);
  }, []);


  function pressOnItemHandler(returnParams) {
    if (returnParams?.item?.code) {
      dispatch(setSelectedOrderByCode(returnParams?.item?.code));
    }
  }

  // const onSwipeHandler = (event) => {
  //   const { translationX, translationY } = event.nativeEvent;
  //   const selectedPeriodIndex = periods.findIndex(
  //     (item) => item.value === selectedPeriod
  //   );
  //   // Определите направление свайпа
  //   if (Math.abs(translationX) > Math.abs(translationY)) {
  //     if (translationX > 0) {
  //       const nextIndex =
  //         selectedPeriodIndex - 1 < 0
  //           ? periods.length - 1
  //           : selectedPeriodIndex - 1;
  //       setSelectedPeriod(periods[nextIndex]?.value);
  //     } else {
  //       // console.log('Свайп влево');

  //       const nextIndex =
  //         selectedPeriodIndex + 1 > periods.length - 1
  //           ? 0
  //           : selectedPeriodIndex + 1;
  //       setSelectedPeriod(periods[nextIndex]?.value);
  //     }
  //   } else {
  //     if (translationY > 0) {
  //       console.log('Свайп вниз');
  //     } else {
  //       console.log('Свайп вверх');
  //     }
  //   }
  // };

  function onPageChangeHandler(page) {
    setPage(page);
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.style.bg }]}>
      <ScreenWithPicker
        rows={periods || []}
        value={selectedPeriod}
        onSelect={pickHandler}
      >
        <DocumentsTable
          onRefresh={onRefreshHandler}
          refreshing={refreshing}
          // hideHeader={true}
          onPress={pressOnItemHandler}
          rows={rows || []}
          theme={theme}
          hideColums={[]}
          showDate
        />
        {Number(pages) > 1 && (
          <Paginator
            style={styles.footer}
            onPress={onPageChangeHandler}
            page={page}
            pages={pages}
            theme={theme}
          />
        )}
      </ScreenWithPicker>
    </View>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderTopWidth: 1,
  },
});
