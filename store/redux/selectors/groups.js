import { createSelector } from 'reselect';

const getProducts = (state) => state.products.catalog;
const getGroups = (state) => state.groups.catalog;
const getSelecteds = (state) => state.selecteds;

export const selectGroups_v2 = createSelector(
  [getGroups, getSelecteds, getProducts],
  (groupsCatalog, selecteds, productsCatalog) => {
    const selectedCustomer = selecteds.selectedCustomer;
    if (!selectedCustomer) return 'Покупатель не выбран';

    const hasMatrix = Array.isArray(selectedCustomer?.matrix) && selectedCustomer.matrix.length > 0;

    let catalog = groupsCatalog;

    if (hasMatrix) {
      const matrixSet = new Set(selectedCustomer.matrix); //избавляемся от дублеров в матрице
      const matrixGroupsCodes = new Set(
        productsCatalog
          .filter((item) => matrixSet.has(item.code)) //только товары чей код вошел в матрицу
          .map((item) => item.parentCode) //возвращаем коды родительских групп у товаров, входящих в матрицу
      );

      //сформируем рабочий массив с группами, в которых хоть один товар входит в матрицу
      catalog = groupsCatalog.filter(
        (item) => matrixGroupsCodes.has(item.code) || item.parent === ''
      );
    }

    const selectedCode = selecteds.selectedProductMenu?.code;

    // Группируем каталог и на выходе получаем 
    const groupedCatalog = catalog.reduce(
      (acc, item) => {
        if (item.parent === '') {
          acc.parents.push(item);
        } else {
          acc.children[item.parent] = acc.children[item.parent] || [];
          acc.children[item.parent].push(item);
        }
        return acc;
      },
      { parents: [], children: {} }
    );

    // console.log('groupedCatalog', groupedCatalog);


    // Маппинг первого уровня
    const mapped = groupedCatalog.parents.map((item) => ({
      ...item,
      level: 1,
      children: (groupedCatalog.children[item.code] || [])
        .map((child) => (selectedCode === child.code ? { ...child, level: 2, selected: true } : { ...child, level: 2 }))
        .sort((a, b) => a.sort - b.sort),
    }));

    // Добавляем "Популярные товары"
    const finalMenu = addPopularProductsMenu(mapped, selectedCode);

    // Если есть матрица, фильтруем пустые группы
    return hasMatrix ? finalMenu.filter((item) => item.children.length > 0 || item.code === 'pop') : finalMenu;
  }
);

// Вспомогательная функция для добавления "Популярных товаров"
const addPopularProductsMenu = (menu, selectedCode) => {
  menu.push({
    code: 'pop',
    name: 'Популярные',
    level: 1,
    sort: 0,
    childfree: true,
    selected: selectedCode === 'pop' || !selectedCode,
  });
  menu.push({
    code: 'spec',
    name: 'Спец.задача',
    level: 1,
    sort: 0,
    childfree: true,
    selected: selectedCode === 'spec' || !selectedCode,
  });
  return menu.sort((a, b) => a.sort - b.sort);
};

export const selectGroups = createSelector(
  [getGroups, getSelecteds, getProducts],
  (groupsCatalog, selecteds, productsCatalog) => {
    // const selectedProductMenu = selecteds.selectedProductMenu;
    const selectedCustomer = selecteds.selectedCustomer;
    if (!selectedCustomer) return 'Покупатель не выбран';
    let catalog;
    let isMatrix = false;

    //Если у текущего покупателя есть матрица товаров
    if (
      selectedCustomer?.matrix &&
      Array.isArray(selectedCustomer.matrix) &&
      selectedCustomer.matrix.length > 0
    ) {
      //у данного клиента есть матрица товаров
      isMatrix = true;
      //соберем массив родителей товаров из матрицы для фильтрации
      const matrixGroupsCodes = productsCatalog
        .filter((item) => selectedCustomer.matrix.includes(item.code)) //только товары, входящие в матрицу текущего клиента
        .map((item) => item.parentCode); //возвращаем коды родительских групп у товаров, входящих в матрицу текущего клиента

      //пройдемся фильтром по группам второго уровня 
      //и исключим те из них, которые не содержат товаров входящих в матрицу клиента
      catalog = groupsCatalog.filter(
        (item) => matrixGroupsCodes.includes(item.code) || item.parent === ''
      );
    } else {
      catalog = groupsCatalog;
    }

    //возможно пользователь кликнул на пункт меню второго уровня
    //получим код группы, на которую он мог кликнуть
    const selectedCode = selecteds.selectedProductMenu?.code;


    const mapped = catalog
      .filter((item) => item.parent === '') //только группы без родителя (первый уровень)
      // .sort((a, b) => a.sort - b.sort)
      .map((item) => ({
        ...item,
        children: catalog
          .filter((child) => child.parent === item.code) //массив групп второго уровня, у которых родитель item.code
          .map((child) => ({ ...child, selected: selectedCode === child.code }))
          .sort((a, b) => a.sort - b.sort),
      }));

    //добавим пункт меню  для популярных товаров
    mapped.push({
      code: 'pop',
      name: 'Популярные товары',
      level: 1,
      sort: 0,
      selected: selectedCode === 'pop' || !selectedCode,
    }).sort((a, b) => a.sort - b.sort);

    if (isMatrix) {
      return mapped.filter((item) => item.children.length > 0);
    } else {
      return mapped;
    }
  }
);
