import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import ScrollViewCarousel from './ScrollViewCarousel';
import IconButton from './ui/IconButton';

const ModalCarousel = ({ isVisible, onClose, images }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      {/* <TouchableWithoutFeedback onPress={onClose}> */}
      <View style={styles.modalContent}>
        <IconButton onPress={onClose} name={'close'} size={36} />
        <ScrollViewCarousel images={images} />
      </View>
      {/* </TouchableWithoutFeedback> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0, // Убираем отступы, чтобы модальное окно занимало весь экран
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default ModalCarousel;
