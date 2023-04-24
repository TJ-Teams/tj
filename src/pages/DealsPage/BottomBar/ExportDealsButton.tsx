import { HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import { BiExport } from 'react-icons/bi';
import { useLoadingState } from '~/hooks';
import downloadFile from '~/utils/download-file';
import exportTjDeals from '~/utils/export-tj-deals';
import { useDealsContext } from '../deals-context';

const ExportDealsButton = () => {
  const { isLoading, trackLoading } = useLoadingState(false);
  const { parameters, deals } = useDealsContext();

  const handleSubmit = trackLoading(async () => {
    const csvData = exportTjDeals(parameters.get, deals.get);
    downloadFile(csvData, `TJ-Deals-${Date.now()}.csv`, 'text/csv');
  });

  return (
    <HStack
      px={2}
      py={4}
      spacing={2}
      _hover={{ color: 'gray' }}
      cursor={isLoading ? 'not-allowed' : 'pointer'}
      onClick={isLoading ? undefined : handleSubmit}
    >
      <IconButton
        isLoading={isLoading}
        boxSize={4}
        borderRadius={2}
        variant="clear"
        color="#852AD3"
        aria-label="экспортировать журнал сделок"
        onClick={handleSubmit}
        icon={<Icon boxSize={5} as={BiExport} />}
      />
      <Text
        color="inherit"
        userSelect="none"
        noOfLines={1}
        children="Экспортировать"
      />
    </HStack>
  );
};

export default ExportDealsButton;
