import { useOutsideClick } from '@chakra-ui/react';
import { RefObject, useEffect } from 'react';

type UseOutsideActionParams = {
  boxRef: RefObject<HTMLElement>;
  portalRef?: RefObject<HTMLElement>;
  triggerKeys?: string[];
  callBackOnExit: () => void;
  isActive?: boolean;
};

const useOutsideAction = ({
  boxRef,
  portalRef,
  triggerKeys = [],
  callBackOnExit,
  isActive,
}: UseOutsideActionParams) => {
  useOutsideClick({
    ref: boxRef,
    handler: (e) => {
      const target = e.target;
      if (target instanceof Node && !portalRef?.current?.contains(target)) {
        callBackOnExit();
      }
    },
    enabled: isActive,
  });

  useEffect(() => {
    if (isActive) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab' || triggerKeys.some((k) => k === event.key)) {
          callBackOnExit();
        }
      };

      boxRef.current?.addEventListener('keydown', handleKeyDown);

      return () => {
        boxRef.current?.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isActive]);
};

export default useOutsideAction;
