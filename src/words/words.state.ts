import { atom, atomFamily, selector } from 'recoil';

import {Word} from '../types';

const wordsListState = atom<Array<string>>({
  key: 'wordsList',
  default: [],
})

const wordWithIdState = atomFamily<Word, string>({
  key: 'word',
});

const wordsState = selector({
  key: 'words',
  get: ({ get }) => {
    const words = get(wordsListState);
    return words.map(word => get(wordWithIdState(word)));
  }
})

export {
  wordWithIdState,
  wordsListState,
  wordsState
};