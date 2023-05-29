import {useRecoilCallback, useRecoilState, useRecoilValue} from "recoil";
import {useState} from "react";
import {storyState} from "./story.state";
import {generateStory} from "../api/aigc.service.ts";
import {Word, User} from "../types";

const getStory = async (words: Word[], user: User) => {
  const data = {
    session_id: user.id,
    words: words.map(w => w.word.english),
  };
  const story = await generateStory(data);
  return story;
}

const getFakeStory = async (words: Word[]) => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  if(words && words[0].word.english === "Low-hanging fruit") {
    return {
      story: `Running an Ecommerce store can be daunting, especially when it comes to managing things like compliance and anomalies that often arise unexpectedly, but if you start by tackling the low-hanging fruit and taking things one step at a time, success is within reach.
开一家电子商务店可能会令人畏惧，特别是当涉及到管理诸如合规和异常情况时，但是如果你从解决容易的难题开始，一步一个脚印，成功就在眼前。`
    };
  }

  return { story: `The company, a well-established player in the Ecommerce and SaaS space, faced a penalty from a regulatory body for non-compliance with data privacy laws. 公司是电商和SaaS领域内一个知名的公司，面临着因未遵守数据隐私法而被监管机构处以罚款的问题。

In response, the company gathered its leadership team to reach a consensus on how best to handle the situation and regain trust with their customers. 作为回应，公司召集其领导团队达成共识，制定最佳方案来处理这一情况，并重新赢得客户的信任。

They decided to invest heavily in an omnichannel customer service platform that would not only ensure compliance with regulations but also improve the overall customer experience. 他们决定大力投资于一个全渠道客户服务平台，不仅确保合规，而且还提高整体客户体验。

Over time, the company was able to turn the penalty into a positive outcome by demonstrating their commitment to data privacy and customer satisfaction through their investment in omnichannel technology. 随着时间的推移，公司通过对全渠道技术的投资，将罚款转化为正面结果，展示了他们致力于数据隐私和客户满意度的承诺。` };
}

const useStory = () => {
  const story = useRecoilValue(storyState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  // const loadStory = useRecoilCallback(({ set, snapshot }) => async () => {
  //   setLoading(true);
  //   try {
  //     const words = await snapshot.getPromise(wordsState);
  //     const {story: new_story} = await getFakeStory(words);
  //
  //     set(storyState, new_story);
  //   } catch(err) {
  //     setError(err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }, []);

  return {
    story,
    loading,
    error
  };
}

export {
  useStory,
  getStory,
  getFakeStory
}