import { useEffect, useState } from "react";
import JwtInput from "./components/JwtInput";

function App() {
  const [darkmode, setdarkmode] = useState(
    JSON.parse(localStorage.getItem("dark")) || false
  );

  useEffect(() => {
    darkmode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
    localStorage.setItem("dark", darkmode);
  }, [darkmode]);

  return (
    <main className="dark:bg-slate-900 dark:bg-gradient-to-tl dark:from-[#122335] dark:to-[#050e05] min-h-screen py-1 ">
      <div className="max-w-screen-lg min-h-[95vh] shadow-xl  mx-auto  px-12 max-sm:px-8 relative  border border-gray-200 dark:border-gray-700 rounded-lg ">
        <h1 className="uppercase font-serif dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r to-[#12cdc7] from-[#43b972]  dark:text-white text-center mt-4 max-sm:text-2xl max-sm:text-left font-semibold tracking-widest text-3xl">
          jwt decoder
        </h1>
        <span
          onClick={() => setdarkmode(!darkmode)}
          className={`absolute max-sm:top-4 max-sm:right-8 max-sm:px-4 max-sm:py-1 right-14 cursor-pointer top-5 hover:scale-95 transition-all duration-200 ease-linear flex items-center px-4 py-2 gap-2  ${
            darkmode
              ? "bg-[#bd8922] hover:bg-orange-700"
              : "bg-blue-500 hover:bg-blue-700"
          }    rounded-lg text-white capitalize`}
        >
          {darkmode ? (
            <i className="bi bi-brightness-high-fill"></i>
          ) : (
            <i className="bi bi-moon-fill"></i>
          )}
          <p className="max-sm:hidden">{darkmode ? "lightmode" : "darkmode"}</p>
        </span>
        <JwtInput />
      </div>
    </main>
  );
}

export default App;
