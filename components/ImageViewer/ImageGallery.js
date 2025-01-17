import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const screenWidth = Dimensions.get('window').width;

const ImageGallery = ({ rows }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false); // Состояние для полноэкранного режима

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

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // // Преобразуем массив `rows` в формат, который понимает `react-native-image-zoom-viewer`
  // const imageUrls = rows.map((image) =>
  //   typeof image === 'string' ? { url: image } : { props: { source: image } }
  // );
  // Преобразуем массив `rows` в формат, который понимает `react-native-image-zoom-viewer`
  const imageUrls = rows.map((image) =>
    typeof image === 'string'
      ? { url: image } // Для удаленных изображений
      : { url: '', props: { source: image } } // Для локальных изображений
  );


  return (
    <View style={styles.container}>
      {/* Основной экран */}
      {!isFullScreen && (
        <>
          {/* <ScrollView
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
            <TouchableOpacity onPress={toggleFullScreen}>
              <Image
                source={
                  typeof rows[currentImageIndex] === 'string'
                    ? { uri: rows[currentImageIndex] }
                    : rows[currentImageIndex]
                }
                style={styles.mainImage}
                resizeMode="contain"
                onError={(e) =>
                  console.log('Error loading image:', e.nativeEvent.error)
                }
              />
            </TouchableOpacity>
          </ScrollView> */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailsContainer}
          >
            {rows.map((imageUri, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleThumbnailPress(index);
                  toggleFullScreen();
                }}
              >
                <Image
                  source={
                    typeof imageUri === 'string'
                      ? { uri: imageUri }
                      : imageUri
                  }
                  style={[
                    styles.thumbnail,
                    index === currentImageIndex
                      ? styles.selectedThumbnail
                      : null,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {/* Полноэкранный режим */}
      {isFullScreen && (
        <Modal visible={isFullScreen} transparent={true}>
          <ImageViewer
            imageUrls={imageUrls}
            index={currentImageIndex}
            onSwipeDown={toggleFullScreen} // Закрытие при свайпе вниз
            enableSwipeDown={true}
            onChange={(index) => {
              if (index !== null) setCurrentImageIndex(index);
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={toggleFullScreen}
          >
            <View style={styles.closeButtonInner} />
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  scrollView: {
    width: '100%',
    height: 300,
  },
  mainImage: {
    flex: 1,
    height: '100%',
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
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonInner: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageGallery;