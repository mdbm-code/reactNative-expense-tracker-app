import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../store/redux/selectors/theme';
import FallbackText from '../../components/FallbackText';
import { getSelector_customerOrderList } from '../../store/redux/selectors/orders';
import { setSelectedOrderByCode } from '../../store/redux/slices/ordersSlice';
import Pager from '../../components/ui/Pager/Pager';
import DocumentsTable from '../../components/DocumentsTable';
import Paginator from '../../components/ui/Pager/Paginator';

const CustomerDocumentsScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const selector = getSelector_customerOrderList(page, 'A', 'byCustomer');
  const { rows, pages } = useSelector(selector);
  const theme = useSelector(getTheme);

  if (typeof rows === 'string')
    return (
      <FallbackText titleStyle={{ color: theme.style.text.main }}>
        {rows}
      </FallbackText>
    );

  function onPageChangeHandler(page) {
    setPage(page);
  }

  function pressOnItemHandler(code) {
    if (code) {
      const res = dispatch(setSelectedOrderByCode(code));
      if (typeof res === 'string') console.log(res);
    }
  }

  return (
    <View style={[styles.rootContainer, { backgroundColor: theme.style.bg }]}>
      {Number(pages) > 1 && (
        <Paginator
          onPress={onPageChangeHandler}
          page={page}
          pages={pages}
          theme={theme}
        />
      )}
      <DocumentsTable
        onPress={pressOnItemHandler}
        rows={rows}
        theme={theme}
        hideColums={[]}
        showDate
      />
    </View>
  );
};

export default CustomerDocumentsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingBottom: 36,
    paddingHorizontal: 6,
  },
});
