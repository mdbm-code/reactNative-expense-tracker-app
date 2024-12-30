const selectRegionId = (state) => state.userStore.regionId;
export const selectCustomers = (state) => {
  const regionId = 5; //selectRegionId(state); // Получаем regionId из userStore
  return state.customers.customers.filter((item) => item.region === regionId);
};
