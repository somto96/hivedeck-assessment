export const MENU_LINKS = [
  {
    id: 1,
    name: "Picture",
    subtitles: "jpeg, png",
  },
  {
    id: 2,
    name: "Video",
    subtitles: "JW player, Youtube, Vimeo",
  },
  {
    id: 3,
    name: "Social",
    subtitles: "Instagram, Twitter, TikTok, Snapchat, Facebook",
  },
];

export const wordCount = (data) => {
  let words = [];
  for (const el of data) {
    words.push(el?.text.length);
  }
  let totalWordLength = words.reduce((acc, cur) => acc + cur, 0);
  return totalWordLength;
};

export const TOOLBAR_OPTIONS = {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "link",
    "image",
    "history",
  ],

  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code",
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontSize: {
    // icon: fontSize,
    inDropdown: true,
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontFamily: {
    inDropdown: true,
    options: [
      "Arial",
      "Georgia",
      "Impact",
      "Tahoma",
      "Times New Roman",
      "Verdana",
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },

  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: "_blank",
    options: ["link"],
    linkCallback: undefined,
  },

  image: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: true,
    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    alt: { present: true, mandatory: false },
    defaultSize: {
      height: "auto",
      width: "auto",
    },
  },
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


export const SOCIAL_LINKS_INPUT_FIELDS = [

]
