import React, { FC } from "react";
import { StyleSheet, View, Text ,Platform} from "react-native";
// @ts-ignore
import { BarChart, Grid } from "react-native-svg-charts";
import { LinearGradient, Defs, Stop } from "react-native-svg";
import { RFValue } from "react-native-responsive-fontsize";

const data = [
    { month: "Jan", value: 0.5 },
    { month: "Feb", value: 0.5 },
    { month: "Mar", value: 0.5 },
    { month: "Apr", value: 0.5 },
    { month: "Mar", value: 0.5 },
    { month: "Apr", value: 0.5 },
    { month: "Apr", value: 0.5 },
    { month: "Apr", value: 0.5 },
    { month: "May", value: 20 },
    { month: "Jun", value: 10 },
    { month: "Jan", value: 5 },
    { month: "Feb", value: 0.5 },
    { month: "Mar", value: 0.5 },
    { month: "Apr", value: 0.5 },
    { month: "May", value: 0.5 },
    { month: "Jun", value: 10 },
    { month: "Jun", value: 40 },
    { month: "Jun", value: 20 },
    { month: "Jun", value: 20 },
    { month: "Jun", value: 68 },
    { month: "May", value: 0.5 },
];

const Gradient = () => (
    <Defs key={"gradient"}>
        <LinearGradient id={"gradient"} x1={"0"} y1={"0%"} x2={"0"} y2={"100%"}>
            <Stop offset={"25%"} stopColor={"#FA00FF"} />
            <Stop offset={"80%"} stopColor={"#6C006F"} />
        </LinearGradient>
    </Defs>
);

export const BarGraph: FC<{ height: number }> = ({ height }) => {
    return (
        <View
            style={{
                height: height - (10 + 50 + 150 + 250 + 30 + 65 + 72 +( Platform.OS === "ios" ? 70:0)),
                flexDirection: "row",
                width: "90%",
                alignItems: "center",
                marginLeft: RFValue(5),
                alignSelf: 'center',
                marginTop: 20,
                marginRight: 20
            }}
        >
            {/* <YAxis
        data={data}
        yAccessor={({ item }) => item.value}
        contentInset={{ top: 10, bottom: 10 }}
        svg={{ fontSize: 10, fill: "gray" }}
        numberOfTicks={10}
        formatLabel={(value) => `${value}`}
        yAxisSuffix={""}
        style={{ marginRight: 5 }}
      /> */}

            <BarChart
                style={{ flex: 1, marginLeft: 10 }} // add marginLeft here
                data={data}
                numberOfTicks={5} // set number of grid lines here
                //@ts-ignore
                yAccessor={({ item }) => item.value}
                svg={{ fill: "url(#gradient)" }}
                contentInset={{ top: 10, bottom: 10 }}
                barWidth={1} // set the width of the bars here
                spacingInner={0.5} // set the space between bars here
            >
                <Grid
                    direction={Grid.Direction.HORIZONTAL}
                    svg={{
                        strokeOpacity: 0.5,
                        strokeDasharray: [2, 5],
                        stroke: "#4F4F4F",
                    }}
                />
                <Gradient />
            </BarChart>

            <View style={styles.barGraphDataXAxis}>
                <Text style={styles.garphRightText}>10,000</Text>
                <Text style={styles.garphRightText}>8,000</Text>
                <Text style={styles.garphRightText}>6,000</Text>
                <Text style={styles.garphRightText}>4,000</Text>
                <Text style={styles.garphRightText}>2,000</Text>
                <Text style={styles.garphRightText}>0</Text>
            </View>
            {/* <XAxis
        style={{ marginTop: 10 }}
        data={data}
        xAccessor={({ item }) => item.month}
        formatLabel={(value) => value}
        svg={{ fontSize: 20, fill: "000" }}
      /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    garphRightText: {
        color: "#BDBDBD",
        fontWeight: "600",
        fontSize: 12,
        marginBottom: 15,
    },
    barGraphDataXAxis: {
        marginTop: RFValue(10),
        left: RFValue(10),
    },
});
