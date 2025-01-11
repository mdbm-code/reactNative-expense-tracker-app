import { FlatList, StyleSheet, View, Animated, PanResponder, TouchableOpacity } from 'react-native';
import ClientItem from './ClientItem';
import { useRef } from 'react';
import ClientItemManage from './ClientItemManage';
import { useSelector } from 'react-redux';



const ClientsList = ({ rows, theme, editedId }) => {
  const { selectedRoute, selectedManager, searchString } = useSelector(state => state.selecteds);
  // const animatedValues = useRef({}).current;

  // Создаем анимацию для каждого элемента
  // const handleLongPress = (item) => {
  //   console.log('handleLongPress', item);

  // // Проверяем, уже ли элемент сдвинут
  // if (animatedValues[index]) {
  //   return;
  // }

  // const animatedValue = new Animated.Value(0);
  // animatedValues[index] = animatedValue;

  // Animated.timing(animatedValue, {
  //   toValue: 100, // смещение вправо
  //   duration: 300,
  //   useNativeDriver: true,
  // }).start(() => {
  //   // Удаляем анимацию после завершения
  //   delete animatedValues[index];
  // });
  // };



  function renderItem({ item, index }) {
    // const translateX = animatedValues[index] || new Animated.Value(0); // используем текущее смещение
    if (editedId === item?.code && !searchString && selectedRoute && selectedManager) {
      return <ClientItemManage
        theme={theme}
        itemId={item?.code}
        selectedRoute={selectedRoute}
        selectedManager={selectedManager}>
        <ClientItem item={item} theme={theme} editedId={editedId} />
      </ClientItemManage>
    } else {
      return <ClientItem item={item} theme={theme} />
    }
    // <TouchableOpacity onLongPress={() => handleLongPress(item)}>
    // <Animated.View style={[styles.itemContainer, { transform: [{ translateX }] }]}>
    //   <View {...PanResponder.create({
    //     onLongPress: () => handleLongPress(index),
    //     onMoveShouldSetPanResponder: () => true, // разрешаем движение
    //   }).panHandlers}> 
    // <ClientItem item={item} theme={theme} />
    // </TouchableOpacity>
    // </Animated.View>

    // return <ClientItem item={itemData.item} theme={theme} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.code}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ClientsList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
  },
  itemContainer: {
    // любые стили для контейнера элемента
    // backgroundColor: 'white',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    // padding: 16,
  },
});
