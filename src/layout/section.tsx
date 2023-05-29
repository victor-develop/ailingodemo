import {Container, Divider, Title} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";

export const Section = ({
  title,
  children
}) => {
  const mobile = useMediaQuery("(max-width: 600px)");

  return (
    <Container pr={"24px"} maw={"max(54rem, 100%)"}>
      <Title fz={mobile ? 32 : 42} fw={100}>{title}</Title>
      <Divider ml={"-4px"} mb={"12px"} w={"calc(100% + 8px)"} style={{borderTopWidth: "0.15rem"}}/>
      {
        children
      }
    </Container>
  )
}