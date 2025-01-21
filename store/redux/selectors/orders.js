import { createSelector } from 'reselect';
import { __round } from '../../../util/numbers';
import { filterByDateRange } from '../../../util/arrays';
// import { getFormattedDate } from '../../../util/date';
const getSelecteds = (state) => state.selecteds;
const getSelectedCustomer = (state) => state.selecteds.selectedCustomer;
const getProducts = (state) => state.products;
// const getCurrentOrders = (state) => state.currentOrders.rows;
// const getCurrentReturns = (state) => state.currentOrders.returnRows;
// const getCurrentDocs = (state) => state.currentOrders.docs;
// const getDocuments = (state) => state.documents.catalog;
const getOrders = (state) => state.orders;

export const getSelector_customerOrderList = (pageNumber, periodCode, by) =>
  createSelector(
    [getOrders, getSelectedCustomer],
    (orders, selectedCustomer) => {
      if (!by) return 'Не указан признак основного отбора'; //byCustomer, byManager
      if (
        !periodCode ||
        !['D', 'YD', 'W', 'M', 'Q', 'Y', 'A'].includes(periodCode)
      )
        return 'Не указан период'; //D - день, YD - вчера, W - неделю, M - месяц, Q-квартал, Y - год, A - все
      if (by === 'byCustomer' && !selectedCustomer)
        return 'Покупатель не выбран';

      const catalog = orders?.catalog || [];
      const numberPerPage = orders?.settings?.itemsPerPage || 30;
      let startIndex = 0;
      let endIndex = catalog.length - 1; // По умолчанию - все документы

      if (pageNumber && pageNumber > 0) {
        startIndex = (pageNumber - 1) * numberPerPage;
        endIndex = Math.min(startIndex + numberPerPage, catalog.length) - 1; // Ограничение по количеству документов
      }

      // Предполагается, что selectedCustomer имеет поле code
      const customerCode = selectedCustomer.code;
      let documents = catalog;
      if ((by = 'byCustomer')) {
        documents = catalog.filter((doc) => doc?.customerCode === customerCode);
      }

      documents = filterByDateRange(periodCode, documents);

      const pages = documents.length / numberPerPage;
      const portion = documents
        .filter((doc, index) => index >= startIndex && index <= endIndex)
        .sort((a, b) => b.date - a.date); //свежие сверху

      return {
        rows: portion,
        pages: __round(pages, 'up'),
        perPage: numberPerPage,
      };
    }
  );

export const getSelector_customerOrder = (query) =>
  createSelector([getProducts, getOrders], (products, orders) => {
    const orderCode = orders.selectedOrder?.code;
    if (!orderCode) return 'empty'; // Если заказы не найдены, возвращаем пустой массив

    if (!query?.typeQty) return 'Тип данных (return или order) не указан';
    if (!['return', 'order'].includes(query?.typeQty))
      return `Указанное тип данных [${query?.typeQty}] не найден`;
    // if (!query?.stateName) return 'Имя таблицы (draft или confirmed) не указано';
    // if (!['draft', 'confirmed'].includes(query?.stateName)) return `Указанное имя таблицы [${query?.from}] не найдено`;

    const orderList = orders?.catalog || [];
    if (!Array.isArray(orderList) || orderList.length === 0) {
      return 'empty'; // Если заказы не найдены, возвращаем пустой массив
    }

    const productsCatalog = products.catalog || [];
    const productsInventory = products.inventory || {};

    const orderIndex = orderList.findIndex((item) => item.code === orderCode);
    // const orderIndex = orderList.findIndex(item => item.customerCode === customerCode);
    if (orderIndex === -1) {
      return 'empty'; // Заявка для указанного покупателя не найдена;
    }

    const rows = orderList[orderIndex]?.items || [];
    if (!Array.isArray(rows) || rows.length === 0) {
      return 'empty'; //  'Нет товаров в заказе';
    }

    const productsCodes = rows
      .filter((row) => row[`${query.typeQty}Qty`]) // Фильтруем товары с не нулевым количеством
      .map((row) => row.productCode); // Получаем коды товаров из заявки

    const rowData = rows.reduce((acc, row) => {
      acc[row.productCode] = {
        qty: row[`${query.typeQty}Qty`],
        price: row.price,
      }; //вытягиваем из заявки коичество и цену
      return acc;
    }, {});

    const toReturn = productsCatalog
      .filter((product) => productsCodes.includes(product.code))
      .map((product) => ({
        code: product.code,
        name: product.name,
        unit: product.unit,
        qty: rowData[product.code]?.qty,
        price: rowData[product.code]?.price,
        base_price: product?.base_price,
        rest: productsInventory[product.code] || '',
      }));

    return toReturn.length > 0 ? toReturn : 'empty';
  });

export const selecteOrderData = createSelector([getOrders], (order) => {
  const selectedOrder = order?.selectedOrder;
  // console.log(selectedOrder);

  if (!selectedOrder) return;
  return {
    totalAmount: selectedOrder?.totalAmount,
    totalReturn: selectedOrder?.totalReturn,
    totalBase: selectedOrder?.totalBase,
    minSum: selectedOrder?.minSum,
  };
});
// export const getSelector_customerOrder = (query) => createSelector(
//   [getProducts, getOrders],
//   (products, orders) => {

//     const orderCode = orders.selectedOrder?.code;
//     if (!orderCode) return 'Начните подбор товаров'; // Если заказы не найдены, возвращаем пустой массив

//     if (!query?.typeQty) return 'Тип данных (return или order) не указан';
//     if (!['return', 'order'].includes(query?.typeQty)) return `Указанное тип данных [${query?.typeQty}] не найден`;
//     if (!query?.stateName) return 'Имя таблицы (draft или confirmed) не указано';
//     if (!['draft', 'confirmed'].includes(query?.stateName)) return `Указанное имя таблицы [${query?.from}] не найдено`;

//     const orderList = orders[`${query.stateName}Orders`];//хранилище заявок в слайсе (draft - в стадии набора, confirmed - отправлены на сервер)
//     if (!Array.isArray(orderList) || orderList.length === 0) {
//       return 'Начните подбор товаров'; // Если заказы не найдены, возвращаем пустой массив
//     }

//     const productsCatalog = products.catalog || [];
//     const productsInventory = products.inventory || {};

//     const orderIndex = orderList.findIndex(item => item.code === orderCode);
//     // const orderIndex = orderList.findIndex(item => item.customerCode === customerCode);
//     if (orderIndex === -1) {
//       return 'Начните подбор товаров'; // Заявка для указанного покупателя не найдена;
//     }

//     const rows = orderList[orderIndex]?.items || [];
//     if (!Array.isArray(rows) || rows.length === 0) {
//       return 'Начните подбор товаров'; //  'Нет товаров в заказе';
//     }

//     const productsCodes = rows
//       .filter(row => row[`${query.typeQty}Qty`]) // Фильтруем товары с не нулевым количеством
//       .map(row => row.productCode); // Получаем коды товаров из заявки

//     const rowData = rows.reduce((acc, row) => {
//       acc[row.productCode] = { qty: row[`${query.typeQty}Qty`], price: row.price }; //вытягиваем из заявки коичество и цену
//       return acc;
//     }, {});

//     const toReturn = productsCatalog
//       .filter(product => productsCodes.includes(product.code))
//       .map(product => ({
//         code: product.code,
//         name: product.name,
//         unit: product.unit,
//         qty: rowData[product.code]?.qty,
//         price: rowData[product.code]?.price,
//         base_price: product?.base_price,
//         rest: productsInventory[product.code] || '',
//       }));

//     return toReturn.length > 0 ? toReturn : 'Начните подбор товаров';
//   }
// );

export const selectManyOrdersForCustomer = createSelector(
  [getOrders, (state, query) => query],
  (orders, query) => {
    if (!query?.customerCode) return 'Покупатель не выбран';
    if (!query?.from) return 'Имя таблицы (draft или confirmed) не указано';
    if (!['draft', 'confirmed'].includes(query?.from))
      return `Указанное имя таблицы [${query?.from}] не найдено`;
    if (!query?.by) return 'Тип данных (return или order) не указан';
    if (!['return', 'order'].includes(query?.by))
      return `Указанное тип данных [${query?.by}] не найден`;

    const pageNumber = Number(query?.page) || 1;
    const itemsPerPage = Number(orders?.settings.itemsPerPage) || 10;
    const customerCode = query.customerCode;
    const orderList = orders[`${query.from}Orders`];

    if (!Array.isArray(orderList) || orderList.length === 0) {
      return []; // Если заказы не найдены, возвращаем пустой массив
    }

    const customerOrders = orderList.filter(
      (item) => item.customerCode === customerCode
    );
    if (customerOrders.length === 0) {
      return []; // Заявка для указанного покупателя не найдена;
    }

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = Math.min(
      startIndex + itemsPerPage,
      customerOrders.length - 1
    );

    const toReturn = customerOrders.slice(startIndex, endIndex); // Получаем нужные заказы для указанной страницы
    return toReturn; // Возвращаем массив данных, даже если пустой
  }
);

// export const selectDraftOrderWithPositiveOrderQty = createSelector(
//   [getProducts, getSelectedCustomer, getOrders],
//   (productsCatalog, selectedCustomer, orders) => {
//     if (!selectedCustomer) return 'Покупатель не выбран';
//     const draftOrders = orders.draftOrders;
//     // const confirmedOrders = orders.confirmedOrders;

//     if (Array.isArray(productsCatalog) && productsCatalog.length > 0) {
//       rowData = {};
//       let productsCodes = [];

//       if (Array.isArray(draftOrders) && draftOrders.length > 0) {
//         const orderIndex = draftOrders.findIndex(item => item.customerCode === selectedCustomer.code);
//         if (orderIndex !== -1) {
//           const rows = draftOrders[orderIndex]?.items || [];

//           rows.forEach((row) => {
//             rowData[row.productCode] = { orderQty: row.orderQty, returnQty: row.returnQty, price: row.price };
//             productsCodes.push(row.productCode);
//           });

//           const toReturn = productsCatalog
//             .filter((product) => productsCodes.includes(product.code))
//             .map((product) => ({
//               code: product.code,
//               name: product.name,
//               unit: product.unit,
//               orderQty: rowData[product.code]?.orderQty,
//               returnQty: rowData[product.code]?.returnQty,
//               price: rowData[product.code]?.price,
//               base_price: product?.base_price,
//             }));

//           return toReturn;
//         }
//         return 'Товары не загружены';
//       }
//     }
//   }
// );

// export const _selectOrder = createSelector(
//   [getProducts, getSelectedCustomer, getCurrentOrders],
//   (productsCatalog, selectedCustomer, currentOrders) => {
//     if (!selectedCustomer) return 'Покупатель не выбран';

//     if (Array.isArray(productsCatalog) && productsCatalog.length > 0) {
//       rowData = {};
//       let productsCodes = [];

//       if (Array.isArray(currentOrders) && currentOrders.length > 0) {
//         const rows = currentOrders.filter(
//           (row) =>
//             row.customerCode === selectedCustomer.code &&
//             !isNaN(row?.qty) &&
//             Number(row?.qty) > 0
//         );

//         if (rows && Array.isArray(rows) && rows.length > 0)
//           rows.forEach((row) => {
//             rowData[row.productCode] = { qty: row.qty, price: row.price };
//             productsCodes.push(row.productCode);
//           });
//       }

//       const toReturn = productsCatalog
//         .filter((product) => productsCodes.includes(product.code))
//         .map((product) => ({
//           code: product.code,
//           name: product.name,
//           unit: product.unit,
//           qty: rowData[product.code]?.qty,
//           price: rowData[product.code]?.price,
//           base_price: product?.base_price,
//         }));

//       return toReturn;
//     }
//     return 'Товары не загружены';
//   }
// );

// export const getCurrentCustomerDoc = createSelector(
//   [
//     getSelectedCustomer,
//     getCurrentOrders,
//     getCurrentReturns,
//     getCurrentDocs,
//     getProducts,
//   ],
//   (
//     selectedCustomer,
//     currentOrders,
//     currentReturns,
//     currentDocs,
//     productsCatalog
//   ) => {
//     if (!selectedCustomer) return 'Покупатель не выбран';

//     let sendDoc = {
//       customerCode: selectedCustomer?.code,
//       customerName: selectedCustomer?.name,
//       date: getFormattedDate(),
//       orderRows: [],
//       returnRows: [],
//     };

//     const productParams = {};
//     if (Array.isArray(productsCatalog) && productsCatalog.length > 0) {
//       productsCatalog.forEach((product) => {
//         productParams[product.code] = {
//           name: product?.name,
//           prices: product?.prices,
//           defaultPrice: product?.defaultPrice,
//         };
//       });
//     }

//     if (Array.isArray(currentDocs) && currentDocs.length > 0) {
//       const doc = currentDocs.find(
//         (item) => item.customerCode === selectedCustomer.code
//       );
//       if (!doc) return sendDoc;

//       sendDoc.code = doc?.code;
//       sendDoc.total = doc?.total;
//       sendDoc.baseTotal = doc?.baseTotal;
//       sendDoc.percent = doc?.percent;
//       sendDoc.minSum = doc?.minSum;
//       sendDoc.totalReturn = doc?.totalReturn;

//       if (Array.isArray(currentOrders) && currentOrders.length > 0) {
//         const rows = currentOrders
//           .filter((row) => row.customerCode === selectedCustomer.code)
//           .map((row) => ({
//             ...row,
//             name: productParams[row.productCode]?.name,
//           }));

//         if (rows && Array.isArray(rows) && rows.length > 0) {
//           sendDoc.orderRows = [...rows];
//         }
//       }
//       if (Array.isArray(currentReturns) && currentReturns.length > 0) {
//         const rows = currentReturns
//           .filter((row) => row.customerCode === selectedCustomer.code)
//           .map((row) => ({
//             ...row,
//             name: productParams[row.productCode]?.name,
//           }));

//         if (rows && Array.isArray(rows) && rows.length > 0) {
//           sendDoc.returnRows = [...rows];
//         }
//       }
//     }

//     return sendDoc;
//   }
// );

// export const selectReturns = createSelector(
//   [getProducts, getSelectedCustomer, getCurrentOrders],
//   (productsCatalog, selectedCustomer, currentOrders) => {
//     if (!selectedCustomer) return 'Покупатель не выбран';

//     console.log(
//       '/store/redux/selectors/orders.js currentOrders',
//       currentOrders
//     );

//     if (Array.isArray(productsCatalog) && productsCatalog.length > 0) {
//       rowData = {};
//       let productsCodes = [];

//       if (Array.isArray(currentOrders) && currentOrders.length > 0) {
//         const rows = currentOrders.filter(
//           (row) =>
//             row.customerCode === selectedCustomer.code &&
//             !isNaN(row?.ret) &&
//             Number(row?.ret) > 0
//         );
//         rows.forEach((row) => {
//           rowData[row.productCode] = { qty: row.ret, price: row.price };
//           productsCodes.push(row.productCode);
//         });
//       }

//       const toReturn = productsCatalog
//         .filter((product) => productsCodes.includes(product.code))
//         .map((product) => ({
//           code: product.code,
//           name: product.name,
//           unit: product.unit,
//           qty: rowData[product.code]?.qty,
//           price: rowData[product.code]?.price,
//           base_price: product?.base_price,
//         }));

//       return toReturn;
//     }
//     return 'Товары не загружены';
//   }
// );

// export const selectDocuments = createSelector([getDocuments], (documents) => {
//   return documents;
// });

// export const selectOrderWithTop = createSelector(
//   [getProducts, getSelectedCustomer, getCurrentOrders],
//   (productsCatalog, selectedCustomer, currentOrders) => {
//     if (!selectedCustomer) return 'Покупатель не выбран';

//     if (Array.isArray(productsCatalog) && productsCatalog.length > 0) {
//       rowData = {};
//       let productsCodes = [];

//       if (Array.isArray(currentOrders) && currentOrders.length > 0) {
//         const rows = currentOrders.filter(
//           (row) => row.customerCode === selectedCustomer.code
//         );

//         if (rows && Array.isArray(rows) && rows.length > 0)
//           rows.forEach((row) => {
//             rowData[row.productCode] = { qty: row.qty, price: row.price };
//             productsCodes.push(row.productCode);
//           });
//       }

//       const toReturn = productsCatalog
//         .filter((product) => productsCodes.includes(product.code))
//         .map((product) => ({
//           code: product.code,
//           name: product.name,
//           unit: product.unit,
//           qty: rowData[product.code]?.qty,
//           price: rowData[product.code]?.price,
//           base_price: product?.base_price,
//         }));

//       return toReturn;
//     }
//     return 'Товары не загружены';
//   }
// );
