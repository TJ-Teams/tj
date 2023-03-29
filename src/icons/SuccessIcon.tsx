import { Icon, IconProps } from "@chakra-ui/react";

export default (props: IconProps) => (
  <Icon boxSize={4} viewBox="0 0 20 20" fill="none" {...props}>
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      d="m6 10.5 3.101 3.101a.5.5 0 0 0 .747-.044L15 7"
    />
  </Icon>
);
