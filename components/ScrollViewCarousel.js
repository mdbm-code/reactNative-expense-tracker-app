import React from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

const ScrollViewCarousel = ({ images }) => {
  // const { width, height } = Dimensions.get('window');
  //   images.forEach((fileName) => {
  //     imageSources[fileName] = require(`../assets/images/${fileName}`);
  //   });
  const imageSources = {
    '2.jpg': require('../assets/images/2.jpg'),
    '3.jpg': require('../assets/images/3.jpg'),
    '4.jpg': require('../assets/images/4.jpg'),
    '6.jpg': require('../assets/images/6.jpg'),
    // Добавьте другие изображения по мере необходимости
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image, index) => (
          <View key={index} style={[styles.imageContainer]}>
            <Image
              resizeMode='contain' // Изображение будет масштабироваться с сохранением пропорций
              source={imageSources[image]} // Используем объект imageSources
              style={styles.image}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScrollViewCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: Dimensions.get('window').width, // Ширина контейнера равна ширине экрана
    height: Dimensions.get('window').height, // Высота контейнера равна высоте экрана
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%', // Изображение будет занимать всю ширину контейнера
    height: '100%', // Изображение будет занимать всю высоту контейнера
  },
});
