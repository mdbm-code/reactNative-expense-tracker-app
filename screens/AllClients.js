import { StyleSheet, View } from 'react-native';
import React from 'react';

import ClientsOutput from '../components/Clients/ClientsOutput';

const AllClients = () => {
  return (
    <View style={styles.root}>
      <ClientsOutput fallbackText={'Вы не сделали ни одной заявки'} />
    </View>
  );
};

export default AllClients;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
