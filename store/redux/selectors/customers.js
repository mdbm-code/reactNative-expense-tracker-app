// const selectRegionId = (state) => state.userStore.regionId;
// export const selectCustomers = (state) => {
//   const regionId = 5; //selectRegionId(state); // Получаем regionId из userStore
//   return state.customers.customers.filter((item) => item.region === regionId);
// };

// const selectedCustomer = (state) => state.selecteds.selectedCustomer;
export const getCustomerPhoto = (state) => {
  const selectedCustomer = state.selecteds.selectedCustomer;
  const array = state.customers.photos;
  let result = '';
  if (Array.isArray(array)) {
    result = array.find((item) => item.code === selectedCustomer?.code)?.uri;
  }
  return result;
};
