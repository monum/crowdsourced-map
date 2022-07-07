const useLocalStorage = (key) => {
  const getItem = () => {
    return JSON.parse(window.localStorage.getItem(key));
  };

  const setItem = (item) => {
    window.localStorage.setItem(key, JSON.stringify(item));
  };

  const remove = () => {
    window.localStorage.removeItem(key);
  };

  return { getItem, setItem, remove };
};

export default useLocalStorage;
