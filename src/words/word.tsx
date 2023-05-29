import {
  Flex,
  Group,
  Paper,
  Skeleton,
  Title,
  Text,
  Container,
  Grid,
  Divider,
  Blockquote,
  Stack,
  SimpleGrid, ScrollArea, Image, AspectRatio
} from "@mantine/core"
import type {Synonym, Word} from "../types";
import React, {CSSProperties} from "react";

const baseSynImgSideLen = 150
const synImgBgSize = 300

const Synonym = ({
    synonym
}: {synonym : Synonym}) => {
    return (
      <Flex gap={"xs"} align={"center"} direction={"column"}>
          {/*<Skeleton width={180} height={180}/>*/}
          <AspectRatio ratio={1} w={baseSynImgSideLen} h={baseSynImgSideLen} mah={baseSynImgSideLen}>
            <Container style={{
              background: `url(${synonym.example.img_url})`,
              backgroundPosition: `-${baseSynImgSideLen}px -${baseSynImgSideLen}px`,
              backgroundSize: `${synImgBgSize}px ${synImgBgSize}px`
            }} />
          </AspectRatio>
          <Text fz={"lg"} fw={700}>{synonym.synonym}</Text>
          <Group spacing={"xs"}>
              <Text>{synonym.ipa}</Text>
              <Text>{synonym.partOfSpeech}. {synonym.chinese}</Text>
          </Group>
          <Stack spacing={0} align={"center"}>
            <Text fz={"xs"} fs={"italic"}>{synonym.example.sentence}</Text>
            <Text fz={"xs"} fs={"italic"}>{synonym.example.translation}</Text>
          </Stack>
      </Flex>
    )
}


// This look good on multiple mobile devices
const wordImgSizeLen = 300
const wordImgBgSize = 600


const Word = ({
  word
}: { word: Word }) => {

    const {
        word: w,
        example,
        synonyms,
    } = word;

    return (
      <Paper shadow={"md"} withBorder p={"md"} h={"90%"} maw={"600px"}>
          <ScrollArea h={"100%"} >
            <Flex gap={"sm"} align={"center"} direction={"column"} justify={"space-between"}>
              <Title order={1}>{w.english} <a href="#" >🔊</a></Title>
              <Group>
                <Text size={"lg"}>{w.ipa}</Text>
                <Group>
                  <Text size={"lg"}>{w.partOfSpeech}. {w.chinese}</Text>
                </Group>
              </Group>
              <Stack spacing={0} align={"center"}>
                <Text fz={"sm"} fs={"italic"}>{example.sentence}</Text>
                <Text fz={"sm"} fs={"italic"}>{example.translation}</Text>
              </Stack>
              {/*<Skeleton width={400} height={400}/>*/}
              <AspectRatio ratio={1}  w={wordImgSizeLen} h={wordImgSizeLen} mah={wordImgSizeLen}>
                <Container style={{
                  background: `url(${example.img_url})`,
                  backgroundPosition: `-${wordImgSizeLen}px -${wordImgSizeLen}px`,
                  backgroundSize: `${wordImgBgSize}px ${wordImgBgSize}px`
                }} />
              </AspectRatio>
              <Divider my={"sm"} w={"100%"}/>
              {/*Synonym*/}
              <SimpleGrid cols={2} >
                {
                  synonyms.map(synonym => {
                    return (
                        <Synonym key={synonym.synonym} synonym={synonym}/>
                    );
                  })
                }
              </SimpleGrid>
            </Flex>
          </ScrollArea>
      </Paper>
    );
};

export {
    Word
}