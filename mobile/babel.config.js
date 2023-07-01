module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          allowList: null,
          blocklist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        "module-resolver",
        {
          alias: {
            src: "./src",
            fakeData: "./fakeData",
            assets: "./assets",
          },
        },
      ],
    ],
  };
};
