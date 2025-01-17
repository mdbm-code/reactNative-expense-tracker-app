import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ImageViewer = ({ rows }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailPress = (index) => {
    setCurrentImageIndex(index);
  };


  const handleSwipe = (direction) => {
    if (direction === 'left' && currentImageIndex < rows.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else if (direction === 'right' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // return (
  //   <View style={styles.container}>
  //     <ScrollView
  //       horizontal
  //       pagingEnabled
  //       showsHorizontalScrollIndicator={false}
  //       style={styles.scrollView}
  //     >
  //       <Image
  //         source={rows[currentImageIndex]}
  //         style={styles.mainImage}
  //         resizeMode="contain" // Используйте 'contain' для сохранения пропорций
  //         onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
  //       />
  //     </ScrollView>
  //     <ScrollView
  //       horizontal
  //       showsHorizontalScrollIndicator={false}
  //       style={styles.thumbnailsContainer}
  //     >
  //       {rows.map((image, index) => (
  //         <TouchableOpacity key={index} onPress={() => handleThumbnailPress(index)}>
  //           <Image
  //             source={image}
  //             style={[
  //               styles.thumbnail,
  //               index === currentImageIndex ? styles.selectedThumbnail : null,
  //             ]}
  //             onError={(e) => console.log('Error loading thumbnail:', e.nativeEvent.error)}
  //           />
  //         </TouchableOpacity>
  //       ))}
  //     </ScrollView>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        onTouchEnd={(e) => {
          const touchX = e.nativeEvent.locationX;
          if (touchX < Dimensions.get('window').width / 2) {
            handleSwipe('right');
          } else {
            handleSwipe('left');
          }
        }}
      >
        <Image
          source={typeof rows[currentImageIndex] === 'string' ? { uri: rows[currentImageIndex] } : rows[currentImageIndex]}
          // source={rows[currentImageIndex]} // Предполагается, что это массив локальных изображений через require
          style={styles.mainImage}
          resizeMode="contain" // Сохраняет соотношение сторон
          onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
        />
        {/* <Image
          source={typeof rows[currentImageIndex] === 'string' ? { uri: rows[currentImageIndex] } : rows[currentImageIndex]} // Для локальных изображений используй require
          style={[
            styles.mainImage
          ]}
        /> */}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.thumbnailsContainer}
      >
        {rows.map((imageUri, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleThumbnailPress(index)}
          >
            <Image
              source={typeof imageUri === 'string' ? { uri: imageUri } : imageUri} // Для локальных изображений используй require
              style={[
                styles.thumbnail,
                index === currentImageIndex ? styles.selectedThumbnail : null,
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    width: '100%',
    height: 300,
    // backgroundColor: 'gray',
  },
  mainImage: {
    // width: '100%',
    flex: 1,
    height: "100%", // Совпадает с высотой ScrollView
    width: screenWidth,
    resizeMode: 'contain',
  },
  thumbnailsContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  selectedThumbnail: {
    borderWidth: 2,
    borderColor: 'blue',
  },
});

export default ImageViewer;
