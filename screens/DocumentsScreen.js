import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { getTheme } from '../store/redux/selectors/theme';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWithDropdown from './ScreenWithDropdown';
import DocumentsTable from '../components/DocumentsTable';
import { setSelectedOrderByCode } from '../store/redux/slices/ordersSlice';
import { getSelector_customerOrderList } from '../store/redux/selectors/orders';
import Paginator from '../components/ui/Pager/Paginator';
import { periods } from '../constans/dates';

const DocumentsScreen = () => {
  const theme = useSelector(getTheme);
  const [selectedPeriod, setSelectedPeriod] = useState('D');
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const selector = getSelector_customerOrderList(
    page,
    selectedPeriod,
    'byManager'
  );
  const { rows, pages } = useSelector(selector);

  function selectHandler(value) {
    setSelectedPeriod(value);
  }

  function pressOnItemHandler(returnParams) {
    if (returnParams?.item?.code) {
      dispatch(setSelectedOrderByCode(returnParams?.item?.code));
    }
  }

  const onSwipeHandler = (event) => {
    const { translationX, translationY } = event.nativeEvent;
    const selectedPeriodIndex = periods.findIndex(
      (item) => item.value === selectedPeriod
    );
    // Определите направление свайпа
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        const nextIndex =
          selectedPeriodIndex - 1 < 0
            ? periods.length - 1
            : selectedPeriodIndex - 1;
        setSelectedPeriod(periods[nextIndex]?.value);
      } else {
        // console.log('Свайп влево');

        const nextIndex =
          selectedPeriodIndex + 1 > periods.length - 1
            ? 0
            : selectedPeriodIndex + 1;
        setSelectedPeriod(periods[nextIndex]?.value);
      }
    } else {
      if (translationY > 0) {
        console.log('Свайп вниз');
      } else {
        console.log('Свайп вверх');
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.style.bg }]}>
      <ScreenWithDropdown
        onSwipe={onSwipeHandler}
        rows={periods}
        value={selectedPeriod}
        onSelect={selectHandler}
        // title={'Таблица с заявками'}
      >
        <DocumentsTable
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
      </ScreenWithDropdown>
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
