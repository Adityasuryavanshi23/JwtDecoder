import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DisplayDecodedToken from "./DisplayDecodedToken";

const JwtInput = () => {
  const [jwttoken, setJwtToken] = useState(
    JSON.parse(localStorage.getItem("jwttoken")) || ""
  );
  const [decoded, setDecoded] = useState(null);
  const [error, seterror] = useState("");
  const [copied, setcopied] = useState(null);
  const [autodecode, setautodecode] = useState(
    JSON.parse(localStorage.getItem("autodecode"))
  );

  const handleautodecode = () => {
    setautodecode(!autodecode);
    localStorage.setItem("autodecode", !autodecode);
  };

  const handleCopy = (text, section) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setcopied(section);
        setTimeout(() => {
          setcopied(null);
        }, 2000);
        toast.success("copied to clipboard");
      })
      .catch(() => {
        toast.error("failed to copy");
      });
  };

  const handleDecode = () => {
    try {
      const parts = jwttoken.split(".");

      if (parts.length !== 3) {
        seterror("invalid token format");
        return;
      }

      const Payload = jwtDecode(jwttoken.replace(/\s/g, ""));
      const Header = JSON.parse(atob(parts[0]));
      const signature = parts[2];
      localStorage.setItem("jwttoken", JSON.stringify(jwttoken));

      setDecoded({
        Payload,
        Header,
        signature,
      });
      localStorage.setItem(
        "decoded",
        JSON.stringify({
          Payload,
          Header,
          signature,
        })
      );

      seterror(null);
    } catch {
      seterror("invalid JWT token");
      setDecoded({});
    }
  };
  useEffect(() => {
    if (autodecode && jwttoken.trim()) {
      handleDecode();
    } else {
      const decodedData = localStorage.getItem("decoded");
      if (decodedData) {
        setDecoded(JSON.parse(decodedData));
      }
    }
  }, [jwttoken, autodecode]);
  return (
    <>
      {/* jwt input section */}
      <div className="mt-4">
        <textarea
          name="jwttoken"
          value={jwttoken}
          onChange={(e) => setJwtToken(e.target.value)}
          type="text"
          placeholder="paste your jwt token...."
          className="placeholder:capitalize border border-gray-400 bg-gray-100 dark:bg-slate-700 rounded-md shadow-lg focus:outline-none w-full min-h-32 mt-4 p-3  resize-none font-mono dark:placeholder:text-white dark:text-white"
        ></textarea>
      </div>

      <div>
        {/* autodecode and buttons section */}
        <div className="flex gap-3 justify-between mt-2 min-h-10 max-sm:mt-4">
          <label
            htmlFor="checkbox"
            className="flex gap-1 items-center capitalize cursor-pointer dark:text-white "
          >
            <input
              type="checkbox"
              id="checkbox"
              checked={autodecode}
              className="cursor-pointer"
              onChange={handleautodecode}
            />
            autodecode
          </label>

          <div className="flex gap-2 ">
            {!autodecode && (
              <button
                onClick={handleDecode}
                disabled={jwttoken.length === 0}
                className={`text-lg rounded-lg bg-blue-600 text-white font-semibold capitalize px-6 py-2 max-sm:px-3 hover:bg-blue-900 active:scale-95 transition-all duration-150 ease-linear ${
                  jwttoken.length === 0 && "opacity-50 cursor-not-allowed"
                }`}
              >
                decode
              </button>
            )}
            <button
              disabled={jwttoken.length === 0}
              onClick={() => {
                setJwtToken("");
                setDecoded(null);
                localStorage.removeItem("jwttoken");
                localStorage.removeItem("decoded");
              }}
              className={`${
                jwttoken.length === 0 ? "opacity-40 cursor-not-allowed" : ""
              } rounded-lg text-lg  bg-gray-200 px-6 py-2 max-sm:px-4  font-semibold capitalize hover:bg-gray-300 active:scale-95 transition-all duration-150 ease-linea `}
            >
              clear
            </button>
          </div>
        </div>

        {/* display decoded token component */}
        <DisplayDecodedToken
          jwttoken={jwttoken}
          decoded={decoded}
          error={error}
          copied={copied}
          handleCopy={handleCopy}
        />
      </div>
    </>
  );
};

export default JwtInput;
