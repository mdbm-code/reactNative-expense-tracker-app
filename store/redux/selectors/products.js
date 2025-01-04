
import { createSelector } from 'reselect';

const getSelectedCustomer = (state) => state.selecteds.selectedCustomer;
const getSelectedGroup = (state) => state.selecteds.selectedMenuLevel_2;
const getProducts = (state) => state.products.catalog;
const getCurrentOrders = (state) => state.currentOrders.rows;

export const selectProducts = createSelector(
	[getSelectedGroup, getProducts, getSelectedCustomer, getCurrentOrders],
	(selectedMenuLevel_2, productsCatalog, selectedCustomer, currentOrders) => {

		if (!selectedCustomer) return 'Покупатель не выбран';
		// console.log('selectedCustomer', selectedCustomer);


		if (Array.isArray(productsCatalog) && productsCatalog.length > 0) {
			if (selectedMenuLevel_2) {


				let productsQty = {};


				if (Array.isArray(currentOrders) && currentOrders.length > 0) {
					const rows = currentOrders.filter(row => row.customerCode === selectedCustomer.code);
					// console.log('Array.isArray(rows)', Array.isArray(rows));
					// console.log('rows.length', rows?.length);

					if (rows && Array.isArray(rows) && rows.length > 0) {
						rows.forEach(row => {
							productsQty[row.productCode] = row.qty;
						});
						// console.log('productsQty', productsQty);
					}
				}

				let catalog;
				if (selectedCustomer?.matrix && Array.isArray(selectedCustomer.matrix) && selectedCustomer.matrix.length > 0) {
					//у данного клиента есть матрица товаров
					// console.log('selectedCustomer.matrix.length', selectedCustomer.matrix.length);

					catalog = productsCatalog.filter(product => selectedCustomer.matrix.includes(product.code));
				} else {
					catalog = productsCatalog;
				}

				let toReturn = catalog.filter(product => product.parentCode === selectedMenuLevel_2)
					.map(item => {
						let customerPrice = '';

						if (selectedCustomer?.spec && Array.isArray(item?.specs) && item.specs.length > 0) {
							//у покупателя есть документ-спецификация и это приоритетнее
							customerPrice = item.specs.find(item => item.spec === selectedCustomer.spec)?.value || '';
						}

						if (customerPrice === '' && selectedCustomer?.price && Array.isArray(item?.prices) && item.prices.length > 0) {
							//если цена всё ещё не найдена, то ищем в типе цен клиента
							customerPrice = item.prices.find(item => item.price === selectedCustomer.price)?.value || '';
						}

						return { ...item, prices: { price: customerPrice }, qty: productsQty[item.code] || '' };
					});

				// console.log('toReturn', toReturn);
				return toReturn
			} else {
				return 'Выберите группу'
			}
		}
		return 'Товары не загружены';
	}
) 