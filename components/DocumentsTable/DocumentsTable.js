import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../components/GridTable/v2/Table';
import { confirmAndSendOrder } from '../../store/redux/slices/ordersSlice';
import { Ionicons } from '@expo/vector-icons';
const DocumentsTable = ({
  onRefresh,
  refreshing,
  hideHeader,
  onPress,
  rows,
  headerColor,
  searchable,
  hideColums = [],
  theme,
  hideData = [],
}) => {
  const dispatch = useDispatch();
  const selectedOrder = useSelector((state) => state.orders?.selectedOrder);

  function getIcon(status) {
    switch (status) {
      case 'draft':
        return ['share-outline', theme.style.error.light];
      case 'failed':
        return ['cloud-offline-outline', theme.style.warning.light];
      case 'accepted':
        return ['cloud-done-outline', theme.style.success.light];
      case 'delivered':
        return ['star-outline', theme.style.info.light];
      case 'canceled':
        return [
          'trash-outline',
          theme.style.customerList.bg2,
          theme.style.error.dark,
        ];
      default:
        return ['time-outline', theme.style.info.light];
    }
  }

  const documents = rows.map((row) => {
    const iconSet = getIcon(row.status);
    return {
      code: row.code,
      titleComponent: (
        <TouchableOpacity
          onPress={() => onPress(row.code)}
          style={styles.titleContainer}
        >
          {!hideData.includes('customerName') && (
            <Text style={{ color: theme.style.text.main, textAlign: 'left' }}>
              {row?.customerName}
            </Text>
          )}
          <Text style={{ color: theme.style.text.main, textAlign: 'left' }}>
            {!hideData.includes('date')
              ? `№ ${row.code} от ${row?.formattedDate}`
              : `№ ${row.code}`}
          </Text>
        </TouchableOpacity>
      ),
      iconComponent: (
        <TouchableOpacity
          onPress={() => onPressShareOrderHandler(row.code)}
          style={{
            // flex: 1,
            // marginRight: 12,
            backgroundColor: iconSet[1],
            // borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            padding: 2,
            marginBottom: 6,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name={iconSet[0]}
            size={24}
            color={iconSet[2] || theme.style.text.main}
          />
        </TouchableOpacity>
      ),
      sumComponent: (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 8,
          }}
        >
          <Text
            style={{
              color: theme.style.text.main,
              textAlign: 'right',
              //   whiteSpace: 'nowrap',
              //   overflow: 'hidden',
            }}
          >
            {row.totalAmount}
          </Text>
          {row.totalReturn === 0 ? null : (
            <Text
              style={{
                color: theme.style.text.main,
                // marginRight: 10,
                textAlign: 'right',
                // whiteSpace: 'nowrap',
                // overflow: 'hidden',
                color: theme.style.error.main,
              }}
            >
              -{row.totalReturn}
            </Text>
          )}
        </View>
      ),
    };
  });

  const redRowStyle = {
    cond: {
      key: 'code',
      inc: [selectedOrder?.code],
      iftrue: {
        // borderLeftWidth: 1,
        paddingBottom: 5,
        backgroundColor: theme.style.drawer.header.bg,
        height: 50,
      },
      iffalse: {
        // borderLeftWidth: 1,
        paddingBottom: 5,
        backgroundColor: theme.style.customerList.bg2,
        height: 50,
      },
    },
  };

  const redRowStyleIcon = {
    cond: {
      key: 'code',
      inc: [selectedOrder?.code],
      iftrue: {
        // borderLeftWidth: 1,
        padding: 5,
        backgroundColor: theme.style.drawer.header.bg,
      },
      iffalse: {
        // borderLeftWidth: 1,
        padding: 5,
        backgroundColor: theme.style.customerList.bg2,
      },
    },
  };

  const columns = [
    {
      id: 'iconComponent',
      title: '',
      flex: 2,
      as: 'component',
      titleStyle: { textAlign: 'right', color: theme.style.text.main },
      viewStyle: redRowStyle,
    },
    {
      id: 'code',
      title: 'code',
      flex: 2,
      hidden: true,
    },
    {
      id: 'titleComponent',
      title: 'Документ',
      flex: 9,
      as: 'component',
      titleStyle: { textAlign: 'left', color: theme.style.text.main },
      viewStyle: redRowStyle,
    },
    {
      id: 'sumComponent',
      title: 'Суммы',
      flex: 4,
      as: 'component',
      headerViewStyle: { alignItems: 'flex-end', paddingRight: 8 },
      headerTitleStyle: { textAlign: 'right' },
      //   titleStyle: { textAlign: 'right', color: theme.style.text.main },
      viewStyle: redRowStyle,
    },
  ];

  const shareCurrentOrder = (orderCode) => {
    const res = dispatch(confirmAndSendOrder(orderCode));
    console.log('res', res);
  };

  function onPressShareOrderHandler(orderCode) {
    Alert.alert(
      '',
      'Отправить заявку на сервер ?',
      [
        {
          text: 'Отмена',
          // onPress: () => console.log('Удалить нажато'),
          style: 'cancel',
        },
        {
          text: 'Да',
          onPress: () => shareCurrentOrder(orderCode),
          style: 'default',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('Alert был закрыт'), // Вызывается при закрытии
      } // Если true, Alert можно закрыть, нажав вне него);
    );
  }

  function pressOnItemHandler(payload) {
    console.log(payload);
  }

  return (
    <View style={[styles.rootContainer, { backgroundColor: theme.style.bg }]}>
      <Table
        onRefresh={onRefresh}
        refreshing={refreshing}
        hideHeader={hideHeader}
        rowStyle={styles.rowStyle}
        columns={columns}
        rows={documents}
        keyId='code'
        theme={theme}
        onPress={(returnParams) => pressOnItemHandler(returnParams)}
      />
    </View>
  );
};

export default DocumentsTable;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingBottom: 6,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
  },
  rowStyle: {
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerOptions_RootContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerOptions_Container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  slider: {
    flex: 1,
    margin: 10,
  },
  buttonRowTitle: {},
});
