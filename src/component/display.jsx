import React from "react";
import { useSelector } from "react-redux";

function Display() {
  const dictionary = useSelector((state) => state.dictionary.value);

  const audio = new Audio(
    `${dictionary.soundUrl}/${dictionary.sound.split("")[0]}/${
      dictionary.sound
    }.mp3`
  );
  console.log(audio);

  function handlePlay() {
    audio.play();
  }
  return (
    <div className="p-5 z-40">
      <div className="grid grid-cols-5 grid-rows-3 justify-center items-center mb-5">
        <div className="text-4xl font-bold col-span-4 row-span-2">
          {dictionary.word}
        </div>
        <div className="row-start-3 col-span-5 text-blue-500">
          /{dictionary.phonetic}/
        </div>
        <div className="col-start-5 row-start-1 row-span-2 m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8 text-blue-500/50"
            onClick={() => handlePlay()}
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {dictionary.partOfSpeech.map((item, index) => (
          <div key={index}>
            <div className="text-xl font-bold text-gray-900 my-5 dark:text-gray-200">
              {item.pos}
            </div>
            <ul className="list-disc pl-5 flex flex-col justify-center items-start gap-3 text-gray-900/80 mb-5 text-base dark:text-gray-200/80">
              {item.def.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-5 my-5">
        <h2 className="font-bold">Examples: </h2>
        {dictionary.example.examples.map((item, index) => (
          <blockquote
            key={index}
            className="p-2 text-gray-900/80 dark:text-gray-200/80"
          >
            "{item.text}"
          </blockquote>
        ))}
      </div>
      {dictionary.synonyms[0].relationshipType === "synonym" && (
        <div className="flex justify-start items-center flex-wrap gap-1 my-5 text-gray-900/80 dark:text-gray-200/80">
          <h2 className="text-gray-900 font-bold dark:text-gray-200">
            Related Words:{" "}
          </h2>
          {dictionary.synonyms[0].words.map((item, index, array) => {
            if (!/\d/.test(item) && !item.includes(" ")) {
              if (index !== array.length - 1) {
                return <span key={index}>{item},</span>;
              } else {
                return <span key={index}>{item}</span>;
              }
            }
          })}
        </div>
      )}
    </div>
  );
}

export default Display;
