import { Flex, HStack, Spacer } from '@chakra-ui/react';
import { memo } from 'react';
import { AddRowsComponentProps } from 'react-datasheet-grid';
import AddDealButton from './AddDealButton';
import ImportDealsButton from './ImportDealsButton';
import ResetDealsButton from './ResetDealsButton';
import SaveIndicator from './SaveIndicator';

const BottomBar = ({ addRows }: AddRowsComponentProps) => (
  <HStack px={4} spacing={4} align="center">
    <AddDealButton onAdd={() => addRows()} />
    <ImportDealsButton />
    <ResetDealsButton />
    <Spacer />
    <SaveIndicator />
  </HStack>
);

export default memo(BottomBar);
