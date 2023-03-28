import { Icon, IconProps } from "@chakra-ui/react";

export default (props: IconProps) => (
  <Icon boxSize={4} viewBox="0 0 12 12" fill="none" {...props}>
    <path
      d="m1 1 9.583 10M11 1 1 11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
