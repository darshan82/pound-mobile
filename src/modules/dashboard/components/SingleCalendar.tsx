import React, { useState, FC } from "react";
import { View, Dimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import { RFValue } from "react-native-responsive-fontsize";
import { dateType } from "../interfaces/ProfileResponse";

const WIDTH = Dimensions.get("window").width;

export const SingleCalendar: FC<{ dates: dateType }> = ({ dates }) => {
  return (
    <View style={{ marginBottom: 8, marginTop: -4 }}>
      <Calendar
        theme={{
          arrowColor: "#fff",
          arrowStyle: { padding: 0 },
          monthTextColor: "#fff",
          textMonthFontSize: RFValue(18),
          textMonthFontWeight: "bold",
          calendarBackground: "#000",
          textSectionTitleColor: "#fff",
          textDayHeaderFontWeight: "bold",
          textSectionTitleDisabledColor: "gray",
          dayTextColor: "#fff",
          todayTextColor: "white",
          selectedDayTextColor: "white",
          selectedDayBackgroundColor: "#AEFF03",
          textDayFontSize: RFValue(15),
          textDayFontWeight: "bold",
          todayButtonTextColor: "#AEFF03",
          stylesheet: {
            calendar: {
              header: {

              }
            }
          }
        }}
        markingType={"period"}
        style={{ width: WIDTH }}
        markedDates={dates}
        hideArrows={true}
        hideExtraDays={true}
      />
    </View>
  );
};