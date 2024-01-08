/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'native-base';
import { BarData } from '../../interfaces/ChartTypes';
import { LineChart } from 'react-native-chart-kit';
import { ChartResponse } from '../../interfaces/ChartResponse';

import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

type BarChartProps = {
  title: string;
  data: BarData[];
  raw: ChartResponse,
  bps?: number
};

export const BarChart: FC<BarChartProps> = ({ raw }) => {
  const [selectedItem, setSelectedItem] = React.useState("2");

  const renderItemProgress = ({ item }: { item: any }) => {
    const onPressItem = () => {
      setSelectedItem(item.id);
    };
    return (
      <TouchableOpacity
        style={{
          width: WIDTH / 3.3,
          height: HEIGHT * 0.2,
          borderWidth: selectedItem === item.id ? 1 : 0,
          borderColor: "#fff",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "baseline",
          backgroundColor: selectedItem === item.id ? "#0D0D0D" : "black"
        }}
        activeOpacity={0.5}
        onPress={onPressItem}
      >
        <Image
          style={{
            ...styles.streakImage,
            width: item.width,
            height: item.height,
          }}
          source={item.image}
        />

        <Text
          style={{
            fontSize: selectedItem === item.id ? RFValue(16) : RFValue(12),
            color: "#fff",
            alignSelf: "center",
            marginTop: selectedItem === item.id ? 10 : 8,
            fontWeight: selectedItem === item.id ? "bold" : "400",
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();

  return (
    <View>
      <View style={{ ...styles.seprator, marginTop: RFValue(67) }} />
      <View style={{ marginTop: RFValue(25) }}>
        {/* Progress (Monthly/Daily/Weekly) */}
        <FlatList
          bounces={false}
          horizontal
          contentContainerStyle={{ marginLeft: RFValue(25) }}
          showsHorizontalScrollIndicator={false}
          data={[
            {
              id: "1",
              image: require("../../../../assets/images/monthly.png"),
              title: "Monthly",
              width: 72,
              height: 72,
            },
            {
              id: "2",
              image: require("../../../../assets/images/daily.png"),
              title: "Daily",

              width: 72,
              height: 72,
            },
            {
              id: "3",
              image: require("../../../../assets/images/weekly.png"),
              title: "Weekly",
              width: 72,
              height: 72,
            },
          ]}
          renderItem={renderItemProgress}
          keyExtractor={(item) => item.id}
        />

        {/* Monthly Progress */}
        <View>
          {selectedItem === "1" && (
            <View>
              <View style={styles.bpsContainer}>
                <Image
                  style={styles.heart}
                  source={require("../../../../assets/images/heart.png")}
                />

                <Text style={styles.numberofbps}>{raw.current_score.bps || "X"} bps</Text>
              </View>

              <View>
                <LineChart
                  withVerticalLines={false}
                  data={{
                    labels: raw.monthly.hrv.map(v => v.date),
                    datasets: [
                      {
                        data: raw.monthly.hrv.map(v => v.score),
                        strokeWidth: 4,
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                      },
                      {
                        data: raw.monthly.strain.map(v => v.score),
                        strokeWidth: 4,
                        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                      },
                      {
                        data: raw.monthly.recovery.map(v => v.score),
                        strokeWidth: 4,
                        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                      },
                    ],
                  }}
                  width={WIDTH}
                  height={220}
                  yAxisLabel={"%"}
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    useShadowColorFromDataset: true,
                    backgroundColor: "#000",
                    backgroundGradientFrom: "#000",
                    backgroundGradientTo: "#000",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(189, 189, 189, ${opacity})`,
                    propsForDots: {
                      r: "4",
                    },
                  }}

                />
              </View>
            </View>
          )}
        </View>
        {/* Daily Progress */}
        <View>
          {selectedItem === "2" && (
            <View>
              <View style={styles.bpsContainer}>
                <Image
                  style={styles.heart}
                  source={require("../../../../assets/images/heart.png")}
                />

                <Text style={styles.numberofbps}>{raw.current_score.bps || "X"} bps</Text>
              </View>

              <View>
                <LineChart
                  withVerticalLines={false}
                  data={{
                    labels: raw.daily.hrv.map(v => v.date),
                    datasets: [
                      {
                        data: raw.daily.hrv.map(v => v.score),
                        strokeWidth: 4,
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                      },
                      {
                        data: raw.daily.strain.map(v => v.score),
                        strokeWidth: 4,
                        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                      },
                      {
                        data: raw.daily.recovery.map(v => v.score),
                        strokeWidth: 4,
                        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                      },
                    ],
                  }}
                  width={WIDTH}
                  height={220}
                  yAxisLabel={"%"}
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    useShadowColorFromDataset: true,
                    backgroundColor: "#000",
                    backgroundGradientFrom: "#000",
                    backgroundGradientTo: "#000",
                    fillShadowGradientOpacity: 0,
                    fillShadowGradientToOpacity: 0,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(189, 189, 189, ${opacity})`,
                    propsForDots: {
                      r: "4",
                    },
                  }}
                />
              </View>
            </View>
          )}
        </View>

        {/* Weekly Progress */}
        <View>
          {selectedItem === "3" && (
            <View style={{}}>
              <View style={styles.bpsContainer}>
                <Image
                  style={styles.heart}
                  source={require("../../../../assets/images/heart.png")}
                />
                <Text style={styles.numberofbps}>{raw.current_score.bps || "X"} bps</Text>
              </View>

              <View>
                <LineChart
                  withVerticalLines={false}
                  data={{
                    labels: raw.weekly.hrv.map(v => v.date),
                    datasets: [
                      {
                        data: raw.weekly.hrv.map(v => v.score),
                        strokeWidth: 4,
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                      },
                      {
                        data: raw.weekly.strain.map(v => v.score),
                        strokeWidth: 4,
                        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                      },
                      {
                        data: raw.weekly.recovery.map(v => v.score),
                        strokeWidth: 4,
                        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                      },
                    ],
                  }}
                  width={WIDTH}
                  height={220}
                  yAxisLabel={"%"}
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    useShadowColorFromDataset: true,
                    backgroundColor: "#000",
                    backgroundGradientFrom: "#000",
                    backgroundGradientTo: "#000",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(189, 189, 189, ${opacity})`,
                    propsForDots: {
                      r: "4",
                    },
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={styles.graphFooterIndicators}>
        <View style={styles.individualIndicatorContainer}>
          <View style={{ ...styles.dot, backgroundColor: "#93D012" }} />
          <Text style={styles.indicatorText}>HRV</Text>
        </View>

        <View style={styles.individualIndicatorContainer}>
          <View style={{ ...styles.dot, backgroundColor: "#FF0000" }} />
          <Text style={styles.indicatorText}>Strain</Text>
        </View>

        <View style={styles.individualIndicatorContainer}>
          <View style={{ ...styles.dot, backgroundColor: "#002FFF" }} />
          <Text style={styles.indicatorText}>Recovery</Text>
        </View>
      </View>

      <TouchableOpacity style={{
        backgroundColor: "#a9f706",
        borderRadius: 2,
        width: "40%",
        height: 30,
        marginLeft: "30%",
        paddingVertical: 3
      }} onPress={() => navigation.navigate('WearablesBoarding' as never, {} as never)}>
        <Text style={{
          fontSize: 16,
          color: "black",
          fontWeight: "bold",
          alignSelf: "center",
          textTransform: "uppercase",
          textShadowColor: 'rgba(0, 0, 0, 0.5)',
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 3,
        }}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  streakImage: {
    width: 63,
    height: 85,
    alignSelf: "center",
  },

  bpsContainer: {
    width: 110,
    height: 46,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#AEFF03",
    backgroundColor: "#4D7001",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: RFValue(25),
    marginBottom: RFValue(25),
  },
  heart: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  numberofbps: {
    fontSize: RFValue(18),
    color: "#fff",
    fontWeight: "bold",
  },
  seprator: {
    width: WIDTH - 34,
    height: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  graphFooterIndicators: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: RFValue(60),
    marginTop: 10,
    marginBottom: 30,
  },
  individualIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: RFValue(6),
  },
  indicatorText: {
    fontSize: RFValue(15),
    color: "#fff",
    fontWeight: "800"
  },
});
