import { createSelector } from 'reselect';

const getProducts = (state) => state.products.catalog;
const getGroups = (state) => state.groups.catalog;
const getSelecteds = (state) => state.selecteds;

export const selectGroups = createSelector(
	[getGroups, getSelecteds, getProducts],
	(groupsCatalog, selecteds, productsCatalog) => {

		const selectedCustomer = selecteds.selectedCustomer;
		if (!selectedCustomer) return 'Покупатель не выбран';
		let catalog;
		let isMatrix = false;
		if (selectedCustomer?.matrix && Array.isArray(selectedCustomer.matrix) && selectedCustomer.matrix.length > 0) {
			//у данного клиента есть матрица товаров
			isMatrix = true;
			const matrixGroupsCodes = productsCatalog
				.filter(item => selectedCustomer.matrix.includes(item.code)) //только товары, входящие в матрицу текущего клиента
				.map(item => item.parentCode);//возвращаем коды родительских групп у товаров, входящих в матрицу текущего клиента

			catalog = groupsCatalog.filter(item => matrixGroupsCodes.includes(item.code) || item.parent === '');
		} else {
			catalog = groupsCatalog;
		}


		const mapped = catalog.filter(item => item.parent === '')
			.sort((a, b) => a.sort - b.sort)
			.map(item => ({ ...item, children: catalog.filter(child => child.parent === item.code).sort((a, b) => a.sort - b.sort) }));

		if (isMatrix) {
			return mapped.filter(item => item.children.length > 0);
		} else {
			return mapped;
		}
	}
)