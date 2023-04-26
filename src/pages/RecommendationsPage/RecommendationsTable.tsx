import {
  Box,
  BoxProps,
  Center,
  FlexProps,
  Grid,
  Heading,
  Stack,
  StackProps,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import { TopData } from './types';

type Props = {
  data: TopData[];
} & StackProps;

const columns: Record<keyof TopData, string> = {
  name: 'Параметры',
  accuracy: 'Точность (%)',
  profitability: 'Доходность (руб)',
  percentageProfitability: 'Доходность (%)',
};

const RecommendationsTable = ({ data, ...props }: Props) => (
  <Stack spacing="20px" {...props}>
    <Heading
      fontSize="32px"
      textAlign="center"
      children="Оценка всех торговых стратегий"
    />
    <Grid
      gridTemplateColumns="repeat(4, 1fr)"
      border="1px solid #B9B9B9"
      borderRadius={8}
      overflow="hidden"
    >
      {Object.values(columns).map((name, i) => (
        <Cell
          bg="#F3E4FF"
          fontWeight="600"
          borderLeft={i === 0 ? 'none' : '1px solid #B9B9B9'}
          children={name}
        />
      ))}
      {data.map((d, i) => (
        <Fragment key={i}>
          {Object.keys(columns).map((key, j) => {
            const value = d[key as keyof TopData];
            return (
              <Cell
                borderLeft={j === 0 ? 'none' : '1px solid #B9B9B9'}
                bg={i % 2 === 1 ? 'neutral.2' : 'neutral.1'}
                children={
                  typeof value === 'number'
                    ? (+value.toFixed(1)).toLocaleString()
                    : value
                }
              />
            );
          })}
        </Fragment>
      ))}
      {data.length === 0 && (
        <Cell
          borderTop="1px solid #B9B9B9"
          gridColumn="span 4"
          children="Отсутствуют записи"
        />
      )}
    </Grid>
  </Stack>
);

const Cell = (props: FlexProps) => (
  <Center px="12px" py="9.5px" minH="50px" textAlign="center" {...props} />
);

export default RecommendationsTable;
