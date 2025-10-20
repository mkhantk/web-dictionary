import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_KEY_WORDNIK = import.meta.env.VITE_API_KEY_WORDNIK;

export const fetchData = async (word) => {
  const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${API_KEY}`;
  try {
    const response = await axios.get(url);

    if (response.data[0].hwi) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
  }
};

export const structureData = async (data) => {
  let dictionary = {};
  dictionary.word = await data[0].meta.id.split(":")[0];
  dictionary.phonetic = (await data[0].hwi.prs[0].mw)
    ? data[0].hwi.prs[0].mw
    : "unavailable";
  dictionary.sound = (await data[0].hwi.prs[0].sound.audio)
    ? data[0].hwi.prs[0].sound.audio
    : "unavailable";
  dictionary.soundUrl =
    "https://media.merriam-webster.com/audio/prons/en/us/mp3";

  // what to do is to figure out how many hom are there in the dict and them map them to create an array of parof speech adn it's definitions.
  // the best possible outcome would be creating another object in the main object.
  dictionary.partOfSpeech = await data
    .filter(
      (item) =>
        Object.hasOwn(item, "hom") &&
        item.meta.id.split(":")[0] === data[0].meta.id.split(":")[0]
    )
    .map((item) => ({ pos: item.fl, def: item.shortdef }));
  // dictionary.partOfSpeech = (await data[0].fl) ? data[0].fl : "unavailable";
  // dictionary.definitions = (await data[0].shortdef)
  //   ? data[0].shortdef
  //   : "unavailable";

  dictionary.example = await getExample(data[0].meta.id.split(":")[0]);
  dictionary.synonyms = await getSynonyms(data[0].meta.id.split(":")[0]);

  console.log(dictionary);
  return dictionary;
};

async function getExample(word) {
  const url = `https://api.wordnik.com/v4/word.json/${word}/examples?useCanonical=false&limit=3&api_key=${API_KEY_WORDNIK}
`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch {
    return "";
  }
}

async function getSynonyms(word) {
  const url = `https://api.wordnik.com/v4/word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=${API_KEY_WORDNIK}
`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch {
    return "";
  }
}
// okay so i will the the api link from the website and paste it here.
// then i will request it after i call the strucure data. then i will make it so that only when the synonyms are not there then i will get the related word api . if not, i'll just fetch from the mw api
