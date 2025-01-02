const getSelectedManager = (state) => state.selecteds.selectedManager;
const getSelectedRotes = (state) => state.selecteds.selectedRoute;
const getCustomers = (state, managerCode, routeCode) =>
  state.customers.filter(item);

export const selectRoutePoints = (state) => {
  const customers = state.customers.catalog;
  if (!customers || !Array.isArray(customers) || customers.length === 0) {
    // console.log(`Торговые точки не загружены`);
    return `Торговые точки не загружены`;
  }

  const managerCode = getSelectedManager(state);
  if (!managerCode) {
    // console.log('Менеджер не выбран');
    return 'Менеджер не выбран';
  }

  const managerRoutes = state.routes.catalog.find(
    (item) => item.managerCode === managerCode
  );
  if (!managerRoutes) {
    // console.log(`Маршруты для выбранного менеджера ${managerCode} не найдены`);
    return `Маршруты для выбранного менеджера [${managerCode}] не найдены`;
  }

  const routeCode = getSelectedRotes(state);
  if (!routeCode) {
    // console.log('Выберите маршрут');
    return 'Выберите маршрут';
  }

  const foundRoute = managerRoutes.routes.find(
    (item) => item.routeCode === routeCode
  );

  if (!foundRoute) {
    // console.log(
    //   `Для менеджера ${managerCode} маршрут с кодом ${routeCode} не найден`
    // );
    return `Для менеджера с кодом [${managerCode}] маршрут с кодом [${routeCode}] не найден`;
  }

  // const unsortedPoints = [...foundRoute?.points];
  if (
    !foundRoute['points'] ||
    !Array.isArray(foundRoute['points']) ||
    foundRoute['points'].length === 0
  ) {
    // console.log(
    //   `Для менеджера ${managerCode} маршрут с кодом ${routeCode} пустой`
    // );
    return `Для менеджера с кодом [${managerCode}] маршрут с кодом [${routeCode}] пустой`;
  }

  const allowedCodes = [];
  const points = foundRoute['points']
    // .sort((a, b) => a.sort > b.sort)
    .map((item) => {
      allowedCodes.push(item.customerCode);
      return {
        [item.customerCode]: { sort: item.sort, visit: item.visit },
      };
    });

  return customers
    .filter((item) => allowedCodes.includes(item.code))
    .map((item) => ({
      ...item,
      visit: points[item.code]?.visit,
      sort: points[item.code]?.sort,
    }))
    .sort((a, b) => a.sort > b.sort);
};
