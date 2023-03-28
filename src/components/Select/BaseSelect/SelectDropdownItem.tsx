import { Flex, FlexProps } from '@chakra-ui/react';

type Props = {
  isChosen?: boolean;
} & FlexProps;

const SelectDropdownItem = ({ isChosen, ...props }: Props) => (
  <Flex
    px={4}
    zIndex={1}
    boxSize="full"
    align="center"
    bg={isChosen ? 'rgba(109, 156, 251, 0.2)' : 'transparent'}
    _hover={{ bg: 'rgba(109, 156, 251, 0.2)', cursor: 'pointer' }}
    _notLast={{
      borderBottom: '1px solid rgba(109, 156, 251, 0.5)',
    }}
    {...props}
  />
);

export default SelectDropdownItem;
