import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Image } from "native-base";

export const LeaderBoardRenderItem = ({ item }: { item: any }) => {
  return (
    <View style={styles.leaderBoardMainContainer}>
      <View style={styles.leaderboardLeftContainer}>
        <View style={{ marginLeft: RFValue(12) }}>
          {/* @ts-ignore */}
          {item.rankImage ? <Image style={styles.rankImage} src={item.rankImage} alt="" /> : <Text style={{
            paddingLeft: item.rank != 10 ? 10 : 5,
            paddingRight: item.rank != 10 ? 10 : 5,
            fontWeight: "bold",
            fontSize: 20,
            color:"white"
          }}>{item.rank}</Text>}
        </View>

        <View style={{ marginLeft: RFValue(13), marginRight: RFValue(18) }}>
          <Image style={parseInt(item.rank)>=4 ? styles.personImage2:styles.personImage} src={item.avatar} alt="" />
        </View>

        <View>
          <Text style={styles.leaderTitle}>{item.name}</Text>
        </View>
      </View>

      <View>
        <Text style={{ ...styles.leaderTitle, fontSize: RFValue(12) }}>
          {item.rankText}
        </Text>
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
    width: RFValue(25),
    height: RFValue(25),
  },
  personImage: {
    width: RFValue(17),
    height: RFValue(38),
  },
  personImage2: {
    width: RFValue(24),
    height: RFValue(24),
    borderRadius:24/2,
    marginLeft:-2,
    marginRight:-5
  },
  leaderTitle: {
    color: "#fff",
    fontSize: RFValue(15),
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
});
