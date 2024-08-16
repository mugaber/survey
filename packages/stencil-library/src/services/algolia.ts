import algoliasearch from 'algoliasearch/lite'

const searchClient = algoliasearch(
  '4WK61QBPDU',
  'a3a8a3edba3b7ba9dad65b2984b91e69'
);

const searchIndex = searchClient.initIndex('algolia-recommendation-data')

export default searchIndex
