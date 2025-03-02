// import moduleName from '../api/api'
export const dynamicImportApi = async (filename, functionName, ...args) => {
  // try {
  //   const module = await import(`../api/${filename}.js`);
  //   if (module[functionName]) {
  //     const result = await module[functionName](...args);      
  //     return result;
  //   } else {
  //     throw new Error(`Function ${functionName} not found in ${filename}.js`);
  //   }
  // } catch (error) {
  //   console.error('Error during dynamic import or function call:', error);
  // }
};

// export const dynamicImportApi = async (filename, functionName, ...args) => {
//   try {
//     const module = await import(`../api/${filename}.js`);
//     if (module[functionName]) {
//       const result = await module[functionName](...args);
//       return result;
//     } else {
//       throw new Error(`Function ${functionName} not found in ${filename}.js`);
//     }
//   } catch (error) {
//     console.error('Error during dynamic import or function call:', error);
//   }
// };
