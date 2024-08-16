# page-component



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute   | Description | Type                                     | Default     |
| --------------------- | ----------- | ----------- | ---------------------------------------- | ----------- |
| `questions`           | `questions` |             | `any`                                    | `undefined` |
| `unansweredQuestions` | --          |             | `string[]`                               | `undefined` |
| `updateAnswers`       | --          |             | `(key: string, value: string[]) => void` | `undefined` |


## Dependencies

### Used by

 - [survey-component](../survey-component)

### Depends on

- [radio-question](../radio-question)
- [text-question](../text-question)
- [checkbox-question](../checkbox-question)
- [boolean-question](../boolean-question)

### Graph
```mermaid
graph TD;
  page-component --> radio-question
  page-component --> text-question
  page-component --> checkbox-question
  page-component --> boolean-question
  survey-component --> page-component
  style page-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
