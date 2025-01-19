import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import TableCell from './TableCell';
import { Ionicons } from '@expo/vector-icons';


function parseValue(value) {
  if (typeof value === 'string') {
    // Проверяем, является ли строка числом
    if (!isNaN(value) && value.trim() !== '') {
      return Number(value);
    }
    // Проверяем, является ли строка булевым значением
    if (value.toLowerCase() === 'true') {
      return true;
    }
    if (value.toLowerCase() === 'false') {
      return false;
    }
    // Проверяем, является ли строка 'undefined'
    if (value === 'undefined') {
      return null;
    }
  }

  // Проверяем, является ли значение undefined
  if (value === undefined) {
    return null;
  }

  // Возвращаем входящий параметр без изменений
  return value;
}

function getStyle(style, rowValues) {
  let viewStyle;
  if (style?.cond && style.cond?.key) {
    const condition = style?.cond;
    const key = style.cond?.key; //id ячейки чье значение надо смотреть
    // if (rowValues[key]) {
    const cellValue = rowValues[key];

    //условие принадлежности к списку
    if (condition?.inc && Array.isArray(condition?.inc)) {
      // console.log('rowValues[key]', cellValue);
      const conditionArray = condition.inc;
      if (conditionArray.includes(cellValue)) {
        viewStyle = condition?.iftrue;
      } else {
        if (condition?.iffalse) {
          viewStyle = condition.iffalse;
        }
      }
    }

    //условие равенства
    if (condition?.eq) {
      const conditionValue = condition.eq;
      if (typeof conditionValue === typeof cellValue) {
        if (cellValue === conditionValue) {
          viewStyle = condition?.iftrue;
        } else {
          if (condition?.iffalse) {
            viewStyle = condition.iffalse;
          }
        }
      }
    }

    //условие больше или равен
    if (condition?.gte) {
      const conditionValue = condition.gte;
      if (typeof conditionValue === typeof cellValue) {
        if (cellValue >= conditionValue) {
          viewStyle = condition?.iftrue;
        } else {
          if (condition?.iffalse) {
            viewStyle = condition.iffalse;
          }
        }
      }
    }

    //условие больше или равен
    if (condition?.gt) {
      const conditionValue = condition.gt;
      if (typeof conditionValue === typeof cellValue) {
        if (cellValue > conditionValue) {
          viewStyle = condition.iftrue;
        } else {
          if (condition?.iffalse) {
            viewStyle = condition.iffalse;
          }
        }
      }
    }
    // } else {
    //   //прислали условные стили, но ячейки с таким ключом не найдено
    // }
  } else {
    //прислали но обычные
    viewStyle = style;
  }
  return viewStyle;
}

const TableRow = ({
  rowValues,
  cells,
  isEditing,
  onEdit,
  onValueChange,
  onBlur,
  onLongPress,
  rowStyle,
}) => {
  function getComponent(cell) {
    // if (cell?.as === 'input' && isEditing) {
    //   return (
    //     <View
    //       key={index}
    //       style={[
    //         cell?.flex && styles[`flex${cell?.flex}`],
    //         !!viewStyle && viewStyle,
    //       ]}
    //     >
    //       <TableCell
    //         autoFocus={cell?.autoFocus}
    //         selected={isEditing}
    //         flex={cell?.flex}
    //         titleStyle={cell?.titleStyle}
    //         inputStyle={cell?.inputStyle}
    //         as='input'
    //         onSubmitEditing={onBlur}
    //         onBlur={onBlur}
    //         onValueChange={onValueChange}
    //       >
    //         {cell?.title}
    //       </TableCell>
    //     </View>
    //   );
    // } else {
    //   return (
    //     <TouchableOpacity
    //       key={index}
    //       onPress={() => onEdit(cell?.returnParams)}
    //       style={[
    //         cell?.flex && styles[`flex${cell?.flex}`],
    //         !!viewStyle && viewStyle,
    //       ]}
    //     >
    //       <TableCell selected={isEditing} titleStyle={cell?.titleStyle}>
    //         {cell?.title}
    //       </TableCell>
    //     </TouchableOpacity>
    //   );
    // }
  }



  function checkAutofocusCondition(rowValues, autoFocus) {
    // autoFocus: {
    //   or: [
    //     { iftrue: goal === 'return' },
    //     {
    //       cond: {
    //         key: 'autofocus',
    //         eq: true,
    //         iftrue: true,
    //         iffalse: false,
    //       }
    //     }
    //   ]
    // },
    let result = false;
    if (autoFocus?.or && Array.isArray(autoFocus.or)) {
      for (let i = 0; i < autoFocus.or.length; i++) {
        const option = autoFocus.or[i];
        //если указано явно что для всех ставим true
        if (option?.iftrue == true) {
          result = true; break;
        }

        if (option?.cond && typeof option.cond === 'object' && option.cond?.key && 'eq' in option.cond) {
          const condValue = option.cond.eq;
          const cellValue = parseValue(rowValues[option.cond.key]);
          // console.log('rowValues', rowValues);
          // console.log('condValue', condValue);
          // console.log('option.cond.key', option.cond.key, 'cellValue', cellValue);

          if ('iftrue' in option.cond && condValue === cellValue) {
            result = option.cond?.iftrue; break;
          }
          if ('iffalse' in option.cond && !condValue === cellValue) {
            result = option.cond?.iffalse; break;
          }


        }//конец блока с условием равенства
      } //обход массива условий OR
    }//конец блока сли это OR
    return result;
  }


  return (
    <View style={[styles.container, !!rowStyle && rowStyle]}>
      {cells.map((cell, index) => {

        let autoFocus = cell?.autoFocus;
        if (typeof autoFocus === 'object') {
          autoFocus = checkAutofocusCondition(rowValues, autoFocus);
        }

        let viewStyle;
        //проверка на наличие условных стилей для View ячейки
        if (cell?.viewStyle) {
          if (cell.viewStyle?.cond && cell.viewStyle.cond?.key) {
            const condition = cell.viewStyle?.cond;
            const key = cell.viewStyle.cond?.key; //id ячейки чье значение надо смотреть
            // if (rowValues[key]) {
            const cellValue = rowValues[key];

            //условие принадлежности к списку
            if (condition?.inc && Array.isArray(condition?.inc)) {
              // console.log('rowValues[key]', cellValue);
              const conditionArray = condition.inc;
              if (conditionArray.includes(cellValue)) {
                viewStyle = condition?.iftrue;
              } else {
                if (condition?.iffalse) {
                  viewStyle = condition.iffalse;
                }
              }
            }

            //условие равенства
            if (condition?.eq) {
              const conditionValue = condition.eq;
              if (typeof conditionValue === typeof cellValue) {
                if (cellValue === conditionValue) {
                  viewStyle = condition?.iftrue;
                } else {
                  if (condition?.iffalse) {
                    viewStyle = condition.iffalse;
                  }
                }
              }
            }

            //условие больше или равен
            if (condition?.gte) {
              const conditionValue = condition.gte;
              if (typeof conditionValue === typeof cellValue) {
                if (cellValue >= conditionValue) {
                  viewStyle = condition?.iftrue;
                } else {
                  if (condition?.iffalse) {
                    viewStyle = condition.iffalse;
                  }
                }
              }
            }

            //условие больше или равен
            if (condition?.gt) {
              const conditionValue = condition.gt;
              if (typeof conditionValue === typeof cellValue) {
                if (cellValue > conditionValue) {
                  viewStyle = condition.iftrue;
                } else {
                  if (condition?.iffalse) {
                    viewStyle = condition.iffalse;
                  }
                }
              }
            }
            // } else {
            //   //прислали условные стили, но ячейки с таким ключом не найдено
            // }
          } else {
            //прислали но обычные
            viewStyle = cell?.viewStyle;
          }
        } else {
          //стили не прислали
        }

        if (cell?.hidden) {
          //использую скрытые колонки для служебных значений
          return null;
        }

        if (cell?.as === 'input' && isEditing) {
          return (
            <View
              key={index}
              style={[
                cell?.flex && styles[`flex${cell?.flex}`],
                !!viewStyle && viewStyle,
              ]}
            >
              <TableCell
                autoFocus={autoFocus}
                selected={isEditing}
                flex={cell?.flex}
                titleStyle={cell?.titleStyle}
                inputStyle={cell?.inputStyle}
                as='input'
                onSubmitEditing={onBlur}
                onBlur={onBlur}
                onValueChange={onValueChange}
              >
                {cell?.title}
              </TableCell>
            </View>
          );
        } else if (cell?.as === 'icon') {
          return (
            <View key={index} style={[styles.iconContainer,
            cell?.flex && styles[`flex${cell?.flex}`],
            !!viewStyle && viewStyle,
            ]}>
              <Ionicons name={cell?.title} size={20} style={styles.icon} />
            </View>);
        } else if (cell?.as === 'component') {
          return (
            <View key={index} style={[
              cell?.flex && styles[`flex${cell?.flex}`],
              !!viewStyle && viewStyle,
            ]}>
              {cell?.title}
            </View>);
        } else {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // console.log('cell?.returnParams', cell?.returnParams);
                onEdit(cell?.returnParams);
              }}
              style={[
                cell?.flex && styles[`flex${cell?.flex}`],
                !!viewStyle && viewStyle,
              ]}
            >
              <TableCell selected={isEditing} titleStyle={cell?.titleStyle}>
                {cell?.title}
              </TableCell>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

export default TableRow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  // iconContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  icon: {
    flex: 1,
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flex4: { flex: 4 },
  flex5: { flex: 5 },
  flex6: { flex: 6 },
  flex7: { flex: 7 },
  flex8: { flex: 8 },
  flex9: { flex: 9 },
  flex10: { flex: 10 },
  flex11: { flex: 11 },
  flex12: { flex: 12 },
});
