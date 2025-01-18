import { createSelector } from 'reselect';
// import { getFormattedDate } from '../../../util/date';

// const getSelectedCustomer = (state) => state.selecteds.selectedCustomer;
const getProducts = (state) => state.products.catalog;
// const getCurrentOrders = (state) => state.currentOrders.rows;
// const getCurrentReturns = (state) => state.currentOrders.returnRows;
// const getCurrentDocs = (state) => state.currentOrders.docs;
// const getDocuments = (state) => state.documents.catalog;
const getOrders = (state) => state.orders;



export const getSelector_customerOrder = (query) => createSelector(
  [getProducts, getOrders],
  (productsCatalog, orders) => {

    if (!query?.customerCode) return 'Покупатель не выбран';
    if (!query?.stateName) return 'Имя таблицы (draft или confirmed) не указано';
    if (!['draft', 'confirmed'].includes(query?.stateName)) return `Указанное имя таблицы [${query?.from}] не найдено`;
    if (!query?.typeQty) return 'Тип данных (return или order) не указан';
    if (!['return', 'order'].includes(query?.typeQty)) return `Указанное тип данных [${query?.typeQty}] не найден`;

    const customerCode = query.customerCode;
    const orderList = orders[`${query.stateName}Orders`];

    if (!Array.isArray(orderList) || orderList.length === 0) {
      return []; // Если заказы не найдены, возвращаем пустой массив
    }

    const orderIndex = orderList.findIndex(item => item.customerCode === customerCode);
    if (orderIndex === -1) {
      return []; // Заявка для указанного покупателя не найдена;
    }

    const rows = orderList[orderIndex]?.items || [];
    if (!Array.isArray(rows) || rows.length === 0) {
      return []; //  'Нет товаров в заказе';
    }

    const productsCodes = rows
      .filter(row => row[`${query.typeQty}Qty`]) // Фильтруем товары с не нулевым количеством
      .map(row => row.productCode); // Получаем коды товаров

    const rowData = rows.reduce((acc, row) => {
      acc[row.productCode] = { qty: row[`${query.typeQty}Qty`], price: row.price };
      return acc;
    }, {});

    const toReturn = productsCatalog
      .filter(product => productsCodes.includes(product.code))
      .map(product => ({
        code: product.code,
        name: product.name,
        unit: product.unit,
        qty: rowData[product.code]?.qty,
        price: rowData[product.code]?.price,
        base_price: product?.base_price,
      }));

    return toReturn.length > 0 ? toReturn : 'Товары не загружены';
  }
);

export const selectManyOrdersForCustomer = createSelector(
  [getOrders, (state, query) => query],
  (orders, query) => {

    if (!query?.customerCode) return 'Покупатель не выбран';
    if (!query?.from) return 'Имя таблицы (draft или confirmed) не указано';
    if (!['draft', 'confirmed'].includes(query?.from)) return `Указанное имя таблицы [${query?.from}] не найдено`;
    if (!query?.by) return 'Тип данных (return или order) не указан';
    if (!['return', 'order'].includes(query?.by)) return `Указанное тип данных [${query?.by}] не найден`;

    const pageNumber = Number(query?.page) || 1;
    const itemsPerPage = Number(orders?.settings.itemsPerPage) || 10;
    const customerCode = query.customerCode;
    const orderList = orders[`${query.from}Orders`];

    if (!Array.isArray(orderList) || orderList.length === 0) {
      return []; // Если заказы не найдены, возвращаем пустой массив
    }

    const customerOrders = orderList.filter(item => item.customerCode === customerCode);
    if (customerOrders.length === 0) {
      return []; // Заявка для указанного покупателя не найдена;
    }

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, customerOrders.length - 1);

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