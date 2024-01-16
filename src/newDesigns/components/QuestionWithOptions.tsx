import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { fontBold, fontRegular, getWidth } from '../../modules/dashboard/helpers/tabs';
import Colors from './Colors';

const QuestionWithOptions = ({ question="", options=[] , style}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderOption = ({ item , index}) => (
    <TouchableOpacity
      style={[
        styles.option,
        selectedOption === item && styles.selectedOption,
        {marginLeft: index ? getWidth(4): 0}
      ]}
      onPress={() => handleOptionSelect(item)}
    >
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container,style]}>
      <Text style={styles.question}>{question}</Text>
      <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={(item) => item.toString()}
        horizontal
        contentContainerStyle={styles.optionsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:"100%"
  },
  question: {
    ...fontBold(4, "white"),
    marginBottom: 16,
    lineHeight:getWidth(7)
  },
  optionsContainer: {
    justifyContent: 'space-around',
  },
  option: {
    paddingHorizontal: getWidth(5),
    paddingVertical: getWidth(3),
    backgroundColor: Colors.gray2_0,
    borderRadius:  getWidth(3),
  },
  selectedOption: {
    backgroundColor: Colors.lightGreen+50,
    borderWidth:2,
    borderColor: Colors.lightGreen,
  },
  optionText: {
    ...fontRegular(4, "white"),
  },
});

export default QuestionWithOptions;
