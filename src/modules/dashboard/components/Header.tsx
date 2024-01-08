import React, { FC, useContext } from 'react';
import { HStack, VStack, Avatar, Text } from 'native-base';
import { AppContext } from '../../../app/context';
import { ProfileResponse } from '../interfaces/ProfileResponse';

type HeaderProps = {
  data: ProfileResponse;
};

export const Header: FC<HeaderProps> = ({ data }) => {
  const { tokens } = useContext(AppContext);

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <VStack style={{
        paddingLeft: 5
      }}>
        <Text color="white" fontSize="xl">
          Pound Score
        </Text>

        <Text color="#8AC019" fontSize="4xl" textAlign="left">
          {"0".repeat(4 - (data.score + "").length) + data.score}
        </Text>

        {/* <Text fontFamily="arial" color="gray.500" fontStyle="italic">
          {data.username}
        </Text>

        <Text fontFamily="arial" color="gray.500" fontStyle="italic">
          Profile Description
        </Text> */}
      </VStack>

      <VStack>
        <Avatar bg="gray.500" size="xl" source={{ uri: data.avatar }}>
          {tokens?.data.user_information.nickname.charAt(0).toUpperCase()}
        </Avatar>

        {/* <Text color="white" fontSize="sm" textAlign="right">
          lb coin: {data.coins}{' '}
          <Text color="#FA00FF" fontStyle="italic">
            B
          </Text>
        </Text> */}
      </VStack>
    </HStack>
  );
};
