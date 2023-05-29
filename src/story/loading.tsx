import {Center, Container, Flex, Loader, Paper, Skeleton, Stack} from "@mantine/core";
import {Section} from "../layout/section.tsx";

function Loading() {
  return (
    <Flex direction={"column"} justify={"space-between"} align={"center"} w={"100%"} h={"90vh"} gap={"1rem"} p={"1rem"}>
      <Container maw={"max(40rem, 60%)"}>
        <Section title={"场景化短文生成..."}>
          <Paper shadow={"md"} withBorder p={"md"} w={"100%"}>
            <Center h={"20rem"}>
              <Loader variant={"bars"}/>
            </Center>
          </Paper>
        </Section>
      </Container>
    </Flex>
  )
}

export default Loading