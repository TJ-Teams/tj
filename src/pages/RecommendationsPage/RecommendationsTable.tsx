import {
  Center,
  FlexProps,
  Grid,
  Heading,
  Stack,
  StackProps,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import { useRecommendationsContext } from './recommendations-context';
import { TopData } from './types';

type Props = {
  data: TopData[];
} & StackProps;

const baseColumns: Record<keyof TopData, string> = {
  accuracy: 'Точность (%)',
  profitability: 'Доходность (руб)',
};

const RecommendationsTable = ({ data, ...props }: Props) => {
  const { parametersMap } = useRecommendationsContext();

  const columns: Record<keyof TopData, string> = Object.fromEntries(
    Object.keys(data.at(0) || {}).map((key) => {
      const name =
        parametersMap.get(key)?.name || baseColumns[key] || 'unknown';
      return [key, name];
    })
  );

  const totalColumns = Object.keys(columns).length;

  return (
    <Stack spacing={{ base: '12px', md: '20px' }} {...props}>
      <Heading
        fontSize={{ base: '18px', md: '32px' }}
        textAlign="center"
        children="Оценка всех торговых стратегий"
      />
      {data.length > 0 && (
        <Grid
          gridTemplateColumns={`repeat(${totalColumns - 2}, 1fr) 1.5fr 1.5fr`}
          border="1px solid #B9B9B9"
          borderRadius={8}
          overflow="auto"
        >
          {Object.values(columns).map((name, i) => (
            <Cell
              key={i}
              bg="#F3E4FF"
              fontWeight="600"
              borderLeft={i === 0 ? 'none' : '1px solid #B9B9B9'}
              borderLeftWidth="1px"
              children={name}
            />
          ))}
          {data.map((d, i) => (
            <Fragment key={i}>
              {Object.keys(columns).map((key, j) => {
                const value = d[key as keyof TopData];
                return (
                  <Cell
                    key={j}
                    borderLeft={j === 0 ? 'none' : '1px solid #B9B9B9'}
                    borderLeftWidth="1px"
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
        </Grid>
      )}
      {data.length === 0 && <Cell children="Отсутствуют записи" />}
    </Stack>
  );
};

const Cell = (props: FlexProps) => (
  <Center
    px={{ base: '8px', md: '12px' }}
    py={{ base: '4px', md: '9.5px' }}
    minH="50px"
    fontSize={{ base: '14px', md: '16px' }}
    textAlign="center"
    {...props}
  />
);

export default RecommendationsTable;
