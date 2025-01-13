import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tally } from '../../Tally/Tally';
import Button from '../../ui/Button';
// import InputCell from '../../ui/InputCell'
// import InputCellSimple from '../../ui/InputCellSimple'

const InputHelper = ({ values, postValue, theme, onPress }) => {
  return (
    <Tally
      position='down'
      bg={theme.style?.bg}
      color={theme.style?.bars[2]?.bg}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: 8,
          paddingVertical: 0,
        }}
      >
        {Array.isArray(values) &&
          values.map((item, index) => (
            <Button
              key={index}
              titleStyle={[
                styles.rowFooterButtonText,
                { color: theme.style?.bars[2].text },
              ]}
              style={[
                styles.rowFooterButton,
                { borderColor: theme.style?.bars[1]?.bg },
              ]}
              onPress={() => onPress(item)}
            >
              {item}
            </Button>
          ))}
        {postValue && (
          <Button
            titleStyle={[
              styles.rowFooterButtonText,
              { color: theme.style?.bars[2].text },
            ]}
            style={[
              styles.rowFooterButton,
              {
                borderColor: theme.style?.warning.main,
                backgroundColor: theme.style?.warning.light,
              },
            ]}
            onPress={() => onPress(postValue)}
          >
            {postValue}
          </Button>
        )}
      </View>
    </Tally>
  );
};

export default InputHelper;

const styles = StyleSheet.create({
  rowFooterButton: {
    // backgroundColor: 'green',
    marginHorizontal: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'green',
  },
  rowFooterButtonText: {
    fontWeight: 'bold',
  },
  rowFooterLastButton: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'blue',
  },
});
