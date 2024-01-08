import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

export const RenderItemEarnings = ({ item }: { item: any }) =>  {
  return (
    <View>
      <View style={styles.leaderBoardMainContainer}>
        <View style={styles.leaderboardLeftContainer}>
          <View style={{ marginLeft: RFValue(12) }}>
            <Image
              style={styles.rankImage}
              source={require("../../../assets/images/p1.png")}
            />
          </View>

          <View>
            <Text style={styles.earningdate}>{item.date}</Text>
          </View>

          <View>
            <Text style={styles.leaderTitle}>{item.type}</Text>
          </View>
        </View>

        <View style={styles.numberContainer}>
          <Text style={{ ...styles.number }}>{item.change}</Text>

          <Image
            style={styles.bicon}
            source={require("../../../assets/images/coin.png")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leaderBoardText: {
    color: "#fff",
    fontSize: RFValue(27),
    fontWeight: "bold",
    marginTop: RFValue(25),
    textAlign: "center",
  },
  scroll: {
    width: RFValue(5),
    height: RFValue(130),
    position: "absolute",
    left: RFValue(7),
    top: RFValue(30),
    borderRadius: 5,
  },
  rankImage: {
    width: RFValue(28),
    height: RFValue(28),
  },
  personImage: {
    width: RFValue(17),
    height: RFValue(38),
  },
  leaderTitle: {
    color: "#fff",
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  leaderboardLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  leaderBoardMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 8,
    paddingRight: 12,
    marginTop: RFValue(10),
  },
  badge1: {
    width: 19,
    height: 32,
    marginRight: RFValue(4),
  },
  badge2: {
    width: 22,
    height: 29.72,
    marginRight: RFValue(3),
  },
  badge3: {
    width: 30,
    height: 30,
  },
  bicon: {
    width: RFValue(16),
    height: RFValue(16),
    marginLeft: RFValue(6),
  },
  numberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  earningdate: {
    fontSize: RFValue(14),
    fontWeight: "400",
    color: "#fff",
    marginLeft: RFValue(8),
    marginRight: RFValue(8),
  },
  number: {
    fontSize: RFValue(14),
    color: "#fff",
    fontWeight: "normal",
  },
});
