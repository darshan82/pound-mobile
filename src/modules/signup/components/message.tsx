import React, { FC } from 'react';
import { VStack, Avatar, Text, HStack } from 'native-base';

type MessageProps = {
    content: string,
    user?: boolean,
    name?: string,
}

export const Message: FC<MessageProps> = ({ content, user, name }) => {
    const rawWords = content.replace(/\n/g, " ---nn--- ").split(/\s+/);
    const sen: string[][] = [[]];

    let ind = 0;

    for (let i = 0; i < rawWords.length; i++) {
        if (rawWords[i] !== "---nn---") sen[ind].push(rawWords[i]);
        else sen[++ind] = [];
    }

    return (
        <VStack style={{
            marginLeft: 5,
            marginBottom: 20,
            backgroundColor: "#000000",
            width: '95%',
            overflow: 'hidden',
            paddingBottom: 10,
            borderRadius: 5
        }}>
            <HStack style={{
                padding: 10
            }}>
                <Avatar
                    size={'sm'}
                    source={
                        user ? require("../../../assets/images/default.jpg") : require("../../../assets/images/oracle.png")
                    }
                />
                <Text style={{
                    fontSize: 22,
                    color: "white",
                    marginTop: 10,
                    marginLeft: 10,
                }}>
                    {user ? name : "Oracle"}
                </Text>
            </HStack>

            {sen.map((words, i) => <HStack key={i} style={{
                paddingLeft: 5,
                paddingTop: 5,
                marginLeft: 10,
            }}>
                {words.map((w, j) => w === "---nn---" ? <Text key={j}>{'\n'} </Text> : /\*\*[\w\d]+\*\*/.test(w) ? <Text key={j} color="white" fontSize="sm" textAlign="left" style={{
                    fontFamily: "Arial",
                    fontWeight: '900'
                }}>{w.replace(/\*/g, "") + " "}</Text> : /\`[\w\d]+\`/.test(w) ? <Text key={j} color="white" fontSize="sm" textAlign="left" style={{
                    fontFamily: "Arial",
                    backgroundColor: "#575757",
                    borderRadius: 2,
                    padding: 1,
                    marginLeft: 1,
                    marginRight: 1,
                }}>{w.replace(/\`/g, "") + " "}</Text> : <Text key={j} color="white" fontSize="sm" textAlign="left" style={{
                    fontFamily: "Arial",
                }}>{w + " "}</Text>)
                }
            </HStack >)}
        </VStack >
    );
};
