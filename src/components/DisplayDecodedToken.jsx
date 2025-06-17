const DisplayDecodedToken = ({
  jwttoken,
  decoded,
  error,
  copied,
  handleCopy,
}) => {
  const istokenexpired = decoded?.Payload?.exp < Math.floor(Date.now() / 1000);
  return (
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
          <p
            className={`${
              istokenexpired ? "text-red-500" : "text-green-500"
            } text-center capitalize font-semibold text-xl`}
          >
            {istokenexpired ? "token is expired" : "token is valid"}
          </p>

          <div className="relative">
            <div className="absolute right-4 top-11 cursor-pointer gap-1 rounded-lg flex justify-center items-center   ">
              <span
                className="max-sm:text-sm"
                onClick={() =>
                  handleCopy(JSON.stringify(decoded.Header, null, 2), "header")
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
                handleCopy(JSON.stringify(decoded.Payload, null, 2), "payload")
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
            <p className="text-2xl max-sm:text-xl  capitalize ">signature:</p>
            <div className="min-h-24 border-gray-400 border  dark:bg-gray-700 bg-gray-200 rounded-md p-4 mt-2 shadow-lg ">
              <p className="max-w-[380px] max-sm:max-w-40">
                {" "}
                {decoded.signature}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayDecodedToken;
