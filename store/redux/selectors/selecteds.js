import { createSelector } from 'reselect';

const getSelectCustomer = (state) => state.selecteds.selectedCustomer;

export const getSelectedCustomer = createSelector(
	[getSelectCustomer],
	(selectedCustomer) => {
		return selectedCustomer;
	});