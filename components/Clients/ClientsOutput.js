import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constans/styles';
import ClientsList from './ClientsList';
import ClientsRouter from './ClientsRouter';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRoute } from '../../store/redux/slices/selectedsSlice';
import { selectRoutePoints } from '../../store/redux/selectors/routes';

function ClientsOutput({ fallbackText }) {
  const dispatch = useDispatch();

  const { selectedRoute } = useSelector((state) => state.selecteds);
  const points = useSelector(selectRoutePoints);

  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (typeof points === 'string') {
    content = (
      <View style={styles.container}>
        <Text style={styles.infoText}>{points}</Text>
      </View>
    );
  } else if (points.length > 0) {
    // console.log(points);

    content = <ClientsList rows={points} />;
  }

  function selectRouteHandler(value) {
    dispatch(setSelectedRoute(value));
  }

  return (
    <View style={styles.container}>
      {/* <ClientsSummary periodName={expensesPeriod} rows={rows} /> */}
      <ClientsRouter
        value={selectedRoute}
        onSelect={selectRouteHandler}
        isMultiple={false}
      />
      {content}
    </View>
  );
}

export default ClientsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    paddingBottom: 50,
  },
  infoText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 32,
  },
});
