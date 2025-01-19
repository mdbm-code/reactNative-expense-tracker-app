import { addOneOrderWithItem, updateSelectedOrderItem } from '../slices/ordersSlice';

export const createUpdateOrderItem = (row) => (dispatch, getState) => {
	const state = getState();
	const selectedOrder = state?.orders?.selectedOrder;
	// console.log('selectedOrder', selectedOrder);
	// console.log('row', row);

	if (selectedOrder?.code) {
		// console.log('update order');

		dispatch(updateSelectedOrderItem({ ...row, orderCode: selectedOrder.code }));
	} else {
		// console.log('create order');
		dispatch(addOneOrderWithItem(row));
	}
}

