const capitalizeKeys = (obj) => {
  const newObj = {};
  for (let key in obj) {
    const newKey = key.charAt(0).toUpperCase() + key.slice(1);
    newObj[newKey] = typeof obj[key] === "string" ? obj[key].trim() : obj[key];
  }

  return newObj;
};

export default capitalizeKeys;
