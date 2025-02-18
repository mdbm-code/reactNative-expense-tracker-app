import { createSelector } from 'reselect';
import {
  mainColors,
  colorShades,
  colorPalettes,
} from '../../../constans/colors';
const getStateTheme = (state) => state?.theme;

const constStyle = {
  v1: {
    light: {
      bg: '#F4F4F4', //- Подходит для основного фона приложения, создаёт нейтральную и чистую среду.
      bar: '#003366', //- Можно использовать для верхней навигационной панели и заголовков. Создаёт ощущение стабильности и доверия.
      bars: {
        1: { bg: '#00509E', text: '#FFFFFF' }, //- Этот цвет немного светлее и создаст плавный переход снизу.
        2: { bg: '#A3C4D7', text: '#000000' }, //- Мягкий и нейтральный цвет, который будет хорошо контрастировать.
        3: { bg: '#EFF3F3', text: '#000000' }, //- Очень светлый и нейтральный цвет, который создаст мягкий контраст с темно-синим.
        4: { bg: '#66B3FF', text: '#000000' }, //-- Более яркий и освежающий оттенок, который будет смотреться стильно.
        5: { bg: '#E6E6E6', text: '#000000' }, //--- Нейтральный цвет, который хорошо сочетается с темными оттенками.
      },
      drawer: {
        bg: '#F5F5F5',
        // bg: '#A3C4D7',
        listItem: {
          bg: '#A3C4D7', // Фоновый цвет для пунктов списка
          // bg: '#F5F5F5', // Фоновый цвет для пунктов списка
          bgActive: '#00509E', // Активный фон для выделенного пункта списка
          title: '#003366', // Цвет заголовка пунктов списка
          titleActive: '#FFFFFF', // Цвет заголовка активного пункта списка
        },
        header: {
          bg: '#A3C4D7',
          title: '#000000',
          button: {
            light: {
              bg: '#81C784', //(светлый зеленый) — для более мягкого вида.
              text: '#FFFFFF',
              icon: '#FFFFFF',
            },
            main: {
              bg: '#4CAF50',
              text: '#FFFFFF',
              icon: '#FFFFFF',
            },
            dark: {
              bg: '#388E3C', //— для более серьезного и насыщенного оттенка.
              text: '#FFFFFF',
              icon: '#FFFFFF',
            },
          },
        },
      },
      secondary: '4CAF50', //- Используйте этот цвет для выделения кнопок и элементов взаимодействия,
      // таких как кнопки "Вызвать Drawer" или иконки. Зеленый вызывает положительные эмоции и ассоциируется с ростом.
      text: {
        main: '#333333', //- Отлично подходит для основного текста, обеспечения читабельности на светлом фоне.
        link: '#E53935', //- Применяйте этот цвет для важных уведомлений, ошибок или акцентирования информации,
        // например, при обращении к адресам клиентов.
      },
      customerList: {
        bg: '#FFFFFF', //- Фон блока: Белый (#FFFFFF) или очень светло-серый (#FAFAFA).
        bg2: '#FAFAFA',
        accent: '#E0F7FA', // Цвет для клиентов, которые дали заявку (светло-голубой)
        title: '#003366', //- Верхняя строка (название клиента): Темно-синий (#003366).
        subtitle: '#005662', //- Нижняя строка (адрес клиента): Темно-серый (#333333) для хорошей читабельности.
        shadowColor: '#000',
        dangerBg: '#F8D7DA', // Цвет для клиентов с низкой суммой заявки (светло-желтый)
        dangerBorder: '#F5C6CB', // Цвет для клиентов с низкой суммой заявки (светло-желтый)
        dangerText: '#721C24', // Цвет для клиентов с низкой суммой заявки (светло-желтый)
        warningBg: '#FFF3CD', // Цвет для клиентов с низкой суммой заявки (светло-желтый)
        warningBorder: '#FFC107', // Цвет границы
        warningText: '#856404', // Цвет текста для предупреждения (темно-желтый)
      },
      customerRouter: {
        text: '#003366',
        border: '#007BFF',
        bg: '#007BFF',
        bg2: '#E0F7FA',
        placeholder: '#C0C0C0',
      },
      nav: {
        bg: '#003366', //- Верхняя навигационная панель: Темно-синий (#003366).
        text: '#FFFFFF', // - Текст  на верхней панели: Белый (#FFFFFF).
        activeIcon: '#FFFFFF', // Белый цвет для активных иконок
        inactiveIcon: '#B0BEC5', // - Светло-серый цвет для неактивных иконок
      },
      buttons: {
        primary: '#4CAF50', //- Кнопки "Вызвать Drawer" и иконки внизу: Ярко-зеленый (#4CAF50).
        icon: '#E53935', //- Иконки при нажатии могут менять цвет на ярко-красный (#E53935) или даже на белый, чтобы визуально подтверждать активность
        iconContainer: '#003366', // Фон для контейнера иконок
      },
      error: {
        main: '#E53935', // Ярко-красный для ошибок (уже используется в тексте ссылок)
        light: '#F8D7DA', // Светло-красный для фона ошибок (уже используется в customerList)
        dark: '#B71C1C', // Темно-красный для более насыщенных элементов ошибок
      },

      warning: {
        main: '#FFC107', // Ярко-желтый для предупреждений (уже используется в warningBorder)
        light: '#FFF3CD', // Светло-желтый для фона предупреждений (уже используется в warningBg)
        dark: '#FF8F00', // Темно-желтый для акцентов предупреждений
      },

      info: {
        main: '#2196F3', // Ярко-синий для информационных сообщений
        light: '#BBDEFB', // Светло-голубой для фона информационных сообщений
        dark: '#1565C0', // Темно-синий для акцентов информационных сообщений
      },

      success: {
        main: '#4CAF50', // Ярко-зеленый для успешных действий (уже используется в secondary)
        light: '#81C784', // Светло-зеленый для фона успешных действий (уже используется в drawer.header.button.light)
        dark: '#388E3C', // Темно-зеленый для акцентов успешных действий (уже используется в drawer.header.button.dark)
      },
    },
    dark: {
      bg: '#121212', // Темный фон для основного интерфейса
      bar: '#1E1E1E', // Темный фон для верхней панели, чуть светлее основного фона
      bars: {
        1: { bg: '#1F2933', text: '#FFFFFF' }, // Темно-серый фон с белым текстом
        2: { bg: '#374151', text: '#FFFFFF' }, // Более светлый серый для контраста
        3: { bg: '#4B5563', text: '#FFFFFF' }, // Средний серый для мягкого перехода
        4: { bg: '#2563EB', text: '#FFFFFF' }, // Ярко-синий для акцентов
        5: { bg: '#6B7280', text: '#FFFFFF' }, // Светло-серый для нейтральных элементов
      },
      drawer: {
        bg: '#1E1E1E', // Темный фон для бокового меню
        listItem: {
          bg: '#2D3748', // Темно-серый фон для пунктов списка
          bgActive: '#2563EB', // Ярко-синий для активного пункта
          title: '#E5E7EB', // Светло-серый текст
          titleActive: '#FFFFFF', // Белый текст для активного пункта
        },
        header: {
          bg: '#1F2933', // Темный фон для заголовка
          title: '#E5E7EB', // Светло-серый текст
          button: {
            light: {
              bg: '#388E3C', // Темно-зеленый для мягкого вида
              text: '#FFFFFF',
              icon: '#FFFFFF',
            },
            main: {
              bg: '#4CAF50', // Ярко-зеленый для основного действия
              text: '#FFFFFF',
              icon: '#FFFFFF',
            },
            dark: {
              bg: '#1B5E20', // Очень темно-зеленый для насыщенного вида
              text: '#FFFFFF',
              icon: '#FFFFFF',
            },
          },
        },
      },
      secondary: '#4CAF50', // Зеленый для акцентных элементов
      text: {
        main: '#E5E7EB', // Светло-серый для основного текста
        link: '#EF5350', // Ярко-красный для ссылок и акцентов
      },
      customerList: {
        bg: '#1E1E1E', // Темный фон блока
        bg2: '#2D3748', // Чуть светлее для контраста
        accent: '#2563EB', // Ярко-синий для акцентных элементов
        title: '#E5E7EB', // Светло-серый текст для заголовков
        subtitle: '#9CA3AF', // Серый текст для подзаголовков
        shadowColor: '#000', // Черный для теней
        dangerBg: '#8B0000', // Темно-красный для ошибок
        dangerBorder: '#FF6F61', // Ярко-красный для границ ошибок
        dangerText: '#FFCDD2', // Светло-красный текст для ошибок
        warningBg: '#FF8F00', // Темно-желтый для предупреждений
        warningBorder: '#FFC107', // Ярко-желтый для границ предупреждений
        warningText: '#FFF3CD', // Светло-желтый текст для предупреждений
      },
      customerRouter: {
        text: '#E5E7EB', // Светло-серый текст
        border: '#2563EB', // Ярко-синий для границ
        bg: '#1E1E1E', // Темный фон
        bg2: '#2D3748', // Чуть светлее для контраста
        placeholder: '#9CA3AF', // Серый для плейсхолдеров
      },
      nav: {
        bg: '#1E1E1E', // Темный фон для верхней панели
        text: '#FFFFFF', // Белый текст
        activeIcon: '#FFFFFF', // Белый для активных иконок
        inactiveIcon: '#9CA3AF', // Серый для неактивных иконок
      },
      buttons: {
        primary: '#4CAF50', // Зеленый для основных кнопок
        icon: '#EF5350', // Ярко-красный для иконок
        iconContainer: '#1E1E1E', // Темный фон для контейнера иконок
      },
      error: {
        main: '#EF5350', // Ярко-красный для ошибок
        light: '#FFCDD2', // Светло-красный для фона ошибок
        dark: '#B71C1C', // Темно-красный для насыщенных элементов
      },
      warning: {
        main: '#FFC107', // Ярко-желтый для предупреждений
        light: '#FFF3CD', // Светло-желтый для фона предупреждений
        dark: '#FF8F00', // Темно-желтый для акцентов
      },
      info: {
        main: '#64B5F6', // Ярко-голубой для информационных сообщений
        light: '#BBDEFB', // Светло-голубой для фона
        dark: '#1565C0', // Темно-синий для акцентов
      },
      success: {
        main: '#4CAF50', // Зеленый для успешных действий
        light: '#81C784', // Светло-зеленый для фона
        dark: '#1B5E20', // Темно-зеленый для акцентов
      },
    },
  },
};

export const getTheme = createSelector([getStateTheme], (theme) => {
  let mode = 'light';
  if (theme?.mode) {
    mode = theme?.mode;
  }
  let toReturn = {};
  toReturn['style'] = constStyle[theme.version][mode];
  return toReturn;
});

export const getThemePalette = createSelector([getStateTheme], (theme) => {
  let colors = mainColors;
  if (theme?.colors) {
    colors = theme.colors;
  }
  let palette = colorPalettes;
  if (theme?.palette) {
    palette = theme.palette;
  }
  let shades = colorShades;
  if (theme?.shades) {
    shades = theme.shades;
  }
  let mode = 'light';
  if (theme?.mode) {
    mode = theme?.mode;
  }
  let primaryColor = 'indigo';
  if (theme?.primaryColor) {
    primaryColor = theme.primaryColor;
  }
  let secondaryColor = 'indigo';
  if (theme?.secondaryColor) {
    secondaryColor = theme.secondaryColor;
  }

  // console.log('colors', colors);
  // console.log('palette', palette);
  // console.log('shades', shades);
  // console.log('mode', mode);
  // console.log('primaryColor', primaryColor);
  // console.log('secondaryColor', secondaryColor);

  let toReturn = {};

  try {
    toReturn['primary'] = {
      main: colors[primaryColor][shades[mode].primary['main']],
      light: colors[primaryColor][shades[mode].primary['light']],
      dark: colors[primaryColor][shades[mode].primary['dark']],
      contrastText: palette[mode].primary.contrastText,
    };
  } catch (error) {
    console.log('toReturn[primary]', error);
  }

  try {
    toReturn['secondary'] = {
      main: colors[secondaryColor][shades[mode].secondary['main']],
      light: colors[secondaryColor][shades[mode].secondary['light']],
      dark: colors[secondaryColor][shades[mode].secondary['dark']],
      contrastText: palette[mode].secondary.contrastText,
    };
  } catch (error) {
    console.log(
      'toReturn[secondary]',
      error,
      'secondaryColor = ',
      secondaryColor
    );
  }

  try {
    toReturn['paper'] = {
      light: colors[primaryColor][shades[mode].paper['light']],
      main: colors[primaryColor][shades[mode].paper['main']],
      dark: colors[primaryColor][shades[mode].paper['dark']],
      contrastText: palette[mode].text.primary,
    };
  } catch (error) {
    console.log('toReturn[paper]', error, 'secondaryColor = ', secondaryColor);
  }

  toReturn['mode'] = mode;
  toReturn['primaryColor'] = primaryColor;
  toReturn['secondaryColor'] = secondaryColor;

  try {
    toReturn['error'] = {
      main: palette[mode].error.main,
      light: palette[mode].error.light,
      dark: palette[mode].error.dark,
    };

    toReturn['warning'] = {
      main: palette[mode].warning.main,
      light: palette[mode].warning.light,
      dark: palette[mode].warning.dark,
    };
    toReturn['info'] = {
      main: palette[mode].info.main,
      light: palette[mode].info.light,
      dark: palette[mode].info.dark,
    };
    toReturn['success'] = {
      main: palette[mode].success.main,
      light: palette[mode].success.light,
      dark: palette[mode].success.dark,
    };
  } catch (error) {
    console.log('toReturn[error,warning,info,success]', error);
  }

  try {
    toReturn['text'] = {
      primary: palette[mode].text.primary,
      secondary: palette[mode].text.secondary,
      disabled: palette[mode].text.disabled,
      icon: palette[mode].text.icon,
    };
  } catch (error) {
    console.log('toReturn[text]', error);
  }

  try {
    toReturn['colors'] = {
      deepPurple: colors.deepPurple[500],
      indigo: colors.indigo[500],
      blue: colors.blue[500],
      teal: colors.teal[500],
      green: colors.green[500],
      red: colors.red[500],
      orange: colors.orange[500],
      yellow: colors.yellow[500],
      grey: colors.grey[500],
      brown: colors.brown[500],
      blueGrey: colors.blueGrey[500],
      pink: colors.pink[500],
      cyan: colors.cyan[500],
    };
  } catch (error) {
    console.log('toReturn[colors]', error);
  }
  try {
    if (mode === 'dark') {
      toReturn['buttons'] = {
        primary: palette[mode].buttons.primary,
        secondary: palette[mode].buttons.secondary,
        disabled: palette[mode].buttons.disabled,
      };
    } else {
      toReturn['buttons'] = {
        primary: colors[primaryColor][shades[mode].primary['main']],
        secondary: colors[secondaryColor][shades[mode].secondary['light']],
        disabled: colors[primaryColor][shades[mode].primary['dark']],
      };
    }
  } catch (error) {
    console.log('error buttons', error);
  }

  // const primaryColor = 'deepPurple';//primaryColor
  try {
    if (mode === 'dark') {
      toReturn['bg'] = {
        color: palette[mode].background.default,
        text: palette[mode].text.primary,
        active: palette[mode].text.secondary,
      };
      toReturn['bar'] = {
        color: colors[primaryColor][700],
        text: palette[mode].primary.disabledText,
        active: palette[mode].primary.contrastText,
      };
      toReturn['border'] = palette[mode].text.disabled;
      toReturn['listItem'] = {
        active: colors['grey'][600],
        disabled: colors['grey'][700],
      };
      toReturn['selectedCell'] = palette[mode].buttons.disabled;
    } else {
      toReturn['bg'] = {
        color: colors[primaryColor][900],
        text: colors[primaryColor][100],
        active: palette[mode].primary.contrastText,
      };
      toReturn['bar'] = {
        color: colors[primaryColor][700],
        text: colors[primaryColor][200],
        active: palette[mode].primary.contrastText,
      };
      toReturn['border'] = colors[primaryColor][500];
      toReturn['listItem'] = {
        active: colors[secondaryColor][600],
        disabled: colors[secondaryColor][800],
      };
      toReturn['selectedCell'] = colors[primaryColor][100];
    }
  } catch (error) {
    console.log('error border', error);
  }

  toReturn['style'] = constStyle[theme.version][mode];
  return toReturn;
});
