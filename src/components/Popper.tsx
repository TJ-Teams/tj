import { Box, BoxProps, Collapse, Placement, Portal } from '@chakra-ui/react';
import { RefObject, useEffect, useMemo, useState } from 'react';
import { Modifier, usePopper } from 'react-popper';
import { useDebounce } from '~/hooks';

type PopperProps = {
  isOpen: boolean;
  anchorRef: RefObject<HTMLElement>;
  placement?: Placement;
  isSameWidth?: boolean;
} & BoxProps;

const sameWidth: Modifier<string, object> = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${
      state.elements.reference.getBoundingClientRect().width
    }px`;
  },
};

const offset = {
  name: 'offset',
  options: { offset: [0, 8] },
};

const Popper = ({
  isOpen,
  anchorRef,
  placement = 'bottom',
  isSameWidth,
  children,
  ...props
}: PopperProps) => {
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const debounce = useDebounce(300);

  const virtualAnchor = useMemo(
    () => ({
      getBoundingClientRect: () => {
        return anchorRef.current?.getBoundingClientRect() || new DOMRect();
      },
    }),
    []
  );

  const { styles, attributes, update } = usePopper(virtualAnchor, popper, {
    placement,
    modifiers: isSameWidth ? [sameWidth, offset] : [offset],
  });

  useEffect(() => {
    if (isOpen && anchorRef.current) {
      update?.();
      debounce.set(() => update?.());
      const observer = new ResizeObserver(() => update?.());
      observer.observe(anchorRef.current);
      return () => {
        debounce.reset();
        observer.disconnect();
      };
    }
  }, [isOpen]);

  return (
    <Portal appendToParentPortal>
      <Box
        pos="absolute"
        ref={setPopper}
        zIndex="modal"
        css={{
          '&[data-popper-reference-hidden=true]': {
            visibility: 'hidden',
            pointerEvents: 'none',
          },
        }}
        style={styles.popper}
        {...props}
        {...attributes.popper}
      >
        <Collapse
          unmountOnExit
          animateOpacity
          in={isOpen}
          children={children}
        />
      </Box>
    </Portal>
  );
};

export default Popper;
