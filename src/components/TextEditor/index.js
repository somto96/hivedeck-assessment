import React, { useCallback, useState, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./editor.css";
import { useAppState } from "utils/context/AppContext";
import { wordCount } from "components/constants";

export const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, false] }],
  ["link", "image"],
  [{ align: [] }],
  ["bold", "italic"],
  [{ list: "ordered" }, { list: "bullet" }, "blockquote"],
];

export const TextEditor = () => {
  const { addToState, totalWordCount } = useAppState();
  const [quill, setQuill] = useState();

  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper === null) return;

      wrapper.innerHTML = "";
      const editor = document.createElement("div");
      wrapper.append(editor);
      const q = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
        placeholder: "Add content",
      });
      setQuill(q);
      addToState(q);
    },
    [addToState]
  );

  useEffect(() => {
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      const words = wordCount(quill?.getContents()?.ops);
      totalWordCount(words);
    };
    quill?.on("text-change", handler);

    return () => {
      quill?.off("text-change", handler);
    };
  }, [quill, totalWordCount]);

  return <div id="container" ref={wrapperRef}></div>;
};
