import { Word } from "./word";
import {Button, Center, Container, Flex, Grid, Loader, Modal, Space, ThemeIcon} from "@mantine/core";
import { useWords } from "./words.hook.ts";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Section} from "../layout/section.tsx";
import {
  BrandDiscord,
  BrandQq,
  BrandTelegram,
  BrandTiktok,
  BrandTwitter,
  BrandWechat,
  BrandWeibo
} from "tabler-icons-react";

function Words() {
    const { word: word_param } = useParams();
    const [index, setIndex] = useState(0);
    const {loading, error, words, fetchFakeWords } = useWords();
    const [share_modal, setShareModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      fetchFakeWords(word_param);
    }, []);

    if (loading) {
      return <Loader variant="bars" h={"20rem"}/>;
    }

    if (error) {
      return <div>error</div>;
    }

    if(index === -1) {
      // Start
    }

    const word = words[index];

    if (!word) {
      return <div>error</div>;
    }

    function GoNext() {
      if(index < words.length - 1) {
        setIndex(index + 1);
      } else {
        navigate("/story");
        setIndex(0);
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    return (
        <>
          <Modal opened={share_modal} onClose={() => setShareModal(false)} title={"分享"}>
            <Word key={word.word.english} word={word}/>
            <Space h={"md"} />
            <Flex gap={8}>
              <ThemeIcon color={"#6080FB"} size={"lg"}><BrandWechat /></ThemeIcon>
              <ThemeIcon color={"#6080FB"} size={"lg"}><BrandWeibo /></ThemeIcon>
              <ThemeIcon color={"#6080FB"} size={"lg"}><BrandQq /></ThemeIcon>
              <ThemeIcon color={"#6080FB"} size={"lg"}><BrandDiscord /></ThemeIcon>
              <ThemeIcon color={"#6080FB"} size={"lg"}><BrandTelegram /></ThemeIcon>
              <ThemeIcon color={"#6080FB"} size={"lg"}><BrandTwitter /></ThemeIcon>
              <ThemeIcon color={"#6080FB"} size={"lg"}><BrandTiktok /></ThemeIcon>
            </Flex>
          </Modal>
          <Flex direction={"column"} justify={"space-between"} align={"center"} w={"100%"} h={"90vh"} gap={"1rem"} p={"1rem 0"}>
            <Container maw={"max(40rem, 60%)"} p={0}>
              <Section title={"新单词"}>
                <Center>
                  <Word key={word.word.english} word={word}/>
                </Center>
              </Section>
            </Container>
            <Center h={"6rem"} pb={"1rem"}>
              <Flex gap={"1rem"}>
                <Button
                  color={"#6080FB"}
                  size={"xl"}
                  onClick={() => {
                    setShareModal(true);
                  }}
                >分享</Button>
                <Button
                  onClick={() => {
                    GoNext();
                  }}
                  variant="gradient"
                  size={"xl"}

                >{
                  index === words.length - 1 ? "学习回顾" : "下一个"
                }</Button>
              </Flex>
            </Center>
          </Flex>
        </>
    );
}

export {
  Words
}