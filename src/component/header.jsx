import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDark, changeLight } from "../states/theme/themeSlice";
import { updateDict } from "../states/dictSlice/dictSlice";
import { fetchData, structureData } from "./api";
import { changeFont } from "../states/fontSlice/fontSlice";

function Header({ setLoading }) {
  const theme = useSelector((state) => state.theme.value);
  const font = useSelector((state) => state.font.value);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  function handleCheck() {
    if (theme === "light") {
      dispatch(changeDark());
    } else {
      dispatch(changeLight());
    }
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (search !== "") {
        handleApi(search);
        dispatch(updateDict(""));
        setSearch("");

        setLoading((prev) => {
          if (prev === null) {
            return true;
          } else {
            return !prev;
          }
        });
      }
    }
  }
  // when i hit enter, and if it is not empty, the search will go to api.

  async function handleApi(word) {
    let searchWord = await word.toLocaleLowerCase();
    try {
      const dict = await fetchData(searchWord);

      if (dict.length < 1) throw new Error();

      const data = await structureData(dict);
      dispatch(updateDict(data));
    } catch (error) {
      console.error("there seems to be some error. please try again", error);
      dispatch(updateDict(null));
    }
  }

  return (
    <div className="w-full mb-5">
      <div className="flex justify-between items-center gap-5 p-5 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 dark:text-gray-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>

        <div>
          <select
            name="font"
            id="font"
            className=" w-32 bg-neutral-200 p-2 focus:outline-none dark:bg-neutral-900"
            onChange={(e) => {
              dispatch(changeFont(e.target.value));
            }}
            defaultValue={font}
          >
            <option value="open-sans" className="font-open-sans w-full ">
              Sans-Serif
            </option>
            <option
              value="merriweather"
              className="font-merriweather w-full   "
            >
              Serif
            </option>
            <option value="roboto-mono" className="font-roboto-mono w-full ">
              Mono
            </option>
          </select>
        </div>
        <div className="flex justify-center items-center gap-2">
          <label htmlFor="theme">
            <div className="relative">
              <input
                type="checkbox"
                name="theme"
                id="theme"
                className="sr-only"
                onChange={() => {
                  handleCheck();
                }}
              />
              <div className="block w-8 h-4.5 rounded-full bg-neutral-900/50 dark:bg-neutral-200"></div>
              <span
                className={`w-3.5 h-3.5 rounded-full bg-neutral-200 absolute left-0.5 top-0.5 transition-transform duration-300 dark:bg-neutral-900/50 ${
                  theme === "dark" ? "translate-x-full " : "translate-x-none"
                }`}
              ></span>
            </div>
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </div>
      </div>
      <div className="w-full my-5">
        <div className="relative w-4/5 m-auto">
          <div className="absolute left-1.5 top-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-gray-900 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <textarea
            name="search"
            id="search"
            rows={1}
            placeholder="search"
            autoComplete="off"
            autoCapitalize="off"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => handleEnter(e)}
            className="px-8  py-1 w-full rounded-full focus:outline-none bg-neutral-400/50"
          ></textarea>
          {search && search.length > 1 && (
            <button
              className="absolute right-1.5 top-1.5"
              onClick={() => setSearch("")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-gray-900 dark:text-gray-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
