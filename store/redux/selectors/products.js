import { createSelector } from 'reselect';

const getSelecteds = (state) => state.selecteds;
const getProducts = (state) => state.products.catalog;
const getCurrentOrders = (state) => state.currentOrders.rows;
const getSales = (state) => state.sales.catalog;



function exponentialSmoothing(data, alpha) {

  if (data.length === 0) {
    return 0;
  }

  //alpha: коэффициент сглаживания, который должен быть в диапазоне от 0 до 1.
  // Чем ближе alpha к 1, тем больше вес будет у последних значений.
  if (alpha < 0 || alpha > 1) {
    return 0;
  }

  // Начальное значение для сглаженного ряда
  let smoothedValue = data[0];

  // Применяем экспоненциальное сглаживание
  for (let i = 1; i < data.length; i++) {
    smoothedValue = alpha * data[i] + (1 - alpha) * smoothedValue;
  }

  // Возвращаем прогноз следующего значения
  return smoothedValue;
}


function calculatePrediction(amounts, ignorNegativeValue, method, maxLength) {
  // Преобразуем строку amounts в массив чисел
  const values = amounts.split('|').map(Number);

  // Фильтруем отрицательные значения, если это необходимо
  const filteredValues = ignorNegativeValue ? values.filter(value => value >= 0) : values;

  // Ограничиваем количество возвращаемых значений
  const limitedValues = filteredValues.slice(0, maxLength);

  let result;

  if (limitedValues.length === 1) {
    // Ваши дальнейшие вычисления с limitedValues
    result = limitedValues[0]; // Пример, как можно использовать
  } else {
    // Обработка случая, когда больше одного значения
    // Например, можно использовать метод для вычислений
    switch (method) {
      case 'linear':
        // Линейный метод: просто берем среднее значение
        result = filteredValues.reduce((sum, value) => sum + value, 0) / filteredValues.length;
        break;

      case 'progressive':
        // Прогрессивный метод: например, сумма с учетом весов (индексы)
        result = filteredValues.reduce((sum, value, index) => sum + value * (index + 1), 0) / filteredValues.length;
        break;
      case 'exponential':
        result = exponentialSmoothing(filteredValues, 0.5); //0.5 -  Коэффициент сглаживания
        break;

      default:
        result = limitedValues; // Возвращаем массив, если метод не распознан
    }
  }

  const forecast = Math.ceil(result);
  // Рассчитываем прирост
  const minIncrease = 1; // Минимальное увеличение
  const percentageIncrease = Math.ceil(forecast * 0.05); // Увеличение на 5%
  const increased = forecast + Math.max(minIncrease, percentageIncrease);

  return {
    values: limitedValues,
    forecast: Math.ceil(result),
    increased: increased
  };
}



export const selectProductSales = createSelector(
  [getSelecteds, getSales],
  (selecteds, sales) => {
    const selectedCustomer = selecteds.selectedCustomer;
    // console.log('_customerCode', selectedCustomer?.code);
    const selectedProduct = selecteds.selectedProduct;
    // console.log('_selectedProduct', selectedProduct);

    // console.log('_sales', sales);

    if (!selectedCustomer) return [];
    if (!selectedProduct) return [];
    if (Array.isArray(sales) && sales.length > 0) {
      const customerSales = sales.find((sale) => sale.customerCode === selectedCustomer?.code);
      // console.log('_customerSales', customerSales);
      if (Array.isArray(customerSales?.sales) && customerSales.sales.length > 0) {
        const productSales = customerSales.sales.find((sale) => sale.productCode === selectedProduct?.code);
        // console.log('_productSales', productSales, selectedCustomer?.code);

        const amounts = productSales?.amounts;
        // console.log('_amounts', amounts);
        if (typeof amounts === 'string' && amounts.length > 0) {
          return calculatePrediction(amounts, true, 'linear', 5);
        }
      }
    }
    return [];
  },
);

export const selectProducts = createSelector(
  [getSelecteds, getProducts, getCurrentOrders, getSales],
  (selecteds, productsCatalog, currentOrders, sales) => {
    // console.log('selectProducts');

    try {
      const selectedMenuLevel_2 = selecteds?.selectedMenuLevel_2;
      const selectedCustomer = selecteds?.selectedCustomer;
      const searchString = selecteds?.searchString?.toLowerCase();

      if (!selectedCustomer) return 'Покупатель не выбран';
      // console.log('selectedCustomer', selectedCustomer);
      // { "address": "423443, РТ, Альметьевский р-н, с.Бишмунча, ул.Советская, д.107",
      // "code": "ТД005498",  "hasOrder": true, "name": "Венера ИП Галиева В.М.",
      // "payerCode": "00005593",  "phone": "", "region": "95", "sort": 3, "visit": 1 }

      if (Array.isArray(productsCatalog) && productsCatalog.length > 0) {
        let productsQty = {}; //объект в котором будем хранить ключ-значение, где ключ-это код товара, а значение - количество
        if (Array.isArray(currentOrders) && currentOrders.length > 0) {
          //Если есть неотправленные заявки, то присоединяем к товарам информацию о количестве заявки
          const rows = currentOrders.filter(
            (row) => row.customerCode === selectedCustomer.code
          );
          if (rows && Array.isArray(rows) && rows.length > 0) {
            rows.forEach((row) => {
              productsQty[row.productCode] = row.qty;
            });
            // console.log('productsQty', productsQty);
          }
        }

        let catalog;
        if (
          selectedCustomer?.matrix &&
          Array.isArray(selectedCustomer.matrix) &&
          selectedCustomer.matrix.length > 0
        ) {
          // console.log('selectedCustomer.matrix.length', selectedCustomer.matrix.length);
          //если у выбранного клиента есть строгая матрица разрешенных к отгрузке товаров
          //фильтруем каталог товаров исходя из матрицы
          catalog = productsCatalog.filter((product) =>
            selectedCustomer.matrix.includes(product.code)
          );
        } else {
          catalog = productsCatalog;
        }

        if (
          typeof searchString === 'string' &&
          searchString.trim().length > 0
        ) {
          catalog = catalog.filter((product) =>
            product.name.toLowerCase().includes(searchString)
          );
        } else if (selectedMenuLevel_2) {
          catalog = catalog.filter(
            (product) => product.parentCode === selectedMenuLevel_2?.code
          ); //выводим товары выбранной группы
        } else {
          //Если пользователь не выбрал группу при подборе товаров, то выведем ему список самых популярных товаров
          const topSalesProductCodes = [];
          const customerSales = sales.find(
            (sale) => sale.customerCode === selectedCustomer.code
          );
          // console.log(`customer ${selectedCustomer.code} sales`, filteredSales);
          if (
            Array.isArray(customerSales?.sales) &&
            customerSales.sales.length > 0
          ) {
            customerSales.sales.map((row) => {
              // console.log('row', row);
              topSalesProductCodes.push(row.productCode);
            });
          }
          // console.log('sales codes', topSalesProductCodes);
          if (topSalesProductCodes.length > 0) {
            catalog = catalog.filter((item) =>
              topSalesProductCodes.includes(item.code)
            );
          } else {
            //либо показываем все товары, либо просим выбрать группу
            return 'Выберите группу товаров';
          }
        }

        let toReturn = catalog.map((item) => {
          let customerPrice = '';

          //item =  {"base_price": 23.24, "code": "ТД000146", "description": "1-5", "multiple": 24,
          // "name": "Йогурт ГЕК 7,5% клубника,персик,маракуйа пл-ст 0,100 кг.", "parentCode": "8",
          // "prices": [{"price": "6", "value": 39.73}, {"price": "4", "value": 38.36}, {"price": "329", "value": 34.25}],
          // "shortName": "Йог ГЕК 7,5% клуб-перс-марак пл-ст 0,100 кг.",
          // "specs": [
          // 		{"spec": "SO-0-0-2817-0-0-1814314E", "value": 36.25},
          // 		{"spec": "SO-0-0-2817-0-0-1128389E", "value": 33.11}
          // ], "unit": "шт"}

          if (
            selectedCustomer?.spec &&
            Array.isArray(item?.specs) &&
            item.specs.length > 0
          ) {
            //у покупателя есть документ-спецификация цен и это приоритетнее
            // item.specs: [
            // 		{"spec": "SO-0-0-2817-0-0-1814314E", "value": 36.25},
            // 		{"spec": "SO-0-0-2817-0-0-1128389E", "value": 33.11}
            // ]
            customerPrice =
              item.specs.find((item) => item.spec === selectedCustomer.spec)
                ?.value || '';
          }

          if (
            customerPrice === '' &&
            selectedCustomer?.price &&
            Array.isArray(item?.prices) &&
            item.prices.length > 0
          ) {
            //если цена всё ещё не найдена, то ищем в типе цен клиента
            // console.log('selectedCustomer?.price', selectedCustomer.price);
            // console.log('item.prices', item.prices);

            customerPrice =
              item.prices.find((item) => item.price === selectedCustomer.price)
                ?.value || '';
            // console.log('customerPrice', customerPrice);
          }

          return {
            ...item,
            price: customerPrice,
            default_price: customerPrice,
            prices: {
              default_price: customerPrice,
              base_price: item.base_price,
            },
            qty: productsQty[item.code] || '',
          };
        });

        // console.log('toReturn', toReturn);
        return toReturn;
      }
      return 'Товары не загружены';
    } catch (error) {
      console.log('selectProducts = createSelector():', error);
    }
  }
);
