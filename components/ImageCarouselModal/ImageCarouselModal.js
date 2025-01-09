import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';

const { width } = Dimensions.get('window');

const ImageCarouselModal = ({ images }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const renderImage = ({ item, index }) => (
		<TouchableOpacity onPress={() => openModal(index)}>
			<Image source={{ uri: item }} style={styles.image} />
		</TouchableOpacity>
	);

	const openModal = (index) => {
		setSelectedImageIndex(index);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<View style={styles.container}>
			<Carousel
				data={images}
				renderItem={renderImage}
				sliderWidth={width}
				itemWidth={width * 0.75}
				layout={'default'}
			/>

			<Modal visible={modalVisible} transparent={true} onRequestClose={closeModal}>
				<ImageViewer
					imageUrls={images.map((img) => ({ url: img }))}
					index={selectedImageIndex}
					onSwipeDown={closeModal}
					enableSwipeDown={true}
					onCancel={closeModal}
				/>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: width * 0.75,
		height: 200,
		borderRadius: 10,
	},
});

export default ImageCarouselModal;