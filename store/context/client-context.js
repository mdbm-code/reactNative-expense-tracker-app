import { createContext, useReducer, useState } from 'react';

const initialValue = [
  {
    id: '00004274',
    name: 'Лидер ИП Мансуров Р.Р.',
    payer: 'Мансуров Р.Р.',
    address: 'Азнакаевский р-он,п.Победа, ул. Центральная, д.16',
    phone: '8-917-251-39-57',
    description: 'Мансуров Р.Р.',
    routes: ['M1', 'M5'],
    amount: 5900.41,
    date: new Date('2024-12-25'),
    balance: {
      pastDate: '2024-12-01',
      pastValue: 29066.09,
      lastDate: '2024-12-28',
      lastValue: 12477.84,
      docs: [
        {
          id: 'doc1',
          date: '2024-12-02',
          title: 'Прих.КО № ДО-009225',
          sum: 18358.17,
          type: 'in',
        },
        {
          id: 'doc2',
          date: '2024-12-04',
          title: 'Расх.накл. № ДО-9630114',
          sum: -499.11,
          type: 'in',
        },
        {
          id: 'doc3',
          date: '2024-12-04',
          title: 'Расх.накл. № ДО-9630133',
          sum: 9307.65,
          type: 'out',
        },
        {
          id: 'doc4',
          date: '2024-12-06',
          title: 'Прих.КО № ДО-009406',
          sum: 11574.14,
          type: 'in',
        },
        {
          id: 'doc5',
          date: '2024-12-11',
          title: 'Расх.накл. № ДО-9630807',
          sum: -243.49,
          type: 'in',
        },
        {
          id: 'doc6',
          date: '2024-12-11',
          title: 'Расх.накл. № ДО-9630824',
          sum: 16739.07,
          type: 'out',
        },
        {
          id: 'doc7',
          date: '2024-12-13',
          title: 'Прих.КО № ДО-009621',
          sum: 8339.01,
          type: 'in',
        },
        {
          id: 'doc8',
          date: '2024-12-18',
          title: 'Расх.накл. № ДО-9631472',
          sum: -612.05,
          type: 'in',
        },
        {
          id: 'doc9',
          date: '2024-12-18',
          title: 'Расх.накл. № ДО-9631487',
          sum: 18138.76,
          type: 'out',
        },
        {
          id: 'doc10',
          date: '2024-12-25',
          title: 'Расх.накл. № ДО-9632137',
          sum: -858.84,
          type: 'in',
        },
        {
          id: 'doc11',
          date: '2024-12-25',
          title: 'Расх.накл. № ДО-9632233',
          sum: 14588.91,
          type: 'out',
        },
        {
          id: 'doc12',
          date: '2024-12-27',
          title: 'Прих.КО № ДО-009889',
          sum: 16739.07,
          type: 'in',
        },
        {
          id: 'doc13',
          date: '2024-12-27',
          title: 'Прих.КО № ДО-009890',
          sum: 18138.76,
          type: 'in',
        },
      ],
    },
  },
  {
    id: 'e2',
    description: 'магазин Аленушка',
    routes: ['M1', 'M5'],
    amount: 6870.99,
    date: new Date('2024-12-20'),
  },
  {
    id: 'e3',
    description: 'Столовая-19',
    routes: ['M1', 'M5', 'M2', 'M3', 'M7', 'M9'],
    amount: 15879,
    date: new Date('2024-12-18'),
  },
  {
    id: 'e4',
    description: 'Магазин Бригантина',
    routes: ['M1', 'M5', 'M2', 'M3', 'M4', 'M6'],
    amount: 590.99,
    date: new Date('2024-12-21'),
  },
  {
    id: 'e5',
    description: 'Кафе "Матроскин"',
    routes: ['M1', 'M4', 'M6'],
    amount: 1999.01,
    date: new Date('2024-12-01'),
  },
  {
    id: 'e6',
    description: 'Столовая "Татнефтехимпродукт" (санаторий)',
    routes: ['M1', 'M3', 'M5'],
    amount: 750,
    date: new Date('2024-12-03'),
  },
  {
    id: 'e7',
    description: 'Магазин "У Вали" (ИП Сташевский Ж.Ы)',
    routes: ['M7'],
    amount: 400,
    date: new Date('2024-12-08'),
  },
];

export const ClientsContext = createContext({
  data: [],
  addClient: ({ amount, description, date }) => {},
  deleteClient: (id) => {},
  updateClient: (id, { amount, description, date }) => {},
  setTabIndex: (index) => {},
});

function clientReducer(state, action) {
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

function ClientContextProvider({ children }) {
  const [clientState, dispatch] = useReducer(clientReducer, initialValue);
  const [tabIndex, setIndex] = useState({});

  function addClient(data) {
    dispatch({ type: 'ADD', payload: data });
  }
  function deleteClient(id) {
    dispatch({ type: 'DELETE', payload: id });
  }
  function updateClient(id, data) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: data } });
  }

  function setTabIndex(index) {
    setIndex(index);
  }

  const value = {
    data: clientState,
    tabIndex: tabIndex,
    addClient: addClient,
    deleteClient: deleteClient,
    updateClient: updateClient,
    setTabIndex: setTabIndex,
  };

  return (
    <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
  );
}

export default ClientContextProvider;
