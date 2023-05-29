import {atom, selector} from "recoil";
import {wordsState} from "../words/words.state.ts";
import {userState} from "../user/user.state.ts";
import {getFakeStory, getStory} from "./story.hook.ts";

const storyState = selector<string>({
  key: 'story',
  get: async ({get}) => {
    const words = await get(wordsState);
    const user = await get(userState);
    if(!words || words.length <= 0) {
      return "";
    }

    const overrides = await get(storyOverrideState);
    if(!overrides) {
      const {story: new_story} = await getFakeStory(words);
      return new_story;
    }

    return overrides;
  }
});

const storyOverrideState = atom<string>({
  key: 'storyOverride',
  default: '',
})

export {
  storyState,
  storyOverrideState
}