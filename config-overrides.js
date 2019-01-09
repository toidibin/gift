// const { injectBabelPlugin } = require('react-app-rewired');
const {
    override,
    fixBabelImports,
    addLessLoader,
} = require("customize-cra");
// module.exports = override(config, env) {
//     // do stuff with the webpack config...
//     config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
//     return config;
// };

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd-mobile",
        libraryDirectory: "es",
        style: true // change importing css to less
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { "@primary-color": "#1DA57A" }
    })
);