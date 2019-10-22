import LocalizedStrings from "localized-strings";

const english = {
    SystemName: "SystemName",
    TODO: "TODO: Create Localized Strings!",

    // Action
    Action_LearnMore: "Learn More",
};

const strings = new LocalizedStrings({
    en: {
        ...english,
    },
});
export default strings;
