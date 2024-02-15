import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Colors from './Colors';
import {
  fontBold,
  fontRegular,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';

const DropdownComponent = ({
  containerStyle,
  data = [],
  labelTitle = '',
  onSelectValue,
  errorMessage,
}) => {
  const [value, setValue] = useState(null);

  return (
    <View style={containerStyle}>
      <Text style={[fontBold(4), {marginBottom: getWidth(2)}]} color="white">
        {labelTitle}
      </Text>
      <View style={[styles.container]}>
        <Dropdown
          style={[styles.dropdown]}
          itemContainerStyle={styles.itemContainerStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          // itemTextStyle={fontRegular(3.5, "white")}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={getWidth(80)}
          labelField="label"
          valueField="value"
          placeholder={'Select item'}
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value);
            if (onSelectValue) {
              onSelectValue(item.value);
            }
          }}
        />
      </View>
      {errorMessage && (
        <Text style={{color: 'red', marginTop: 5, paddingHorizontal:10}}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    borderRadius: getWidth(4),
    backgroundColor: Colors.gray2,
  },
  itemContainerStyle: {
    borderRadius: getWidth(4),
    overflow: 'hidden',
  },
  dropdown: {
    height: 50,
    backgroundColor: Colors.gray2,

    borderRadius: 8,
    paddingHorizontal: getWidth(4),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.gray2,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    ...fontRegular(4.5, Colors.gray3),
  },
  selectedTextStyle: {
    ...fontRegular(3.5, 'white'),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    ...fontRegular(3.5, Colors.gray1),
  },
});
