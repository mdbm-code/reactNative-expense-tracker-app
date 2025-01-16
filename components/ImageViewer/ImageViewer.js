import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

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
          source={{ uri: rows[currentImageIndex] }}
          style={styles.mainImage}
        />
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
              source={{ uri: imageUri }}
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
  },
  mainImage: {
    width: '100%',
    height: '100%',
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
