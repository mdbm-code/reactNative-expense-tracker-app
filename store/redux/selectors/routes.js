import { createSelector } from 'reselect';


const getSelectedManager = (state) => state.selecteds.selectedManager;
const getSelectedRotes = (state) => state.selecteds.selectedRoute;
const getCustomers = (state) => state.customers.catalog;
const getRoutesCatalog = (state) => state.routes.catalog;


//createSelector`**: Используется для создания мемоизированного селектора.
// Он принимает массив входных селекторов и функцию,
// которая вычисляет результат на основе их значений.
//Мемоизация**: Если входные параметры не изменились, 
// `reselect` вернет кэшированный результат, предотвращая ненужные повторные рендеры.
//Оптимизация **: селектор будет возвращать один и тот же объект или массив, 
// если входные параметры не изменились, что устранит предупреждение и улучшит производительность.
export const selectRoutePoints = createSelector(
  [getCustomers, getSelectedManager, getSelectedRotes, getRoutesCatalog],
  (customers, managerCode, routeCode, routesCatalog) => {

    if (!customers || !Array.isArray(customers) || customers.length === 0) {
      return `Торговые точки не загружены`;
    }

    if (!managerCode) {
      return 'Менеджер не выбран';
    }

    const managerRoutes = routesCatalog.find(
      (item) => item.managerCode === managerCode
    );
    if (!managerRoutes) {
      return `Маршруты для выбранного менеджера [${managerCode}] не найдены`;
    }

    if (!routeCode) {
      return 'Выберите маршрут';
    }

    const foundRoute = managerRoutes.routes.find(
      (item) => item.routeCode === routeCode
    );

    if (!foundRoute) {
      return `Для менеджера с кодом [${managerCode}] маршрут с кодом [${routeCode}] не найден`;
    }


    if (
      !foundRoute['points'] ||
      !Array.isArray(foundRoute['points']) ||
      foundRoute['points'].length === 0
    ) {
      return `Для менеджера с кодом [${managerCode}] маршрут с кодом [${routeCode}] пустой`;
    }

    const allowedCodes = [];
    const points = foundRoute['points']
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
  });
