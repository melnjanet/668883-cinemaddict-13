import {EMOJIS} from "../const.js";

export const generateComments = () => {
  return [
    {
      emoji: EMOJIS[0],
      text: `Interesting setting and a good cast`,
      author: `Tim Macoveev`,
      date: `2019/12/31 23:59`
    },
    {
      emoji: EMOJIS[1],
      text: `Booooooooooring`,
      author: `John Doe`,
      date: `2 days ago`
    },
    {
      emoji: EMOJIS[2],
      text: `Very very old. Meh`,
      author: `John Doe`,
      date: `2 days ago`
    },
    {
      emoji: EMOJIS[3],
      text: `Almost two hours? Seriously?`,
      author: `John Doe`,
      date: `Today`
    }
  ];
};
