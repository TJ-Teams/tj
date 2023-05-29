import {
  Box,
  Heading,
  HStack,
  Spacer,
  StackProps,
  Text,
} from '@chakra-ui/react';

type Props = {
  title: string;
  data: { name: string; value: number }[];
  colors: string[];
};

const RatingTable = ({ title, data, colors }: Props) => {
  const isEmpty = data.length === 0;

  return (
    <Box
      flex={1}
      w={{ base: 'full', lg: 'fit-content' }}
      pt={{ base: '12px', md: '18px' }}
      pb={{ base: '16px', md: '24px' }}
      border="4px solid #E3E5E7"
      borderRadius={6}
    >
      <Heading
        as="h3"
        fontSize={{ base: '20px', md: '32px' }}
        textAlign="center"
        children={title}
      />
      {!isEmpty && <BaseRow mt="18px" name="Параметры" value="Точность" />}
      {data.slice(0, colors.length).map((d, i) => (
        <Row
          key={i}
          mt="6px"
          color="white"
          bg={colors[i]}
          name={d.name}
          value={d.value}
        />
      ))}
      {isEmpty && (
        <Text
          mt="18px"
          textAlign="center"
          fontSize="18px"
          children="Отсутствуют записи"
        />
      )}
    </Box>
  );
};

type BaseRowProps = {
  name: string;
  value: string;
} & StackProps;

const BaseRow = ({ name, value, ...props }: BaseRowProps) => (
  <HStack
    px={{ base: '36px', md: '72px' }}
    fontSize={{ base: '16px', md: '22px' }}
    {...props}
  >
    <Text color="inherit" children={name} />
    <Spacer minW="2.5vw" />
    <Text color="inherit" children={value} />
  </HStack>
);

type RowProps = {
  name: string;
  value: number;
} & StackProps;

const Row = ({ name, value, ...props }: RowProps) => (
  <BaseRow
    fontSize={{ base: '14px', md: '18px' }}
    fontWeight="500"
    name={name}
    value={`${+value.toFixed(1)}%`}
    {...props}
  />
);

export default RatingTable;
