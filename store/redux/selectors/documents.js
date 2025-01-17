import { createSelector } from 'reselect';

const getSelectedCustomer = (state) => state.selecteds.selectedCustomer;
const getDocuments = (state) => state.documents;

//функция возвращает селектор
export const getCustomerDocumentsSelector = (pageNumber) =>
  createSelector(
    [getDocuments, getSelectedCustomer],
    (documents, selectedCustomer) => {
      if (!selectedCustomer) return 'Покупатель не выбран';

      const catalog = documents?.catalog || [];
      const numberPerPage = documents?.numberPerPage || 30;
      let startIndex = 0;
      let endIndex = catalog.length - 1; // По умолчанию - все документы

      if (pageNumber && pageNumber > 0) {
        startIndex = (pageNumber - 1) * numberPerPage;
        endIndex = Math.min(startIndex + numberPerPage, catalog.length) - 1; // Ограничение по количеству документов
      }

      // Предполагается, что selectedCustomer имеет поле code
      const customerCode = selectedCustomer.code;

      const customerDocuments = catalog.filter((doc, index) =>
        doc?.customerCode === customerCode
          ? index >= startIndex && index <= endIndex
          : false
      );

      return customerDocuments;
    }
  );

// Оператор нулевого слияния (??):

// Оператор ?? возвращает правый операнд, только если левый операнд равен null или undefined. То есть:
// Если allDocuments?.catalog имеет значение null или undefined, то catalog будет присвоен [].
// Если allDocuments?.catalog имеет любое другое значение (включая 0, false, '', NaN), то catalog получит это значение.

// Логический оператор ИЛИ (||):

// Оператор || возвращает правый операнд, если левый операнд является "ложным" значением (falsy).
// К "ложным" значениям в JavaScript относятся: false, 0, '' (пустая строка), null, undefined, и NaN.
// Поэтому, если значение allDocuments?.catalog равно 0, '', или false, то catalog также будет присвоен [].
