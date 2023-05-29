import {pluralize} from '@capaj/pluralize';
import * as _ from "lodash";

// Wrttien by ChatGPT.
// Prompt: As a javascript expert. write a function. Given param are a paragraph and a list of strings. Identify the parts in the paragraph that match exactly to the list of string. Return an array of object where its field value are chunks of the paragraph. Its field type should be 'highlight' if this is a matched part, 'text' otherwise. Give me a unit test of it too.
export function highlightMatches(paragraph: string, strings: string[]) {
    const plural_strings = _.flatMap(strings, s =>
      ([
          s, pluralize(s)
      ])
    );

    const regex = new RegExp(plural_strings.join('|'), 'gi');
    const matches = paragraph.match(regex);

    if (!matches) {
        return [{ type: 'text', value: paragraph }];
    }

    const parts = [];
    let lastIndex = 0;

    matches.forEach(match => {
        const index = paragraph.toLowerCase().indexOf(match.toLowerCase(), lastIndex);

        if (index > lastIndex) {
            const textChunk = paragraph.substring(lastIndex, index);
            parts.push({ type: 'text', value: textChunk });
        }

        const matchChunk = paragraph.substr(index, match.length);
        parts.push({ type: 'highlight', value: matchChunk });

        lastIndex = index + match.length;
    });

    if (lastIndex < paragraph.length - 1) {
        const textChunk = paragraph.substring(lastIndex);
        parts.push({ type: 'text', value: textChunk });
    }

    return parts;
}