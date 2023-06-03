const useCapitalize = () => {
  const capitalizeWords = (words) => {
    return words
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const extractFirstWord = (words) => {
    return capitalizeWords(words).split(" ")[0];
  };

  return { capitalizeWords, extractFirstWord };
};

export default useCapitalize;
