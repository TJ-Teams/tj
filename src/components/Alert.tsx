import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  Heading,
  useForceUpdate,
} from '@chakra-ui/react';
import { ReactNode, useRef } from 'react';
import { CrossIcon } from '~/icons';
import { WindowProps } from './Window';

type Props = {
  heading: string;
  isLoading?: boolean;
  onSubmit?: () => Promise<void> | void;
  submitProps?: ButtonProps;
  cancelProps?: ButtonProps;
  children?: ReactNode;
};

const Alert = ({
  isOpen,
  onClose,
  heading,
  isLoading,
  onSubmit,
  submitProps,
  cancelProps,
  children,
}: WindowProps<Props>) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const isMount = useRef(false);
  const forceUpdate = useForceUpdate();

  if (isOpen) {
    isMount.current = true;
  }

  if (!isMount.current) {
    return null;
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      preserveScrollBarGap
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onCloseComplete={() => {
        isMount.current = false;
        forceUpdate();
      }}
    >
      <AlertDialogOverlay />
      <AlertDialogContent
        bg="neutral.1"
        boxShadow="base"
        maxW={['90%', '90%', '800px']}
        borderRadius={10}
      >
        <AlertDialogCloseButton
          zIndex={2}
          top={0}
          right="-68px"
          bg="neutral.1"
          boxSize="52px"
          borderRadius="full"
          _hover={{ bg: 'neutral.2' }}
          _active={{ bg: 'neutral.3' }}
          _focus={{ boxShadow: 'none' }}
          _focusVisible={{ boxShadow: 'outline' }}
          children={<CrossIcon boxSize={4} />}
        />
        <AlertDialogHeader
          as={Heading}
          py="36px"
          px="50px"
          size="h3"
          fontSize="24px"
          color="primary.4"
          noOfLines={1}
          wordBreak="break-all"
          children={heading}
        />
        <AlertDialogBody
          px="50px"
          pt="4px"
          pb="60px"
          fontSize="normal"
          fontWeight="normal"
          whiteSpace="pre-line"
          children={children}
        />
        <AlertDialogFooter py="36px" px="50px">
          <Button
            ref={cancelRef}
            variant="outline"
            size="normal"
            isDisabled={isLoading}
            onClick={onClose}
            children="Отмена"
            {...cancelProps}
          />
          <Button
            ml={4}
            size="normal"
            isLoading={isLoading}
            onClick={onSubmit}
            children="Подтвердить"
            {...submitProps}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
