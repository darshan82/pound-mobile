import React from 'react';
import {Text, VStack} from 'native-base';
import shortid from 'shortid';

const values = {
  height: '20%',
  indicators: [
    {values: {top: '100%', bottom: ''}, align: 'flex-start'},
    {values: {top: '80%', bottom: ''}, align: 'flex-start'},
    {values: {top: '60%', bottom: ''}, align: 'flex-start'},
    {values: {top: '40%', bottom: ''}, align: 'flex-start'},
    {values: {top: '20%', bottom: '0%'}, align: 'space-between'},
    // {title: '0%', align: 'flex-end'},
  ],
};

export const PercentageIndicator = () => {
  return (
    <VStack height="100%">
      {values.indicators.map(e => (
        <VStack
          key={shortid.generate()}
          height={values.height}
          justifyContent={e.align}>
          <Text color="gray.600" fontSize="xs" marginTop={-2}>
            {e.values.top}
          </Text>

          {e.values.bottom && (
            <Text color="gray.600" fontSize="xs" marginBottom={-2}>
              {e.values.bottom}
            </Text>
          )}
        </VStack>
      ))}
    </VStack>
  );
};
