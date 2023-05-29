import { useState } from "react";
import {useRecoilCallback, useRecoilState, useRecoilValue} from "recoil";
import {wordsState, wordsListState, wordWithIdState} from "./words.state";

import { HostURL } from '../config';
import {Word} from "../types";

export const useWords = () => {
  const words = useRecoilValue(wordsState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const loadWords = useRecoilCallback(({ set }) => async (words: Word[]) => {
    set(wordsListState, Object.keys(words));

    Object.entries(words).forEach(([id, word]) => {
      set(wordWithIdState(id), word as Word);
    });
  }, [])

  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${HostURL}/words`);
      const data = await response.json();
      await loadWords(data.words)
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFakeWords = async (group_id: string) => {
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if(group_id === '0') {
      await loadWords([
        {
          "word": {
            "english": "Penalty",
            "chinese": "罚款",
            "ipa": "/ˈpɛnəlti/",
            "partOfSpeech": "noun"
          },
          "example": {
            "sentence": "If the customer cancels an order, they may be subject to a penalty.",
            "translation": "如果客户取消订单，他们可能会被处以罚款。",
            "illustration": "In the illustration, a cartoon character representing a customer is shown with a sad expression, holding out a handful of coins. Another character, representing the ecommerce platform, towers over them and points sternly at a sign that reads 'Cancellation Penalty: 10% of Total Order Value'. The background is a blurry, dimmed-out image of a shopping cart.",
            "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111569655514026065/victor.zhou_In_the_illustration_a_cartoon_character_representin_8209d19d-c9dd-4d31-8aa0-fdc4f8309f1e.png"
          },
          "synonyms": [
            {
              "synonym": "Fine",
              "chinese": "罚款",
              "ipa": "/faɪn/",
              "partOfSpeech": "noun",
              "example": {
                "sentence": "The seller was fined for violating the terms of service.",
                "translation": "卖家因违反服务条款而被罚款。",
                "illustration": "The illustration shows a stack of coins with dollar signs on them, along with a gavel and law book. The background is a dark blue color with subtle patterns.",
                "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111577299272351805/victor.zhou_The_illustration_shows_a_stack_of_coins_with_dollar_a5968844-c0ba-49c5-94bc-a68bf668e136.png"
              }
            },
            {
              "synonym": "Sanction",
              "chinese": "制裁",
              "ipa": "/ˈsæŋkʃ(ə)n/",
              "partOfSpeech": "noun",
              "example": {
                "sentence": "The company was hit with severe sanctions for failing to comply with international trade regulations.",
                "translation": "该公司因未遵守国际贸易法规而受到严厉制裁。",
                "illustration": "In the illustration, a character representing the company is shown inside a jail cell, while outside the cell, a group of stern-looking officials are pointing fingers and scowling. The background is a muted grey color with faint bar-shaped patterns.",
                "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111578578384076851/victor.zhou_In_the_illustration_a_character_representing_the_co_217b6716-10b1-4bb4-843b-1b93d59e2ac8.png"
              }
            }
          ]
        },
        {
          "word": {
            "english": "Consensus",
            "chinese": "共识",
            "ipa": "/kənˈsɛnsəs/",
            "partOfSpeech": "Noun"
          },
          "example": {
            "sentence": "The team reached a consensus on the new pricing strategy.",
            "translation": "团队就新的定价策略达成了共识。",
            "illustration": "In the illustration, we see a group of people standing around a table, each holding up a puzzle piece. They are trying to fit the pieces together, but they can't seem to agree on how they should be arranged. Eventually, they start to talk and work together, until the puzzle is complete and everyone is happy with the result.",
            "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111585860924755968/victor.zhou_In_the_illustration_we_see_a_group_of_people_gather_3a41a90d-62ce-491d-8933-7be4a41d07a8.png"
          },
          "synonyms": [
            {
              "synonym": "Agreement",
              "chinese": "协议",
              "ipa": "/əˈɡriːmənt/",
              "partOfSpeech": "Noun",
              "example": {
                "sentence": "The two companies signed an agreement to collaborate on a new project.",
                "translation": "两家公司签署了一份合作新项目的协议。",
                "illustration": "In the illustration, we see two people shaking hands in front of a large document. The document contains all the details of their agreement, including the terms and conditions of the collaboration. They both appear happy and satisfied with the outcome of their negotiations.",
                "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111589011673337936/victor.zhou_In_the_illustration_we_see_two_people_shaking_hands_640c3f14-8dba-49a3-b943-e843fbea57ab.png"
              }
            },
            {
              "synonym": "Unanimity",
              "chinese": "一致",
              "ipa": "/juːnəˈnɪməti/",
              "partOfSpeech": "Noun",
              "example": {
                "sentence": "There was unanimity among the members of the board on the decision to invest in the new project.",
                "translation": "董事会成员在决定投资新项目方面达成了一致。",
                "illustration": "In the illustration, we see a group of people standing in a circle, holding hands. They are all smiling and looking at each other with satisfaction, as they have just reached a unanimous decision. The background is filled with bright colors and happy symbols, indicating a sense of positivity and agreement.",
                "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111590405415387186/victor.zhou_In_the_illustration_we_see_a_group_of_people_standi_86283fca-b03b-413d-b1ab-c2e50bde06d1.png"
              }
            }
          ]
        },
        {
          "word": {
            "english": "Omnichannel",
            "chinese": "全渠道",
            "ipa": "ˌɑmniˈtʃænəl",
            "partOfSpeech": "noun"
          },
          "example": {
            "sentence": "Our e-commerce store's omnichannel strategy integrates online and offline sales to provide a seamless shopping experience for customers.",
            "translation": "我们电子商务店的全渠道策略将线上和线下销售整合，为客户提供无缝购物体验。",
            "illustration": "An illustration of a customer walking into a physical store, scanning a QR code on a product with their phone, and being directed to the product page on the store's website. The customer can then either purchase the product online or in-store, depending on their preference.",
            "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111591870481567804/victor.zhou_An_illustration_of_a_customer_walking_into_a_physic_44c4a425-ac7c-4eae-a278-de2fd51896eb.png"
          },
          "synonyms": [
            {
              "synonym": "Omnipresence",
              "chinese": "无处不在",
              "ipa": "ˌɑmniˈprɛzns",
              "partOfSpeech": "noun",
              "example": {
                "sentence": "The company's omnipresence across various channels ensures that customers can access their products and services easily.",
                "translation": "公司在各个渠道的无处不在确保了客户能够轻松地接触到他们的产品和服务。",
                "illustration": "An illustration of a company logo appearing on multiple screens such as laptop, tablet, phone, smartwatch, TV, billboard, and physical storefront, symbolizing the brand's consistent presence across different channels.",
                "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111592317548249169/victor.zhou_An_illustration_of_a_company_logo_appearing_on_mult_21f9dec4-b8f3-4b7d-b4de-7caab7c1cdc1.png"
              }
            },
            {
              "synonym": "Multichannel",
              "chinese": "多渠道",
              "ipa": "ˌmʌltiˈtʃænəl",
              "partOfSpeech": "noun",
              "example": {
                "sentence": "The company's multichannel approach allows customers to purchase their products through different channels such as social media, marketplaces, and physical stores.",
                "translation": "公司的多渠道方法允许客户通过社交媒体、市场平台和实体店等不同渠道购买他们的产品。",
                "illustration": "An illustration of different shopping platforms such as social media, e-commerce marketplace, physical storefront, and mobile app with arrows indicating the flow of customers purchasing products from the company across multiple channels.",
                "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111592485349756978/victor.zhou_An_illustration_of_different_shopping_platforms_suc_ee7f395d-72f0-43f1-86a1-1a36c7679574.png"
              }
            }
          ]
        }
        ]
      );
    }
    if(group_id === '1') {
      await loadWords([
        {
          "word": {
            "english": "Low-hanging fruit",
            "chinese": "易得之果",
            "ipa": "loʊ ˈhæŋɪŋ frut",
            "partOfSpeech": "noun"
          },
          "example": {
            "sentence": "The company should focus on the low-hanging fruit first before tackling more complex tasks.",
            "translation": "公司应该先专注于易得之果，然后再解决更复杂的任务。",
            "illustration": "A cartoon image of a person standing on a ladder picking apples from a tree. The apples at the bottom of the tree are easy to reach and represent the low-hanging fruit.",
            "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111603052579921941/victor.zhou_A_cartoon_image_of_a_person_picking_apples_from_a_t_56184c74-e1b9-4676-a7a2-4b49f78d8217.png"
          },
          "synonyms": [
            {
              "synonym": "Easy win",
              "chinese": "易胜利",
              "ipa": "ˈizi wɪn",
              "partOfSpeech": "noun",
              "example": {
                "sentence": "This marketing campaign is an easy win for our company.",
                "translation": "这次营销活动对我们公司来说是一个易胜利的机会。",
                "illustration": "A graphic showing a sprinter easily crossing the finish line ahead of their competitors. The finish line represents the goal or target, and the other runners represent the competition. The sprinter represents the company achieving an easy win.",
                "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111606962740805662/victor.zhou_A_graphic_showing_a_sprinter_easily_crossing_the_fi_e9016767-c664-4a0e-b0d5-321bd3f08c15.png"
              }
            },
            {
              "synonym": "Quick win",
              "chinese": "快速赢得",
              "ipa": "kwɪk wɪn",
              "partOfSpeech": "noun",
              "example": {
                "sentence": "We need to focus on quick wins in order to build momentum for the project.",
                "translation": "我们需要专注于快速赢得，以建立项目的动力。",
                "illustration": "A graphic of a person climbing a staircase. The first step is labeled as a quick win and the subsequent steps are labeled as larger, more difficult tasks. The person reaching the top step represents achieving the project goal through focusing on quick wins.",
                "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111611115848351774/victor.zhou_A_graphic_of_a_person_climbing_a_staircase._The_fir_034c1eac-f767-4aa7-a39b-88d5ad909b50.png"

              }
            }
          ]
        },
        {
          "word": {
            "english": "Compliance",
            "chinese": "合规",
            "ipa": "/kəmˈplaɪəns/",
            "partOfSpeech": "noun"
          },
          "example": {
            "sentence": "The ecommerce platform must ensure compliance with local regulations.",
            "translation": "电商平台必须确保符合当地法规。",
            "illustration": "An image of a person standing on a scale representing the laws and regulations, holding up a thumbs up sign with a smile on their face to show that they're in compliance with the rules.",
            "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111613579465085029/victor.zhou_An_image_of_a_person_standing_on_a_scale_representi_c3bed990-6434-4252-b255-976bc13bfd67.png"
          },
          "synonyms": [
            {
              "synonym": "Adherence",
              "chinese": "遵守",
              "ipa": "/ədˈhɪrəns/",
              "partOfSpeech": "noun",
              "example": {
                "sentence": "SaaS providers must ensure adherence to their service level agreements.",
                "translation": "SaaS服务提供商必须确保遵守其服务级别协议。",
                "illustration": "An image of a person walking on a tightrope with a balancing pole, representing the need for SaaS providers to adhere to their service agreements.",
                "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111676486261411970/victor.zhou_An_image_of_a_person_walking_on_a_tightrope_with_a__eb248e91-fdc9-486e-8807-bb285048a7c0.png"
              }
            },
            {
              "synonym": "Conformity",
              "chinese": "符合，一致",
              "ipa": "/kənˈfɔːrməti/",
              "partOfSpeech": "noun",
              "example": {
                "sentence": "The ecommerce site's privacy policy must be in conformity with GDPR.",
                "translation": "电商网站的隐私政策必须符合GDPR。",
                "illustration": "An image of a puzzle with missing pieces being filled in to represent the need for ecommerce sites to conform to privacy laws and regulations.",
                "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111675930235121856/victor.zhou_An_image_of_a_puzzle_with_missing_pieces_being_fill_2666ffba-c2fe-41ff-ab7b-3ed6866d2ca7.png"
              }
            }
          ]
        },
        {
          "word": {
            "english": "Anomaly",
            "chinese": "异常",
            "ipa": "əˈnɒməli",
            "partOfSpeech": "noun"
          },
          "example": {
            "sentence": "The sudden drop in sales was an anomaly.",
            "translation": "销售额的突然下降是一种异常现象。",
            "illustration": "Imagine a line graph that shows a steady increase in sales over time. An anomaly would be a sudden dip or spike in that otherwise consistent trend, represented by an outlier point on the graph.",
            "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111673553927028737/victor.zhou_Imagine_a_line_graph_that_shows_a_steady_increase_i_eec171ec-efe3-431f-9c8c-9cf749f27082.png"
          },
          "synonyms": [
            {
              "synonym": "Aberration",
              "chinese": "离谱",
              "ipa": "ˌæbəˈreɪʃən",
              "partOfSpeech": "noun",
              "example": {
                "sentence": "The spike in website traffic was an aberration caused by a viral post.",
                "translation": "网站流量的激增是由病毒帖子引起的异常现象。",
                "illustration": "Imagine a bar chart showing daily website traffic. An aberration would be a single day with an abnormally high number of visitors, represented by a bar that sharply stands out from the other bars on the chart.",
                "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111673621228822578/victor.zhou_Imagine_a_bar_chart_showing_daily_website_traffic.__86783895-2d0e-4c79-8032-1613e91a56bb.png"
              }
            },
            {
              "synonym": "Irregularity",
              "chinese": "不规则性",
              "ipa": "ɪˌrɛɡjuˈlærəti",
              "partOfSpeech": "noun",
              "example": {
                "sentence": "The delay in shipment was an irregularity caused by an unexpectedly high demand.",
                "translation": "运输延误是由于意外高需求导致的不规则现象。",
                "illustration": "Imagine a scatter plot showing order fulfillment time vs. order quantity. An irregularity would be an order with an abnormally long fulfillment time, represented by a data point that falls far from the otherwise tight cluster of points on the plot.",
                "img_url": "https://cdn.discordapp.com/attachments/1092669345198518313/1111673700387930273/victor.zhou_Imagine_a_scatter_plot_showing_order_fulfillment_ti_290ceae4-29ce-4be4-8a58-bb9860905573.png"
              }
            }
          ]
        }
      ]);
    }

    setLoading(false)
  }

  return { words, fetchWords, fetchFakeWords, loading, error };
};
