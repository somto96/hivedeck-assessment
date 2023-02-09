import { AiFillPicture } from "react-icons/ai";
import { TbSocial } from "react-icons/tb";
import { TiVideo } from "react-icons/ti";

export const MENU_LINKS = [
  {
    id: 1,
    name: "Picture",
    Icon: AiFillPicture,
    subtitles: "jpeg, png",
  },
  {
    id: 2,
    name: "Video",
    Icon: TiVideo,
    subtitles: "Embed a YouTube video",
  },
  {
    id: 3,
    name: "Social",
    Icon: TbSocial,
    subtitles: "Embed a Facebook link",
  },
];

export const wordCount = (data) => {
  let words = [];
  for (const el of data) {
    let regex = /[A-Za-z]/g;
    if (typeof el?.insert === "string" && typeof el?.insert !== "object") {
      let word = el?.insert.match(regex);
      if (word === null) {
        words.push(0);
      } else if (word?.join("").includes("https")) {
        words.push(1);
      } else {
        words.push(word?.length);
      }
    }
  }
  let totalWordLength = words.reduce((acc, cur) => acc + cur, 0);
  return totalWordLength;
};

/**
 *
 * @param {String} type
 * @param {Object} quill
 * @param {String} url
 */

export const handleEmbed = (type, quill, url) => {
  let range = quill?.getSelection(true);

  quill?.insertText(range?.index, "\n", "user");
  type === "link"
    ? quill?.insertText(range?.index + 1, url, "link", url)
    : quill?.insertEmbed(
        range?.index + 1,
        `${type === "image" ? "image" : "video"}`,
        url
      );
  quill?.setSelection(range?.index + 2, "silent");
};

/**
 * Reads a file object and returns the data URL
 *
 * @param {File} file File object to be read
 * @returns {string} Data URL
 */
export const readFileToDataUrl = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });

/**
 *
 * @param {String} url
 * @returns {String} Embed URL
 */
export const formatUrl = (url) => {
  const urlId = url?.includes("https://youtu.be")
    ? url?.substring(17, 28)
    : url?.substring(32, 43);
  const embedUrl = `https://www.youtube.com/embed/${urlId}`;
  return embedUrl;
};
