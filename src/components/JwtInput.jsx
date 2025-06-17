import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
        }, 5000);
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
              onClick={() => {
                setJwtToken("");
                setDecoded(null);
                localStorage.removeItem("jwttoken");
                localStorage.removeItem("decoded");
              }}
              className="rounded-lg text-lg  bg-gray-200 px-6 py-2 max-sm:px-4  font-semibold capitalize hover:bg-gray-300 active:scale-95 transition-all duration-150 ease-linea "
            >
              clear
            </button>
          </div>
        </div>

        {/* displaye decoded tokens */}
        <div className="flex flex-col gap-4 dark:text-white py-2 max-sm:mt-4">
          {error && jwttoken.length > 0 && (
            <div className="text-red-500 text-xl capitalize text-center font-semibold">
              {error}
            </div>
          )}
          {!decoded && (
            <div className="text-xl capitalize text-center font-semibold dark:text-white">
              <h1> your decoded token will displayed here...</h1>
            </div>
          )}
          {decoded && !error && (
            <>
              <div className="relative">
                <div className="absolute right-4 top-11 cursor-pointer gap-1 rounded-lg flex justify-center items-center   ">
                  <span
                    className="max-sm:text-sm"
                    onClick={() =>
                      handleCopy(
                        JSON.stringify(decoded.Header, null, 2),
                        "header"
                      )
                    }
                  >
                    {copied === "header" ? (
                      "✅copied"
                    ) : (
                      <>
                        <i className="bi bi-copy text-sm"></i>
                        <span className="ml-1">copy</span>
                      </>
                    )}
                  </span>
                </div>
                <p className="text-2xl max-sm:text-xl  capitalize ">header:</p>
                <div className="min-h-24 border-gray-400 border bg-gray-200 dark:bg-gray-700 rounded-md p-4 mt-2 shadow-lg  ">
                  <p> {JSON.stringify(decoded.Header, null, 2)}</p>
                </div>
              </div>
              <div className="relative">
                <div
                  onClick={() =>
                    handleCopy(
                      JSON.stringify(decoded.Payload, null, 2),
                      "payload"
                    )
                  }
                  className="absolute right-4 max-sm:text-sm top-11 cursor-pointer gap-1 rounded-lg flex justify-center items-center   "
                >
                  {copied === "payload" ? (
                    "✅copied"
                  ) : (
                    <>
                      <i className="bi bi-copy text-sm"></i>
                      <span className="ml-1">copy</span>
                    </>
                  )}
                </div>
                <p className="text-2xl max-sm:text-xl  capitalize ">Payload:</p>
                <div className="min-h-24 border-gray-400 border dark:bg-gray-700 bg-gray-200 rounded-md p-4 mt-2 shadow-lg ">
                  <p className="max-sm:text-sm max-sm:max-w-52">
                    {JSON.stringify(decoded.Payload, null, 2)}
                  </p>
                </div>
              </div>
              <div className="relative">
                <div
                  onClick={() => handleCopy(decoded.signature, "signature")}
                  className="absolute right-4 top-11 max-sm:text-sm cursor-pointer gap-1 rounded-lg flex justify-center items-center   "
                >
                  {copied === "signature" ? (
                    "✅copied"
                  ) : (
                    <>
                      <i className="bi bi-copy text-sm"></i>
                      <span className="ml-1">copy</span>
                    </>
                  )}
                </div>
                <p className="text-2xl max-sm:text-xl  capitalize ">
                  signature:
                </p>
                <div className="min-h-24 border-gray-400 border  dark:bg-gray-700 bg-gray-200 rounded-md p-4 mt-2 shadow-lg ">
                  <p className="max-w-[380px] max-sm:max-w-40"> {decoded.signature}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default JwtInput;
