import {
  AppShell,
  Center, ColorScheme,
  Flex,
  Group,
  Header,
  Image,
  MantineProvider, MediaQuery,
  Text,
  ThemeIcon,
  Title
} from "@mantine/core";
import "./app.css";

import {createBrowserRouter, Link, Outlet, RouterProvider, useNavigate} from "react-router-dom";
import {Onboarding} from "./onboarding/onboarding.tsx";
import {Words} from "./words/words.tsx";
import {Story} from "./story/story.tsx";
import logo from './assets/logo.png';
import {Logout, Moon, Sun} from "tabler-icons-react";
import {atom, useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import localStorageEffect from "./effects/localStorage.ts";
import {userState} from "./user/user.state.ts";
import {useMediaQuery} from "@mantine/hooks";

const defaultTheme = (() => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    return "dark";
  }
  return "light";
})();

const themeState = atom<ColorScheme>({
  key: "theme",
  default: defaultTheme,
  effects: [
    localStorageEffect("theme_pref")
  ]
});

const getCurrentGreeting = () => {
  const hour = new Date().getHours()

  if (hour >= 6 && hour < 12) {
    return "上午好"
  } else if (hour >= 12 && hour < 18) {
    return "中午好"
  } else {
    return "晚上好"
  }
}

const AppHeader = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const mobile = useMediaQuery("(max-width: 600px)");

  const navigate = useNavigate();

  return (
    <Header height={64}>
      <Flex align={"center"} justify={"space-between"} h={"100%"} w={"100%"} p={"12px"}>
        <Group spacing={8}>
          <Center maw={40} style={{ borderRadius:"50%", overflow: "hidden" }}>
            <Image src={logo} maw={"48px"} />
          </Center>
          <Title fw={300} fz={mobile ? 24 : 44} order={1} variant={"gradient"}>
            <Link to={"/"}>
              AILingo
            </Link>
          </Title>
        </Group>
        <Group spacing={8}>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Text styles={{display: 'none'}}>
              {getCurrentGreeting()}, {user.name ?? "习语人"}&nbsp;
            </Text>
          </MediaQuery>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Text styles={{display: 'none'}}>
              {user.name ?? "习语人"}&nbsp;
            </Text>
          </MediaQuery>
          {
            theme === "light"
              ? (
                <ThemeIcon size={"lg"} color={"#55565b"}>
                  <Moon onClick={() => setTheme("dark")} />
                </ThemeIcon>
            )
              : (
                <ThemeIcon size={"lg"} color={"gray"}>
                  <Sun onClick={() => setTheme("light")} />
                </ThemeIcon>
              )
          }
          <ThemeIcon size={"lg"} color={"#6080FB"}>
            <Logout onClick={() => {
              resetUser();
              navigate("/");
            }}></Logout>
          </ThemeIcon>
        </Group>
      </Flex>
    </Header>
  )
}

const App = () => {
    const theme = useRecoilValue(themeState);

    const router = createBrowserRouter(
        [
            { path: '/', element: (
                <AppShell padding={"md"}
                          header={<AppHeader />}
                >
                  <Center id="app" w={"100%"} h={"100%"}>
                    <Flex direction={"column"} justify={"space-between"} align={"center"} w={"100%"} h={"100%"}>
                      <Outlet />
                    </Flex>
                  </Center>
                </AppShell>
              ),
              children: [
                { path: '/', element: <Onboarding /> },
                { path: "/words/:word", element: <Words /> },
                { path: "/story", element: <Story /> },
              ]
            },
        ]
    );

    return (
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          colorScheme: theme,
          headings: {
            fontWeight: 300,
          },
          colors: {
            ailingo: [
              "#FDFEFF",
              "#D1DAFC",
              "#A9BAFB",
              "#839CFB",
              "#6080FB",
              "#4066F8",
              "#244FF5",
              "#0D3CF0",
              "#0E37D6",
              "#0E33BF"
            ],
          },
          primaryColor: "ailingo",
          defaultGradient: {
            from: '#6080fb',
            to: '#a1c7ec',
            deg: 60,
          },
          components: {
            Container: {
              defaultProps: {
                fluid: true,
                w: "100%",
                size: "100%"
              }
            },
            Input: {
              defaultProps: {
                variant: "filled",
                size: "lg",
                radius: "xs",
              }
            },
            Button: {
              defaultProps: {
                size: "xl"
              }
            }
          }
        }}
      >

        <RouterProvider router={router} />
      </MantineProvider>
    )
}

export default App