module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "prismjs",
      {
        languages: ["javascript"],
        theme: "tomorrow",
        css: true,
      },
    ],
  ],
};
