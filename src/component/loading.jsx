import React, { useEffect, useState } from "react";

function Loading({ loading }) {
  // how do i make it so that, the loading is relaoded every time i seawrch, for example adding a dependicy state, like sewarch excute
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      setShow(true);
      clearTimeout(timer);
    };
  }, [loading]);

  if (!show) return null;
  return (
    <div
      className={`absolute inset-0 z-50 bg-neutral-200 flex justify-center items-center dark:bg-neutral-900 text-center text-gray-900/50 text-base dark:text-gray-200/50 `}
    >
      <span className="">loading...</span>
    </div>
  );
}

export default Loading;
