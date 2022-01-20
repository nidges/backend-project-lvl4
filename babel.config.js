module.exports = {
  presets: [
    [
      '@babel/preset-env', {
      // targets надо указывать обязательно чтобы не было ошибки
      // в jest - regeneratorRuntime is not defined
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
