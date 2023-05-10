import { Box, Center, Heading, HStack, Text } from '@chakra-ui/react';
import { ReactElement, useRef } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import { ResponsiveContainer } from 'recharts';
import BaseRemoveButton from '~/components/RemoveButton';

export type ChartLayoutProps = {
  title: string;
  subTitle: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  onRemove?: () => void;
};

type Props = {
  children: ReactElement;
};

const ChartLayout = ({
  title,
  subTitle,
  isLoading,
  isEmpty,
  onRemove,
  children,
}: ChartLayoutProps & Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleRemove = () => {
    if (!onRemove) return;
    const box = ref.current;
    if (box) {
      box.style.opacity = '0';
      setTimeout(onRemove, 350);
    } else {
      onRemove();
    }
  };

  return (
    <Box
      ref={ref}
      pos="relative"
      p="12px 48px 60px 16px"
      boxSize="full"
      border="2px solid #F0F2F4"
      borderRadius={8}
      transitionProperty="opacity"
      transitionDuration="300ms"
    >
      <HStack mr={4} mb={2} justify="space-between">
        <Text
          fontSize="16px"
          fontWeight="600"
          whiteSpace="pre-line"
          children={subTitle}
        />
        <Heading fontSize="20px" textAlign="right" children={title} />
      </HStack>

      {onRemove && (
        <BaseRemoveButton
          pos="absolute"
          right={1}
          top={1}
          boxSize={8}
          heading="Удаление графика"
          description={
            'Вы уверены, что хотите удалить график?\n' +
            'В любой момент данный график можно построить заново'
          }
          onRemove={handleRemove}
        />
      )}
      {isLoading ? (
        <Center boxSize="full" flexDir="column">
          <PuffLoader color='#852AD3' />
          <Text mt={4} children="Загрузка..." />
        </Center>
      ) : isEmpty ? (
        <Center boxSize="full">
          <Text children="Нет данных" />
        </Center>
      ) : (
        <ResponsiveContainer width="100%" height="100%" children={children} />
      )}
    </Box>
  );
};

export default ChartLayout;
