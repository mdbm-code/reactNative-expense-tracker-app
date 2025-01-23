import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export const pickImageAndConvertToBase64 = async () => {
  try {
    // Запрашиваем разрешение на доступ к галерее
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Разрешение на доступ к галерее необходимо!');
      return;
    }

    // Открываем галерею для выбора изображения
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Преобразуем изображение в строку Base64
      const base64Image = await FileSystem.readAsStringAsync(
        result.assets[0].uri,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      console.log('Base64 Image:', base64Image); // Это строка, которую можно отправить на сервер
      return base64Image;
    }
  } catch (error) {
    console.error('Ошибка при выборе изображения:', error);
  }
};
