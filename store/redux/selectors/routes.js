import { createSelector } from 'reselect';


const getSelecteds = (state) => state.selecteds;
// const getSelectedRotes = (state) => state.selecteds.selectedRoute;
const getCustomers = (state) => state.customers.catalog;
const getRoutesCatalog = (state) => state.routes.catalog;
const getCurrentOrders = (state) => state.currentOrders.docs;



//createSelector`**: Используется для создания мемоизированного селектора.
// Он принимает массив входных селекторов и функцию,
// которая вычисляет результат на основе их значений.
//Мемоизация**: Если входные параметры не изменились, 
// `reselect` вернет кэшированный результат, предотвращая ненужные повторные рендеры.
//Оптимизация **: селектор будет возвращать один и тот же объект или массив, 
// если входные параметры не изменились, что устранит предупреждение и улучшит производительность.
export const selectCustomers = createSelector(
  [getCustomers, getSelecteds, getRoutesCatalog, getCurrentOrders],
  (customers, selecteds, routesCatalog, currentOrders) => {

    const selectedManager = selecteds?.selectedManager;
    const routeCode = selecteds?.selectedRoute;
    const searchString = selecteds?.customerSearchString;

    if (!customers || !Array.isArray(customers) || customers.length === 0) {
      return `Торговые точки не загружены`;
    }

    if (!selectedManager) {
      return 'Менеджер не выбран';
    }
    const managerCode = selectedManager?.code || selectedManager;

    const managerRoutes = routesCatalog.find(
      (item) => item.managerCode === managerCode
    );
    if (!managerRoutes) {
      return `Маршруты для выбранного менеджера [${managerCode}] не найдены`;
    }


    if (!routeCode && !searchString) {
      return 'Выберите маршрут';
    }


    let customersOrders = {};
    if (Array.isArray(currentOrders) && currentOrders.length > 0) {
      currentOrders.forEach(doc => {
        // customerWhoHasOrder.push(doc.customerCode);
        customersOrders[doc.customerCode] = doc;
      });
    }

    if (searchString) {
      return customers
        .filter(item => item.name.toLowerCase().includes(searchString.toLowerCase()))
        .map(item => ({
          ...item,
          hasOrder: !!customersOrders[item.code],
          baseTotal: customersOrders[item.code]?.baseTotal,
          total: customersOrders[item.code]?.total,
          percent: customersOrders[item.code]?.percent,
          minSum: customersOrders[item.code]?.minSum
        }));
    }

    const foundRoute = managerRoutes.routes.find(
      (item) => item.routeCode === routeCode
    );
    if (!foundRoute) {
      return `Для менеджера с кодом [${managerCode}] маршрут с кодом [${routeCode}] не найден`;
    }
    if (!Array.isArray(foundRoute['points'])) {
      return `Для менеджера с кодом [${managerCode}] маршрут с кодом [${routeCode}] пустой`;
    }

    const customersParams = {};
    const allowedCodes = [];
    foundRoute['points'].forEach((item) => {
      allowedCodes.push(item.customerCode);
      customersParams[item.customerCode] = { sort: item.sort, visit: item.visit };
    });

    // let customerWhoHasOrder = [];


    // const allowedCodes = [];
    // const points = foundRoute['points']
    //   .map((item) => {
    //     allowedCodes.push(item.customerCode);
    //     return {
    //       [item.customerCode]: { sort: item.sort, visit: item.visit },
    //     };
    //   });

    const toReturn = customers
      .filter((item) => allowedCodes.includes(item.code))
      .map((item) => ({
        code: item.code,
        payerCode: item.payerCode,
        name: item.name,
        phone: item.phone,
        price: item.price,
        region: item.region,
        address: item.address || '',
        visit: customersParams[item.code]?.visit,
        sort: customersParams[item.code]?.sort,
        hasOrder: !!customersOrders[item.code],
        baseTotal: customersOrders[item.code]?.baseTotal,
        total: customersOrders[item.code]?.total,
        percent: customersOrders[item.code]?.percent,
        minSum: customersOrders[item.code]?.minSum
      }))
      .sort((a, b) => a.sort - b.sort);

    return toReturn;
  });
