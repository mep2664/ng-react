import LocalizedStrings from "localized-strings";

const english = {
    TODO: "TODO: Create Localized Strings!",
};

const strings = new LocalizedStrings({
    en: {
        ...english,
    },
});
export default strings;
