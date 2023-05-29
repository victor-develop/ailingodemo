import { atom } from "recoil";
import { v4 as uuid } from "uuid";
import localStorageEffect from "../effects/localStorage.ts";
import {User} from "../types";

const newUser = () => {
  return {
    id: uuid(),
    onboarded: false
  }
}

const userState = atom<User>({
  key: 'user',
  default: newUser(),
  effects: [
    localStorageEffect("user")
  ]
})

export {
  userState
}