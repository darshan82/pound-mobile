import React, { FC, useState, useEffect } from 'react';
import { Text, VStack } from 'native-base';
import shortid from 'shortid';

type ValueIndicatorProps = {
  maxValue: number;
};

type DataValueIndicator = {
  values: { top: string; bottom: string };
  align: string;
};

export const ValueIndicator: FC<ValueIndicatorProps> = ({ maxValue }) => {
  const [steps, setSteps] = useState<DataValueIndicator[]>([]);

  useEffect(() => {
    if (!maxValue) {
      return;
    }

    const rawSteps = calculateSteps(maxValue);
    setSteps(prepareData(rawSteps));
  }, [maxValue]);

  const prepareData = (data: string[]): DataValueIndicator[] => {
    let j = 0;
    const values = [];
    for (let index = 0; index < data.length - 1; index++) {
      j = index + 1;

      if (data[j] === '0') {
        values.push({
          values: { top: data[index], bottom: data[j] },
          align: 'space-between',
        });
      } else {
        values.push({
          values: { top: data[index], bottom: '' },
          align: 'flex-start',
        });
      }
    }

    return values;
  };

  const calculateSteps = (max: number): string[] => {
    const step = Math.round((20 * max) / 100);
    let bridge = max;
    let temp = [];

    while (bridge >= 0) {
      temp.push(`${bridge}`);
      bridge = bridge - step;
    }

    if (!temp.includes('0')) {
      temp.push('0');
    }

    return temp;
  };

  return (
    <VStack height="100%">
      {steps.map(e => (
        <VStack key={shortid.generate()} height="20%" justifyContent={e.align}>
          <Text color="gray.600" fontSize="sm" marginTop={-2} textAlign="right">
            {Math.round(parseInt(e.values.top) / 1000) + " K"}
          </Text>

          {e.values.bottom && (
            <Text
              color="gray.600"
              fontSize="sm"
              marginBottom={-2}
              textAlign="right">
              {e.values.bottom}
            </Text>
          )}
        </VStack>
      ))}
    </VStack>
  );
};
