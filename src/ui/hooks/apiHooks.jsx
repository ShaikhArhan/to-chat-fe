export const useApi = async (type, method, path, data) => {
    try {
        const module = await import("../api/api.js");
        if (module[method]) {
            const result = await module[method]({ type, path, data });
            return result;
        } else {
            throw new Error(`Method ${method} not found in api.js`);
        }
    } catch (error) {
        console.log("-useApi -error", error);
        return error
    }
};

// import { useEffect, useState } from "react";

// export const useApi = (type, method, path, data) => {
//   const [resultData, setResultData] = useState();

//   const fetchData = async () => {
//     try {
//       const module = await import("../api/api.js");
//       if (module[method]) {
//         const result = await module[method]({ type, path, data });
//         setResultData(result);
//       } else {
//         throw new Error(`Method ${method} not found in api.js`);
//       }
//     } catch (err) {
//       console.error("useApi - error", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [type, method, path, data]);

//   return resultData;
// };
