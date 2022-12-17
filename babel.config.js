// babel.config.js
module.exports = {

  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'transform-class-properties',
    '@babel/plugin-proposal-unicode-property-regex' // data-grid https://stackoverflow.com/questions/71538720/react-native-ios-bundling-failed-useunicodeflag-is-not-a-valid-regexpu-core-op
  ]
};
