import { Box, BoxProps, Center, Grid } from '@chakra-ui/react';
import { forwardRef, Fragment, ReactElement, Ref } from 'react';
import { SelectOption } from '../types';
import { useSelectContext } from './select-context';

type Props<T> = {
  optionsHeightInDropdown: number;
  options: SelectOption<T>[];
  renderItem: (option: SelectOption<T>, index: number) => JSX.Element;
} & BoxProps;

// eslint-disable-next-line
const SelectDropdown = forwardRef<HTMLDivElement, Props<any>>(
  ({ optionsHeightInDropdown, options, renderItem, ...boxProps }, ref) => {
    const { activeIndex } = useSelectContext();

    return (
      <Grid
        {...boxProps}
        ref={ref}
        pos="relative"
        bg="neutral.1"
        border="1px solid rgba(109, 156, 251, 0.5)"
        borderRadius={8}
        boxShadow="base"
        overflowY="auto"
        gridAutoRows={`${optionsHeightInDropdown}px`}
      >
        {options.map((option, i) => (
          <Fragment
            key={option.key}
            children={renderItem ? renderItem(option, i) : null}
          />
        ))}
        {options.length === 0 && <Center children="Нет записей" />}
        {activeIndex >= 0 && options.length !== 0 && (
          <Box
            as="span"
            w="full"
            h={`${optionsHeightInDropdown}px`}
            mt={`${activeIndex * optionsHeightInDropdown}px`}
            pos="absolute"
            zIndex={0}
            bg="rgba(109, 156, 251, 0.15)"
            opacity={0.5}
            pointerEvents="none"
          />
        )}
      </Grid>
    );
  }
);

export default SelectDropdown as <T>(
  props: Props<T> & { ref?: Ref<HTMLDivElement> }
) => ReactElement;
