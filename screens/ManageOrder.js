import { StyleSheet, View } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import FallbackText from '../components/FallbackText';
import { GlobalStyles } from '../constans/styles';
import { ClientsContext } from '../store/context/client-context';

const ManageOrder = ({ navigation, route }) => {
  const { tabIndex } = useContext(ClientsContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Подбор товаров',
    });
  }, []);

  return (
    <View style={styles.container}>
      <FallbackText>
        client Id: {route?.params?.clientId} from tab: {tabIndex?.key} :
        {tabIndex?.title}
      </FallbackText>
    </View>
  );
};

export default ManageOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
