import { Icon, IconProps } from "@chakra-ui/react";

export default (props: IconProps) => (
  <Icon boxSize={4} viewBox="0 0 20 20" fill="none" {...props}>
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="10" cy="15" r="1" fill="currentColor" />
    <path
      fill="currentColor"
      d="M8.594 6.497a1.41 1.41 0 1 1 2.812 0l-.344 5.505a1.064 1.064 0 0 1-2.124 0l-.344-5.505Z"
    />
  </Icon>
);
