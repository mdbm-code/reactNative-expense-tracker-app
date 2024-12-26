import { createContext, useReducer } from 'react';

const initialValue = [
  {
    id: 'e1',
    description: 'Салям-01',
    amount: 5900.41,
    date: new Date('2024-12-25'),
  },
  {
    id: 'e2',
    description: 'магазин Аленушка',
    amount: 6870.99,
    date: new Date('2024-12-20'),
  },
  {
    id: 'e3',
    description: 'Столовая-19',
    amount: 15879,
    date: new Date('2024-12-18'),
  },
  {
    id: 'e4',
    description: 'Магазин Бригантина',
    amount: 590.99,
    date: new Date('2024-12-21'),
  },
  {
    id: 'e5',
    description: 'Кафе "Матроскин"',
    amount: 1999.01,
    date: new Date('2024-12-01'),
  },
  {
    id: 'e6',
    description: 'Столовая "Татнефтехимпродукт" (санаторий)',
    amount: 750,
    date: new Date('2024-12-03'),
  },
  {
    id: 'e7',
    description: 'Магазин "У Вали" (ИП Сташевский Ж.Ы)',
    amount: 400,
    date: new Date('2024-12-08'),
  },
];

export const OrdersContext = createContext({
  data: [],
  addOrder: ({ amount, description, date }) => {},
  deleteOrder: (id) => {},
  updateOrder: (id, { amount, description, date }) => {},
});

function orderReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableOrderIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatableOrder = state[updatableOrderIndex];
      const updatedItem = { ...updatableOrder, ...action.payload.data };
      const updatedOrders = [...state];
      updatedOrders[updatableOrderIndex] = updatedItem;
      return updatedOrders;
    case 'DELETE':
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

function OrderContextProvider({ children }) {
  const [orderState, dispatch] = useReducer(orderReducer, initialValue);

  function addOrder(data) {
    dispatch({ type: 'ADD', payload: data });
  }
  function deleteOrder(id) {
    dispatch({ type: 'DELETE', payload: id });
  }
  function updateOrder(id, data) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: data } });
  }

  const value = {
    data: orderState,
    addOrder: addOrder,
    deleteOrder: deleteOrder,
    updateOrder: updateOrder,
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export default OrderContextProvider;
