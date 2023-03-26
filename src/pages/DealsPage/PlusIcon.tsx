import { Icon, IconProps } from '@chakra-ui/react';

export default (props: IconProps) => (
  <Icon boxSize={4} viewBox="0 0 19 19" fill="none" {...props}>
    <rect
      width="18.5"
      height="18.5"
      x=".25"
      y=".25"
      fill="#F3E4FF"
      stroke="#B9B9B9"
      stroke-width=".5"
      rx="3.75"
    />
    <rect width="3" height="13" x="8" y="3" fill="#852AD3" rx="1.5" />
    <rect
      width="3"
      height="13"
      x="3"
      y="11"
      fill="#852AD3"
      rx="1.5"
      transform="rotate(-90 3 11)"
    />
  </Icon>
);
