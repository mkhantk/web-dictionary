import { useState } from "react";
import "./App.css";
import Header from "./component/header";
import Loading from "./component/loading";
import { useSelector } from "react-redux";
import Display from "./component/display";

function App() {
  const theme = useSelector((state) => state.theme.value);
  const dictionary = useSelector((state) => state.dictionary.value);
  const font = useSelector((state) => state.font.value);
  const [loading, setLoading] = useState(null);
  console.log(dictionary);
  console.log(loading);
  console.log(font);

  return (
    <div
      className={`${
        theme === "dark" && "dark"
      } font-${font} min-h-screen w-full bg-neutral-200 text-gray-900 dark:bg-neutral-900 dark:text-gray-100 `}
    >
      <Header setLoading={setLoading} />
      <div className="relative w-full ">
        {loading !== null && <Loading loading={loading} />}
        {dictionary === null ? (
          <span className="inline-block w-full my-20 text-center text-gray-900/50 text-base dark:text-gray-100/50">
            Please Try again.
          </span>
        ) : (
          <>{dictionary.word && <Display />}</>
        )}
      </div>
    </div>
  );
}

export default App;
