import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductSales } from '../../store/redux/selectors/products';
import {
  setSearchString,
  setSelectedProduct,
  setSelectedProductManageView,
  setTableOptions,
} from '../../store/redux/slices/selectedsSlice';
import InputHelper from '../../components/ManageProductsScreen/InputHelper';
import Table from '../../components/GridTable/v2/Table';
import Tally from '../../components/Tally';
import HeaderWithIcons from '../../components/GridTable/v2/HeaderWithIcons';
import Button from '../ui/Button';
import SearchPanel from '../SearchPanel';
import { createUpdateOrderItem } from '../../store/redux/thunks/orders';

const products = [
  {
    id: 1,
    name: 'Товар 1',
    description: 'Описание товара 1',
    price: 1000,
    stock: 10,
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
  },
  {
    id: 2,
    name: 'Товар 2',
    description: 'Описание товара 2',
    price: 2000,
    stock: 5,
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: 3,
    name: 'Товар 3',
    description: 'Описание товара 3',
    price: 1500,
    stock: 8,
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
  },
];

const ProductCard_1 = ({ product, onImagePress }) => {
  const [quantity, setQuantity] = useState('');

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onImagePress(product.images)}>
        <Image source={{ uri: product.images[0] }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>Цена: {product.price} ₽</Text>
      <Text style={styles.stock}>Остаток на складе: {product.stock}</Text>
      <TextInput
        style={styles.input}
        placeholder='Введите количество'
        keyboardType='numeric'
        value={quantity}
        onChangeText={setQuantity}
      />
    </View>
  );
};

const ProductCard_v2 = ({ product, onImagePress, mode, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(product.code, newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = quantity > 0 ? quantity - 1 : 0;
    setQuantity(newQuantity);
    onQuantityChange(product.code, newQuantity);
  };

  if (mode === 'three-column') {
    return (
      <View style={[styles.cardRow, styles.card]}>
        {/* Левый блок: картинка */}
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => onImagePress(product?.images)}
        >
          {/* <Image source={{ uri: product?.images[0] }} style={styles.imageRow} /> */}
        </TouchableOpacity>

        {/* Средний блок: название, описание, остаток */}
        <View style={styles.middleBlock}>
          <Text style={styles.name}>{product?.name}</Text>
          <Text style={styles.description}>{product?.description}</Text>
          <Text style={styles.stock}>Остаток: {product?.rest}</Text>
        </View>

        {/* Правый блок: поле ввода и кнопки */}
        <View style={styles.rightBlock}>
          <TextInput
            style={styles.inputRow}
            placeholder='Кол-во'
            keyboardType='numeric'
            value={quantity.toString()}
            onChangeText={(text) => {
              const newQuantity = parseInt(text) || 0;
              setQuantity(newQuantity);
              onQuantityChange(product?.code, newQuantity);
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleDecrement}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleIncrement}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Режимы "одна колонка" и "две колонки"
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => onImagePress(product?.images)}
      >
        {/* <Image source={{ uri: product?.images[0] }} style={styles.image} /> */}
      </TouchableOpacity>
      <Text style={styles.name}>{product?.name}</Text>
      <Text style={styles.description}>{product?.description}</Text>
      <Text style={styles.price}>Цена: {product?.price} ₽</Text>
      <Text style={styles.stock}>Остаток на складе: {product?.rest}</Text>
      <TextInput
        style={styles.input}
        placeholder='Введите количество'
        keyboardType='numeric'
        value={quantity.toString()}
        onChangeText={(text) => {
          const newQuantity = parseInt(text) || 0;
          setQuantity(newQuantity);
          onQuantityChange(product.id, newQuantity);
        }}
      />
    </View>
  );
};

const ProductsCardList = ({
  footer,
  rows,
  goal,
  headerColor,
  theme,
  searchable,
  hideColums = [],
}) => {
  const dispatch = useDispatch();
  const [isSingleColumn, setIsSingleColumn] = useState(true);
  const [showTableOptions, setShowTableOptions] = useState('');
  const [fontSize, setFontsize] = useState(tableOptions?.fontSize || 12);
  const productSales = useSelector(selectProductSales); //история продаж
  const [enteredSearchText, setEnteredSearchText] = useState('');
  const {
    selectedCustomer,
    selectedProduct,
    tableOptions,
    selectedProductManageView,
  } = useSelector((state) => state.selecteds);

  const handleSubmitEditing = (product, newValue) => {
    // console.log(product);
    // {"base_price": 22, "code": "ТД000151", "default_price": 29, "description": "1-5", "multiple": 24,
    // "name": "Йогурт ГЕК 0,1% клубника,персик, маракуйа пл-ст 0,100 кг.", "parentCode": "8", "price": 29,
    // "prices": {"base_price": 22, "default_price": 29}, "qty": "", "rest": "800",
    // "shortName": "Йог ГЕК 0,1% клуб-перс-марак пл-ст 0,100 кг.",
    // "specs": [{"spec": "SO-0-0-2817-0-0-2452E", "value": 25.23}, {"spec": "SO-0-0-2817-0-0-1366E", "value": 22}],
    // "unit": "шт"}

    //тут можно реагировать на попытку заказть товар без остатка
    if (goal === 'order') {
    }

    const payload = {
      ...product,
      customerCode: selectedCustomer?.code,
      customerName: selectedCustomer?.name,
      productCode: product.code,
      productName: product?.name,
      orderQty: goal === 'order' ? newValue : undefined,
      returnQty: goal === 'return' ? newValue : undefined,
      // goal,
    };

    if (goal === 'promo') {
    } else {
      // dispatch(findAndUpdateOrderRow(payload));
      dispatch(createUpdateOrderItem(payload));
    }
    dispatch(setSelectedProduct(null));
  };

  const handleImagePress = (images) => {
    // Здесь можно реализовать функционал открытия и слайд-шоу для картинок
    console.log('Открыть изображения:', images);
  };

  const handleQuantityChange = (productId, quantity) => {
    console.log(`Изменено количество для товара ${productId}: ${quantity}`);
  };

  const numColumns =
    selectedProductManageView?.mode === 'single-column'
      ? 1
      : selectedProductManageView?.mode === 'two-column'
      ? 2
      : 1;

  // console.log('rows', rows);

  return (
    <View style={styles.container}>
      <FlatList
        key={`key-${numColumns}`}
        data={rows}
        renderItem={({ item }) => (
          <ProductCard_v2
            product={item}
            onImagePress={handleImagePress}
            mode={selectedProductManageView?.mode}
            onQuantityChange={handleQuantityChange}
          />
        )}
        keyExtractor={(item) => item.code.toString()}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
      />
      {footer && footer}
    </View>
  );
};

export default ProductsCardList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#f5f5f5',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  toggleButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 6,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 10,
    padding: 10,
    // Android
    elevation: 3,
    // iOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100, // Высота карточки в режиме "три блока"
  },
  imageContainer: {
    height: 100,
    width: 100,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 6,
    marginBottom: 10,
  },
  imageRow: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  middleBlock: {
    flex: 1,
    paddingHorizontal: 10,
  },
  rightBlock: {
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  stock: {
    fontSize: 12,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
  },
  inputRow: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 5,
    fontSize: 12,
    width: 60,
    textAlign: 'center',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    padding: 5,
    marginHorizontal: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
