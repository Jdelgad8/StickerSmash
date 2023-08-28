module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            assets: "./assets",
            buttons: "./components/Button",
            components: "./components",
            constants: "./constants",
            emojis: "./components/Emoji",
            helpers: "./helpers",
            modals: "./components/Modal",
            text: "./components/Text",
            theme: "./constants/styles/theme",
          },
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
    ],
  };
};
