import { AiFillPicture  } from 'react-icons/ai'
import { TbSocial } from 'react-icons/tb'
import { TiVideo } from 'react-icons/ti'

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
  console.log("data", data);
  let words = [];
  for (const el of data) {
    let regex = /[A-Za-z]/g;
    if (typeof el?.insert === "string" && typeof el?.insert !== "object") {
      let word = el?.insert.match(regex);
      console.log("word", word);
      if (word === null) {
        words.push(0);
      } else if (word?.join('').includes("https")) {
        words.push(1);
      } else {
        words.push(word?.length);
      }
    }
  }
  console.log("words", words);
  let totalWordLength = words.reduce((acc, cur) => acc + cur, 0);
  console.log("word length: " + totalWordLength);
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
  console.log("range", range);

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
