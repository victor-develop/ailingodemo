import {Button, Center, createStyles, Flex, Grid, MultiSelect, Select, Stepper, Text, TextInput} from "@mantine/core";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mantine/hooks";
import {Section} from "../layout/section.tsx";
import {useRecoilState} from "recoil";
import {userState} from "../user/user.state.ts";
import {useForm} from "@mantine/form";

const useStyles = createStyles((theme) => ({
  stepBody: {
    '@media (max-width: 600px)': {
      display: "none",
    },
    display: "initial"
  },
  content: {
    height: "100%"
  }
}))

const TotalSteps = 3;

const Onboarding = () => {
    const form = useForm({
      initialValues: {
        name: "",
        scene: "",
        tags: []
      }
    })

    const [step, setStep] = useState(0);
    const [user, setUser] = useRecoilState(userState);

    const renderPrevStepButton = () => {
      if (step > 0) {
        return (
          <Button variant={"default"} size={"xl"} radius={"sm"} w={"100%"} miw={"120px"}
            onClick={() => step > 0 && setStep(step - 1)}
          >
            <Text fw={"300"} fz={"24px"}>
              上一步
            </Text>
          </Button>
        ) 
      }
      return null
    }

    const [scenes, setScenes] = useState([
      { value: "Ecommerce & SaaS", label: "Ecommerce" },
      { value: "coming soon", label: "敬请期待!", disabled: true }
    ]);
    const [tags, setTags] = useState([
      { value: "business_english", label: "SaaS" },
      { value: "campus", label: "敬请期待!", disabled: true },
    ]);

    const { classes } = useStyles();
    const narrow = useMediaQuery("(max-width: 600px)");

    const navigate = useNavigate();

    useEffect(() => {
      if(user.onboarded) {
        setStep(TotalSteps);
      } else {
        setStep(0);
      }
    }, [user.id, user.onboarded]);

    return (
        <Flex direction={"column"} justify={"space-between"} w={"100%"} h={"90vh"}>
          <Stepper active={step} size="sm" maw={"64rem"} w={"100%"} m={"0 auto"} mt={"23px"} style={{flexGrow: 10}} classNames={{...classes}}>
            <Stepper.Step label="First step" description="Self intro" ml={"21px"}>
              <Center h={"90%"}>
                <Section title={"简单描述下自己吧"}>
                  <TextInput
                    placeholder="希望我们怎么称呼你"
                    size={"lg"}
                    {...form.getInputProps("name")}
                  />
                </Section>
              </Center>
            </Stepper.Step>
            <Stepper.Step label="Second step" description="Choose scene">
              <Center h={"100%"}>
                <Section title={"学什么领域的英语呢"}>
                  <Select
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) => {
                      const normalized_query = String(query).toLowerCase().trim().replace(/\s+/g, "_");
                      const item = { value: normalized_query, label: query };
                      setScenes((current) => [...current, item]);
                      return item;
                    }}
                    data={scenes}
                    size={"lg"}
                    {...form.getInputProps("scene")}
                  />
                </Section>
              </Center>
            </Stepper.Step>
            <Stepper.Step label="Third step" description="Choose interests">
              <Center h={"100%"}>
                <Section title={"一个关键词描述你使用英语的场景?"}>
                  <MultiSelect
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) => {
                      const normalized_query = String(query).toLowerCase().trim().replace(/\s+/g, "_");
                      const item = { value: normalized_query, label: query };
                      setTags((current) => [...current, item]);
                      return item;
                    }}
                    data={tags}
                    placeholder="选择你喜欢的"
                    size={"lg"}
                    {...form.getInputProps("tags")}
                  />
                </Section>
              </Center>
            </Stepper.Step>
            <Stepper.Step label="Finish" description="" mr={"21px"}>
              <Center h={"100%"}>
                <Section title={"来学习为你定制的词库吧!"}>{''}</Section>
              </Center>
            </Stepper.Step>
          </Stepper>
          <Grid w={"100%"} justify={"space-around"} maw={"600px"} ml={"auto"} mr={"auto"} mb={"45px"}>
            <Grid.Col span={narrow ? 9 : 3}>
              {renderPrevStepButton()}
            </Grid.Col>
            <Grid.Col span={9}>
              <Button variant={"gradient"} size={"xl"} radius={"sm"} w={"100%"}
                  onClick={() => {
                    if(step < TotalSteps) {
                      setStep(step + 1)
                      setUser((current) => ({
                        ...current,
                        name: form.values.name || current.name
                      }))
                      return;
                    }
                    // Handle submit
                    setUser((current) => ({
                      ...current,
                      ...form.values,
                      onboarded: true,
                      id: user.id
                    }));
                    navigate("/words/0");
                  }}
              >
                <Text fw={"300"} fz={"24px"}>
                  {
                    step < TotalSteps ? "下一步" : "开始学习"
                  }
                </Text>
              </Button>
            </Grid.Col>
          </Grid>
        </Flex>
    )
}

export { Onboarding }