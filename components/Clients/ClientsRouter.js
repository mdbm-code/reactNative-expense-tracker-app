import { StyleSheet } from 'react-native';
import Dropdown from 'react-native-input-select';
import { GlobalStyles } from '../../constans/styles';

const ClientsRouter = ({ onSelect, value, isMultiple = false }) => {
  return (
    <Dropdown
      //   label='Маршруты'
      placeholder={value}
      options={[
        { label: 'Понедельник', value: '_1' },
        { label: 'Вторник', value: '_2' },
        { label: 'Среда', value: '_3' },
        { label: 'Четверг', value: '_4' },
        { label: 'Пятница', value: '_5' },
        { label: 'Суббота', value: '_6' },
        { label: 'Воскресенье', value: '_7' },
      ]}
      selectedValue={value}
      onValueChange={(value) => onSelect(value)}
      primaryColor={'green'}
      isMultiple={isMultiple}
      //   isSearchable
      dropdownStyle={{
        borderWidth: 2, // To remove border, set borderWidth to 0
      }}
      //   dropdownIcon={
      //     <Image
      //       style={styles.tinyLogo}
      //       source={{
      //         uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
      //       }}
      //     />
      //   }
      //   dropdownIconStyle={{ top: 20, right: 20 }}
      //   listHeaderComponent={
      //     <View style={styles.customComponentContainer}>
      //       <Text style={styles.text}>
      //         💡 You can add any component to the top of this list
      //       </Text>
      //       <View style={{ flexDirection: 'row' }}>
      //         <View style={{ flex: 1 }}>
      //           <Button
      //             title='Left button'
      //             onPress={() => Alert.alert('Left button pressed')}
      //             color='#007AFF'
      //           />
      //         </View>
      //         <View style={{ flex: 1 }}>
      //           <Button
      //             style={{ flex: 1 }}
      //             title='Right button'
      //             onPress={() => Alert.alert('Right button pressed')}
      //           />{' '}
      //         </View>
      //       </View>
      //     </View>
      //   }
      //   listFooterComponent={
      //     <View style={styles.customComponentContainer}>
      //       <Text>You can add any component to the bottom of this list</Text>
      //     </View>
      //   }
      //   modalControls={{
      //     modalOptionsContainerStyle: {
      //       padding: 10,
      //       backgroundColor: 'cyan',
      //     },
      //     modalProps: {
      //       supportedOrientations: [
      //         'portrait',
      //         'portrait-upside-down',
      //         'landscape',
      //         'landscape-left',
      //         'landscape-right',
      //       ],
      //       transparent: false,
      //     },
      //   }}

      //   listComponentStyles={{
      //     listEmptyComponentStyle: {
      //       color: 'red',
      //     },
      //     itemSeparatorStyle: {
      //       opacity: 0,
      //       borderColor: 'white',
      //       borderWidth: 2,
      //       backgroundColor: 'cyan',
      //     },
      //     sectionHeaderStyle: {
      //       padding: 10,
      //       backgroundColor: 'cyan',
      //     },
      //   }}

      //   listControls={{
      //     selectAllText: 'Choose everything',
      //     unselectAllText: 'Remove everything',
      //     selectAllCallback: () => Alert.alert('You selected everything'),
      //     unselectAllCallback: () => Alert.alert('You removed everything'),
      //     emptyListMessage: 'No record found',
      //   }}
    />
  );
};

export default ClientsRouter;

const styles = StyleSheet.create({});