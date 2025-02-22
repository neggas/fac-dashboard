import { Link } from "@chakra-ui/react";

interface NavigationLinkProps {
  href: string;
  component?: React.ReactNode;
}

export const NavigationLink = ({ href, component }: NavigationLinkProps) => {
  return (
    <Link
      href={href}
      textAlign="left"
      h="36px"
      py="10px"
      px="12px"
      textStyle="heading-sm"
      rounded="6px"
      _hover={{
        textDecoration: "none",
        bg: "black",
        color: "white",
        "& path": {
          stroke: "white",
        },
        "& ellipse": {
          fill: "white",
        },
        "& rect": {
          stroke: "white",
        },
      }}>
      {component}
    </Link>
  );
};
