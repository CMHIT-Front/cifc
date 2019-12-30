export default {
  esm: "babel",
  cjs: "babel",
  extraBabelPlugins: [
    [
      "babel-plugin-import",
      {
        libraryName: ["antd", "antd-mobile"],
        libraryDirectory: "es",
        style: true
      }
    ]
  ]
};
