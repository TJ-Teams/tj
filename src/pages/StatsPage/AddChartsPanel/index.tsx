import {
  Box,
  Button as BaseButton,
  ButtonProps,
  Collapse,
  HStack,
  Icon,
  useBoolean,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { RiSettings3Fill } from 'react-icons/ri';
import { Chart, getChartKey } from '../chart-type';
import { useStatsContext } from '../stats-context';
import AddChartsForm from './AddChartsForm';

const AddChartsMenu = () => {
  const { charts, subscriptions } = useStatsContext();
  const [isOpen, setIsOpen] = useBoolean(false);

  const handleSubmit = (newCharts: Chart[]) => {
    const chartsMap = new Map(charts.get.map((c) => [getChartKey(c), c]));
    newCharts.forEach((c) => chartsMap.set(getChartKey(c), c));
    charts.set([...chartsMap.values()]);
    subscriptions.ping('charts');
    setIsOpen.off();
  };

  return (
    <Box
      position="fixed"
      zIndex="popover"
      bg="white"
      px={5}
      py={4}
      w="650px"
      boxShadow="base"
      borderBottomRightRadius={8}
    >
      <Collapse
        in={isOpen}
        unmountOnExit
        children={<AddChartsForm mb={6} onSubmit={handleSubmit} />}
      />
      <HStack spacing={4}>
        <Button
          flex={1}
          justifyContent="flex-start"
          onClick={setIsOpen.toggle}
          children={isOpen ? 'Свернуть' : 'Построение диаграмм'}
          rightIcon={
            <Icon
              as={FiChevronDown}
              boxSize={6}
              transform={`rotate(${isOpen ? -180 : 0}deg)`}
            />
          }
        />
        <Button
          // TODO coming soon
          isDisabled
          opacity="0.3 !important"
          children="Настройка кастомизации"
          rightIcon={<Icon as={RiSettings3Fill} boxSize={6} />}
        />
      </HStack>
    </Box>
  );
};

const Button = (props: ButtonProps) => (
  <BaseButton
    color="#852AD3"
    variant="empty"
    fontWeight="500"
    _hover={{ opacity: 0.75 }}
    _active={{ opacity: 0.8 }}
    {...props}
  />
);

export default AddChartsMenu;
