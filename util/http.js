import axios from 'axios';
import { FIREBASE_BACKEND_URL } from '../constans/urls';

export function storeOrder(payload) {
  axios.post(FIREBASE_BACKEND_URL + `/orders.json`, payload);
}

export async function fetchOrders() {
  const responce = await axios.get(FIREBASE_BACKEND_URL + '/orders.json');
  // console.log(responce.data);

  const orders = [];

  for (const key in responce.data) {
    const orderObj = {
      id: key,
      ...responce.data[key],
      // customerCode: responce.data[key]?.customerCode,
      // customerName: responce.data[key]?.customerName,
      // date: responce.data[key]?.date,
      // orderRows: responce.date[key]?.orderRows || [],
      // returnRows: responce.date[key]?.orderRows || [],
    };
    // console.log('orderObj', orderObj);
    orders.push(orderObj);
  }

  return orders;
}

export const uploadImageToServer = async (base64Image) => {
  try {
    const response = await axios.post('https://your-server.com/upload', {
      image: base64Image, // Отправляем строку Base64
    });

    console.log('Ответ сервера:', response.data);
  } catch (error) {
    console.error('Ошибка при загрузке изображения на сервер:', error);
  }
};
