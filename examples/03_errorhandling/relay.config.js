module.exports = {
  language: 'typescript',
  // eslint-disable-next-line no-undef
  src: `${__dirname}/src`,
  // eslint-disable-next-line no-undef
  schema: `${__dirname}/data/schema.graphql`,
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
};
