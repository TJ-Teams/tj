import {
  Icon,
  IconButton,
  IconButtonProps,
  useBoolean,
} from '@chakra-ui/react';
import { RxCross2 } from 'react-icons/rx';
import Alert from './Alert';

type Props = {
  heading: string;
  description: string;
  onRemove?: () => void;
} & Omit<IconButtonProps, 'onClick' | 'aria-label'>;

const RemoveButton = ({ heading, description, onRemove, ...props }: Props) => {
  const [isOpen, setIsOpen] = useBoolean(false);

  const handleSubmit = () => {
    setIsOpen.off();
    onRemove?.();
  };

  return (
    <>
      <IconButton
        boxSize={6}
        variant="empty"
        color="neutral.4"
        aria-label={heading}
        _hover={{ color: 'red.500' }}
        icon={<Icon as={RxCross2} boxSize="85%" />}
        onClick={setIsOpen.on}
        {...props}
      />
      <Alert
        heading={heading}
        children={description}
        isOpen={isOpen}
        onClose={setIsOpen.off}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default RemoveButton;
