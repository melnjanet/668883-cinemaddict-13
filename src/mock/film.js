import {getRandomInteger, getRandom} from "../utils/common.js";

const TEMPLATE_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non
                             porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut
                             lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
                             Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit,
                             eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi
                             sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac
                             porta dapibus. In rutrum ac purus sit amet tempus.`;

const filmDetails = [
  {
    name: `The Dance of Life`,
    origin: `The Dance of Life`,
    poster: `the-dance-of-life.jpg`
  },
  {
    name: `Sagebrush Trail`,
    origin: `Sagebrush Trail`,
    poster: `sagebrush-trail.jpg`
  },
  {
    name: `The Man with the Golden Arm`,
    origin: `The Man with the Golden Arm`,
    poster: `the-man-with-the-golden-arm.jpg`
  },
  {
    name: `Santa Claus Conquers the Martians`,
    origin: `Santa Claus Conquers the Martians`,
    poster: `santa-claus-conquers-the-martians.jpg`
  },
  {
    name: `Popeye the Sailor Meets Sindbad the Sailor`,
    origin: `Popeye the Sailor Meets Sindbad the Sailor`,
    poster: `popeye-meets-sinbad.png`
  },
];
const TotalRating = {
  MIN: 0,
  MAX: 10
};

const ages = [0, 6, 12, 16, 18];
const genres = [`Action`, `Comedy`, `Drama`, `Fantasy`, `Horror`, `Mystery`, `Romance`, `Thriller`, `Western`];
const countries = [`USA`, `Great Britain`, `Canada`, `Germany`, `Italy`, `Russia`, `Japan`, `South Korea`];
const directors = [`Anthony Mann`, `Stanley Kubrick`, `Otto Preminger`, `Martin Scorsese`, `Bong Joon Ho`, `Quentin Tarantino`];
const writers = [
  [`Anne Wigton`, `Heinz Herald`, `Richard Weil`],
  [`Robert Smith`],
  [`Walter Newman`, `Lewis Meltzer`, `Nelson Algren`, `Ben Hecht`],
  [`Jay Dratler `, `Karl Kamb`],
  [`Nunnally Johnson`, `J.H. Wallis`]
];
const stars = [
  [`Mickey Rooney`, `Jeanne Cagney`, `Barbara Bates`],
  [`Frank Sinatra`, `Kim Novak`, `Eleanor Parker`],
  [`Dick Powell`, `Lizabeth Scott`, `Jane Wyatt`],
  [`Edward G. Robinson`, `Joan Bennett`, `Raymond Massey`],
  [`Erich von Stroheim`, `Mary Beth Hughes`, ` Dan Duryea`]
];

const runtimes = [`1h 55m`, `54m`, `1h 59m`, `1h 21m`, `16m`];

const releaseDate = [`1945-03-30`, `1955-12-14`, `1929-08-16`, `1969-12-15`, `1982-04-57`];
const DescriptionsCount = {
  MIN: 1,
  MAX: 5,
};

const CommentsCount = {
  MIN: 0,
  MAX: 4,
};

const generateRandomData = (data) => {
  const randomIndex = getRandomInteger(0, data.length - 1);

  return data[randomIndex];
};

const generateDescription = () => {
  const descriptions = TEMPLATE_DESCRIPTION.split(`.`);
  let randomDescriptions = [];

  const randomCount = getRandomInteger(DescriptionsCount.MIN, DescriptionsCount.MAX);

  for (let i = 0; i < randomCount; i++) {
    randomDescriptions.push(descriptions[i]);
  }

  return randomDescriptions.join(`.`) + `.`;
};

const generateFilmInfo = () => {
  const randomIndex = getRandomInteger(0, filmDetails.length - 1);

  return filmDetails[randomIndex];
};

export const generateFilmCard = () => {
  const filmInfo = generateFilmInfo();
  return {
    name: filmInfo.name,
    originalName: filmInfo.origin,
    poster: filmInfo.poster,
    releaseDate: generateRandomData(releaseDate),
    director: generateRandomData(directors),
    writers: generateRandomData(writers),
    actors: generateRandomData(stars),
    country: generateRandomData(countries),
    runtime: generateRandomData(runtimes),
    genre: new Array(getRandomInteger(1, genres.length - 1)).fill().map((currentElement, index) => genres[index]),
    age: generateRandomData(ages),
    totalRating: getRandom(TotalRating.MIN, TotalRating.MAX),
    commentsCount: getRandomInteger(CommentsCount.MIN, CommentsCount.MAX),
    description: generateDescription(),
    comments: getRandomInteger(CommentsCount.MIN, CommentsCount.MAX),
    isWatchList: Boolean(getRandomInteger(0, 1)),
    isHistory: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
