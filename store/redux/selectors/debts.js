import { createSelector } from 'reselect';

const getSelectedCustomer = (state) => state.selecteds.selectedCustomer;
const getDocuments = (state) => state.debitCredit.documents;
export const selectDebitCredit = createSelector(
  [getSelectedCustomer, getDocuments],
  (selectedCustomer, documents) => {
    if (!selectedCustomer) return 'Покупатель не выбран';
    const obj = documents.find(
      (item) => item.payerCode === selectedCustomer.payerCode
    );
    // console.log('obj', obj);

    return (
      documents.find((item) => item.payerCode === selectedCustomer.payerCode) ||
      'документы взаиморасчетов отсутствуют или не загружены'
    );
  }
);
