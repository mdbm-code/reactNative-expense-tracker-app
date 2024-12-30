const selectedCustomer = (state) => state.userStore.selectedCustomer;
export const selectDebitCredit = (state) => {
  const selectedCustomerCode = 5; //selectRegionId(state); // Получаем regionId из userStore
  return state.customers.customers.filter((item) => item.region === regionId);
};
