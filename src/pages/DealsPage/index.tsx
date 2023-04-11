import { Flex } from '@chakra-ui/react';
import AddParameterButton from './AddParameterButton';
import { DealsProvider } from './deals-context';
import DealsTable from './DealsTable';

const DealsPage = () => (
  <DealsProvider>
    <Flex flexDir="row">
      <DealsTable />
      <AddParameterButton />
    </Flex>
  </DealsProvider>
);

export default DealsPage;
