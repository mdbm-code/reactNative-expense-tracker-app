import { createSelector } from 'reselect';
import { getFormattedDate } from '../../../util/date';

const getSelectedCustomer = (state) => state.selecteds.selectedCustomer;
const getProducts = (state) => state.products.catalog;
const getCurrentOrders = (state) => state.currentOrders.rows;
const getCurrentReturns = (state) => state.currentOrders.returnRows;
const getCurrentDocs = (state) => state.currentOrders.docs;
const getDocuments = (state) => state.documents.catalog;

export const selectOrder = createSelector(
  [getProducts, getSelectedCustomer, getCurrentOrders],
  (productsCatalog, selectedCustomer, currentOrders) => {
    if (!selectedCustomer) return 'Покупатель не выбран';

    if (Array.isArray(productsCatalog) && productsCatalog.length > 0) {
      rowData = {};
      let productsCodes = [];

      if (Array.isArray(currentOrders) && currentOrders.length > 0) {
        const rows = currentOrders.filter(
          (row) => row.customerCode === selectedCustomer.code
        );

        if (rows && Array.isArray(rows) && rows.length > 0)
          rows.forEach((row) => {
            rowData[row.productCode] = { qty: row.qty, price: row.price };
            productsCodes.push(row.productCode);
          });
      }

      const toReturn = productsCatalog
        .filter((product) => productsCodes.includes(product.code))
        .map((product) => ({
          code: product.code,
          name: product.name,
          unit: product.unit,
          qty: rowData[product.code]?.qty,
          price: rowData[product.code]?.price,
          base_price: product?.base_price,
        }));

      return toReturn;
    }
    return 'Товары не загружены';
  }
);

export const getCurrentCustomerDoc = createSelector(
  [
    getSelectedCustomer,
    getCurrentOrders,
    getCurrentReturns,
    getCurrentDocs,
    getProducts,
  ],
  (
    selectedCustomer,
    currentOrders,
    currentReturns,
    currentDocs,
    productsCatalog
  ) => {
    if (!selectedCustomer) return 'Покупатель не выбран';

    let sendDoc = {
      customerCode: selectedCustomer?.code,
      customerName: selectedCustomer?.name,
      date: getFormattedDate(),
      orderRows: [],
      returnRows: [],
    };

    const productParams = {};
    if (Array.isArray(productsCatalog) && productsCatalog.length > 0) {
      productsCatalog.forEach((product) => {
        productParams[product.code] = {
          name: product?.name,
          prices: product?.prices,
          defaultPrice: product?.defaultPrice,
        };
      });
    }

    if (Array.isArray(currentDocs) && currentDocs.length > 0) {
      const doc = currentDocs.find(
        (item) => item.customerCode === selectedCustomer.code
      );
      if (!doc) return sendDoc;

      sendDoc.code = doc?.code;
      sendDoc.total = doc?.total;
      sendDoc.baseTotal = doc?.baseTotal;
      sendDoc.percent = doc?.percent;
      sendDoc.minSum = doc?.minSum;
      sendDoc.totalReturn = doc?.totalReturn;

      if (Array.isArray(currentOrders) && currentOrders.length > 0) {
        const rows = currentOrders
          .filter((row) => row.customerCode === selectedCustomer.code)
          .map((row) => ({
            ...row,
            name: productParams[row.productCode]?.name,
          }));

        if (rows && Array.isArray(rows) && rows.length > 0) {
          sendDoc.orderRows = [...rows];
        }
      }
      if (Array.isArray(currentReturns) && currentReturns.length > 0) {
        const rows = currentReturns
          .filter((row) => row.customerCode === selectedCustomer.code)
          .map((row) => ({
            ...row,
            name: productParams[row.productCode]?.name,
          }));

        if (rows && Array.isArray(rows) && rows.length > 0) {
          sendDoc.returnRows = [...rows];
        }
      }
    }

    return sendDoc;
  }
);

export const selectReturns = createSelector(
  [getProducts, getSelectedCustomer, getCurrentReturns],
  (productsCatalog, selectedCustomer, currentReturns) => {
    if (!selectedCustomer) return 'Покупатель не выбран';

    if (Array.isArray(productsCatalog) && productsCatalog.length > 0) {
      rowData = {};
      let productsCodes = [];

      if (Array.isArray(currentReturns) && currentReturns.length > 0) {
        const rows = currentReturns.filter(
          (row) => row.customerCode === selectedCustomer.code
        );

        if (rows && Array.isArray(rows) && rows.length > 0)
          rows.forEach((row) => {
            rowData[row.productCode] = { qty: row.qty, price: row.price };
            productsCodes.push(row.productCode);
          });
      }

      const toReturn = productsCatalog
        .filter((product) => productsCodes.includes(product.code))
        .map((product) => ({
          code: product.code,
          name: product.name,
          unit: product.unit,
          qty: rowData[product.code]?.qty,
          price: rowData[product.code]?.price,
          base_price: product?.base_price,
        }));

      return toReturn;
    }
    return 'Товары не загружены';
  }
);

export const selectDocuments = createSelector([getDocuments], (documents) => {
  return documents;
});
