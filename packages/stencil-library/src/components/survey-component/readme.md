# survey-component



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type  | Default     |
| ------------ | ------------- | ----------- | ----- | ----------- |
| `surveyData` | `survey-data` |             | `any` | `undefined` |


## Dependencies

### Depends on

- [progress-bar](../progress-bar)
- [page-component](../page-component)
- [recommendation-card](../recommendation-card)

### Graph
```mermaid
graph TD;
  survey-component --> progress-bar
  survey-component --> page-component
  survey-component --> recommendation-card
  page-component --> radio-question
  page-component --> text-question
  page-component --> checkbox-question
  page-component --> boolean-question
  style survey-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
