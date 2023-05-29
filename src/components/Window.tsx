import {
  Button,
  ButtonProps,
  Heading,
  Modal,
  ModalBody,
  ModalBodyProps,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
  ModalOverlay,
  ModalProps,
  useForceUpdate,
} from '@chakra-ui/react';
import { useValue } from '~/hooks';
import { CrossIcon } from '~/icons';

export type WindowProps<T = Record<string, unknown>> = {
  isOpen: boolean;
  onClose: () => void;
} & T;

type Props = {
  isLoading?: boolean;
  isHideSubmit?: boolean;
  isHideCancel?: boolean;
  isHideClose?: boolean;
  heading?: string;
  submitProps?: ButtonProps;
  cancelProps?: ButtonProps;
  headerProps?: ModalHeaderProps;
  bodyProps?: ModalBodyProps;
  footerProps?: ModalFooterProps;
  modalProps?: Omit<ModalProps, 'children' | 'isOpen' | 'onClose'>;
} & ModalContentProps;

const Window = ({
  isOpen,
  onClose,
  isLoading,
  isHideSubmit,
  isHideCancel,
  isHideClose,
  heading,
  submitProps,
  cancelProps,
  headerProps,
  bodyProps,
  footerProps,
  modalProps,
  children,
  ...props
}: WindowProps<Props>) => {
  const isMount = useValue(false);
  const forceUpdate = useForceUpdate();

  if (isOpen) {
    isMount.set(true);
  }

  if (!isMount.get) {
    return null;
  }

  return (
    <Modal
      isCentered
      preserveScrollBarGap
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
      onCloseComplete={() => {
        isMount.set(false);
        forceUpdate();
      }}
      {...modalProps}
    >
      <ModalOverlay />
      <ModalContent
        w="fit-content"
        maxW={['95%', '95%', '85%']}
        maxH={['95%', '95%', '85%']}
        bg="neutral.1"
        boxShadow="base"
        borderRadius={10}
        {...props}
      >
        {!isHideClose && (
          <ModalCloseButton
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
            display={{ base: 'none', sm: 'block' }}
            children={<CrossIcon boxSize={4} />}
          />
        )}

        {heading && (
          <ModalHeader
            px={{ base: '20px', md: '50px' }}
            py={{ base: '18px', md: '36px' }}
            display="flex"
            alignItems="center"
            fontSize={{ base: '14px', md: '24px' }}
            {...headerProps}
          >
            <Heading
              size="h3"
              color="primary.4"
              noOfLines={1}
              wordBreak="break-all"
              children={heading}
            />
          </ModalHeader>
        )}

        <ModalBody
          px={{ base: '20px', md: '50px' }}
          pt={heading ? 1 : '36px'}
          pb={!isHideSubmit || !isHideCancel ? 1 : '36px'}
          overflowX="hidden"
          children={children}
          {...bodyProps}
        />

        {(!isHideSubmit || !isHideCancel) && (
          <ModalFooter
            px={{ base: '20px', md: '50px' }}
            py={{ base: '18px', md: '36px' }}
            {...footerProps}
          >
            {!isHideCancel && (
              <Button
                variant="outline"
                size="normal"
                isDisabled={isLoading}
                onClick={onClose}
                children="Отменить"
                {...cancelProps}
              />
            )}
            {!isHideSubmit && (
              <Button
                ml={4}
                size="normal"
                isLoading={isLoading}
                children="Сохранить"
                {...submitProps}
              />
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Window;
