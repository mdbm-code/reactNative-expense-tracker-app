import { createSelector } from 'reselect';
const getSelecteds = (state) => state.selecteds;
const getCustomers = (state) => state.customers.catalog;
const getRoutesCatalog = (state) => state.routes.catalog;
const getOrders = (state) => state.orders.catalog;

function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export const getSelector_customerRouteList = () =>
  createSelector(
    [getRoutesCatalog, getSelecteds],
    (routesCatalog, selecteds) => {
      const managerCode = selecteds?.selectedManager;
      const customerCode = selecteds?.selectedCustomer?.code;

      if (!managerCode) return 'Менеджер не выбран';
      if (!customerCode) return 'Покупатель не выбран';

      const managerRoot = routesCatalog.find(
        (item) => item.managerCode === managerCode
      );
      if (!managerRoot) {
        return `Маршруты для менеджера [${managerCode}] не найдены`;
      }

      const managerRoutes = managerRoot?.routes;
      if (!Array.isArray(managerRoutes) || managerRoutes.length === 0) {
        return `Маршруты для менеджера [${managerCode}] не заполнены`;
      }

      const customerRoutes = [];
      managerRoutes.forEach((route) => {
        const pointIndex = route.points.findIndex(
          (point) => point.customerCode === customerCode
        );
        if (pointIndex !== -1) {
          customerRoutes.push(route?.routeCode);
        }
      });
      // managerRoutes.find((item) => item.routeCode === routeCode);
      const routes = managerRoutes.map((route, index) => ({
        code: route.routeCode,
        title: route?.title || `Маршрут ${route?.routeCode}`,
        checked: customerRoutes.includes(route?.routeCode),
        sort: index,
      }));

      return routes;
    }
  );

export const getSelector_selectedManagerRoutes = () =>
  createSelector(
    [getRoutesCatalog, getSelecteds],
    (routesCatalog, selecteds) => {
      const managerCode = selecteds?.selectedManager;
      if (!managerCode) return 'Менеджер не выбран';

      const managerRoot = routesCatalog.find(
        (item) => item.managerCode === managerCode
      );
      if (!managerRoot) {
        return `Маршруты для менеджера [${managerCode}] не найдены`;
      }

      const managerRoutes = managerRoot?.routes;
      if (!Array.isArray(managerRoutes) || managerRoutes.length === 0) {
        return [];
      }

      const toReturn = managerRoutes.map((route) => {
        const count = Array.isArray(route?.points) ? route.points.length : '';
        const label = route?.title || `Маршрут ${route?.routeCode}`;
        return {
          code: route.routeCode,
          value: route?.routeCode,
          title: route?.title || label,
          label: `${label} ${count > 0 ? '(' + count + ')' : ''}`,
          count: count,
        };
      });

      return toReturn;
    }
  );

export const selectCustomers = createSelector(
  [getCustomers, getSelecteds, getRoutesCatalog, getOrders],
  (customers, selecteds, routesCatalog, orders) => {
    // console.log('draftOrders', draftOrders);

    const selectedManager = selecteds?.selectedManager;
    const routeCode = selecteds?.selectedRoute;
    const searchString = selecteds?.customerSearchString;

    if (!Array.isArray(customers) || customers.length === 0) {
      return 'Торговые точки не загружены';
    }

    const managerCode = selectedManager?.code || selectedManager;
    if (!managerCode) {
      return 'Менеджер не выбран';
    }

    if (!Array.isArray(routesCatalog) || routesCatalog.length === 0) {
      return `Маршруты не загружены`;
    }

    const managerRoutes = routesCatalog.find(
      (item) => item.managerCode === managerCode
    );
    if (!managerRoutes) {
      return `Маршруты для выбранного менеджера [${managerCode}] не найдены`;
    }

    if (!routeCode && !searchString) {
      return 'Выберите маршрут';
    }

    const draftOrders = Array.isArray(orders)
      ? orders.filter((item) => isSameDate(new Date(item.date), new Date()))
      : [];

    const customersOrders = Array.isArray(draftOrders)
      ? draftOrders.reduce((acc, item) => {
          // Проверяем, существует ли массив для данного customerCode
          if (!acc[item.customerCode]) {
            acc[item.customerCode] = []; // Инициализируем массив, если его нет
          }
          acc[item.customerCode].push(item); // Добавляем элемент в массив
          return acc;
        }, {})
      : {};

    if (typeof searchString === 'string' && searchString) {
      return customers
        .filter((item) =>
          item.name.toLowerCase().includes(searchString.toLowerCase())
        )
        .map((item) => ({
          ...item,
          orders: customersOrders[item.code],
          // hasOrders: !!customersOrders[item.code],
          // baseTotal: customersOrders[item.code]?.baseTotal,
          // totalAmount: customersOrders[item.code]?.totalAmount,
          // totalReturn: customersOrders[item.code]?.totalReturn,
          // percent: customersOrders[item.code]?.percent,
          // minSum: customersOrders[item.code]?.minSum
        }));
    }

    // выбран маршрут
    const foundRoute = managerRoutes.routes.find(
      (item) => item.routeCode === routeCode
    );
    if (!foundRoute || !Array.isArray(foundRoute.points)) {
      return `Для менеджера с кодом [${managerCode}] маршрут с кодом [${routeCode}] пустой`;
    }

    const customersParams = {};
    const allowedCodes = foundRoute.points.reduce((acc, item) => {
      acc.push(item.customerCode);
      customersParams[item.customerCode] = {
        sort: item.sort,
        visit: item.visit,
      };
      return acc;
    }, []);

    const toReturn = customers
      .filter((item) => allowedCodes.includes(item.code))
      .map((item) => ({
        ...item,
        visit: customersParams[item.code]?.visit,
        sort: customersParams[item.code]?.sort,
        draftOrders: customersOrders[item.code],
      }))
      .sort((a, b) => a.sort - b.sort);

    return toReturn;
  }
);

// export const selectCustomers = createSelector(
//   [getCustomers, getSelecteds, getRoutesCatalog, getDraftOrders],
//   (customers, selecteds, routesCatalog, draftOrders) => {

//     const selectedManager = selecteds?.selectedManager;
//     const routeCode = selecteds?.selectedRoute;
//     const searchString = selecteds?.customerSearchString;

//     if (!customers || !Array.isArray(customers) || customers.length === 0) {
//       return `Торговые точки не загружены`;
//     }

//     if (!selectedManager) {
//       return 'Менеджер не выбран';
//     }
//     const managerCode = selectedManager?.code || selectedManager;

//     const managerRoutes = routesCatalog.find(
//       (item) => item.managerCode === managerCode
//     );
//     if (!managerRoutes) {
//       return `Маршруты для выбранного менеджера [${managerCode}] не найдены`;
//     }

//     if (!routeCode && !searchString) {
//       return 'Выберите маршрут';
//     }

//     let customersOrders = {};
//     if (Array.isArray(currentOrders) && currentOrders.length > 0) {
//       currentOrders.forEach(doc => {
//         // customerWhoHasOrder.push(doc.customerCode);
//         customersOrders[doc.customerCode] = doc;
//       });
//     }

//     if (searchString) {
//       return customers
//         .filter(item => item.name.toLowerCase().includes(searchString.toLowerCase()))
//         .map(item => ({
//           ...item,
//           hasOrder: !!customersOrders[item.code],
//           baseTotal: customersOrders[item.code]?.baseTotal,
//           total: customersOrders[item.code]?.total,
//           percent: customersOrders[item.code]?.percent,
//           minSum: customersOrders[item.code]?.minSum
//         }));
//     }

//     const foundRoute = managerRoutes.routes.find(
//       (item) => item.routeCode === routeCode
//     );
//     if (!foundRoute) {
//       return `Для менеджера с кодом [${managerCode}] маршрут с кодом [${routeCode}] не найден`;
//     }
//     if (!Array.isArray(foundRoute['points'])) {
//       return `Для менеджера с кодом [${managerCode}] маршрут с кодом [${routeCode}] пустой`;
//     }

//     const customersParams = {};
//     const allowedCodes = [];
//     foundRoute['points'].forEach((item) => {
//       allowedCodes.push(item.customerCode);
//       customersParams[item.customerCode] = { sort: item.sort, visit: item.visit };
//     });

//     // let customerWhoHasOrder = [];

//     // const allowedCodes = [];
//     // const points = foundRoute['points']
//     //   .map((item) => {
//     //     allowedCodes.push(item.customerCode);
//     //     return {
//     //       [item.customerCode]: { sort: item.sort, visit: item.visit },
//     //     };
//     //   });

//     const toReturn = customers
//       .filter((item) => allowedCodes.includes(item.code))
//       .map((item) => ({
//         code: item.code,
//         payerCode: item.payerCode,
//         name: item.name,
//         phone: item.phone,
//         price: item.price,
//         region: item.region,
//         address: item.address || '',
//         visit: customersParams[item.code]?.visit,
//         sort: customersParams[item.code]?.sort,
//         hasOrder: !!customersOrders[item.code],
//         baseTotal: customersOrders[item.code]?.baseTotal,
//         total: customersOrders[item.code]?.total,
//         percent: customersOrders[item.code]?.percent,
//         minSum: customersOrders[item.code]?.minSum
//       }))
//       .sort((a, b) => a.sort - b.sort);

//     return toReturn;
//   });
