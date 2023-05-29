export interface User {
  id: string
  name: string
  scene: string
  tags: string[]
  onboarded: boolean
}

export interface Word {
  example:  WordExample;
  synonyms: Synonym[];
  word:     WordObject;
  [property: string]: any;
}

export interface WordExample {
  illustration: string;
  sentence:     string;
  translation:  string;
  [property: string]: any;
}

export interface Synonym {
  chinese:      string;
  example:      SynonymExample;
  ipa:          string;
  partOfSpeech: string;
  synonym:      string;
  [property: string]: any;
}

export interface SynonymExample {
  illustration: string;
  sentence:     string;
  translation:  string;
  [property: string]: any;
}

export interface WordObject {
  chinese:      string;
  english:      string;
  ipa:          string;
  partOfSpeech: string;
  [property: string]: any;
}
