import { createSelector } from 'reselect';

const getSelectedCustomer = (state) => state.selecteds.selectedCustomer;
const getProducts = (state) => state.products.catalog;
const getCurrentOrders = (state) => state.currentOrders.rows;
const getCurrentReturns = (state) => state.currentOrders.returnRows;

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
