import { Flex, Spacer } from '@chakra-ui/react';
import { memo } from 'react';
import AddDealButton from './AddDealButton';
import ImportDealsButton from './ImportDealsButton';
import SaveIndicator from './SaveIndicator';

const BottomBar = () => (
  <Flex
    px={4}
    mr="49px"
    align="center"
    border="1px solid #b9b9b9"
    borderTop="none"
  >
    <AddDealButton />
    <ImportDealsButton />
    <Spacer />
    <SaveIndicator />
  </Flex>
);

export default memo(BottomBar);
