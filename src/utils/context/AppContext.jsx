import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();
const AppContextWrapper = ({ children }) => {
  const [quill, setQuill] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [wordCount, setWordCount] = useState();

  const addToState = useCallback((payload) => {
    setQuill(payload);
  }, []);

  const addImageUploadUrl = useCallback((payload) => {
    setImageUrl(payload);
  }, []);

  const totalWordCount = useCallback((payload) => {
    setWordCount(payload);
  }, []);

  const data = useMemo(
    () => ({
      addToState,
      addImageUploadUrl,
      totalWordCount,
      wordCount,
      imageUrl,
      quill,
    }),
    [addToState, addImageUploadUrl, totalWordCount, wordCount, imageUrl, quill]
  );
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

AppContextWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const useAppState = () => useContext(AppContext);

export default AppContextWrapper;
