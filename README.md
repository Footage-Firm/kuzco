# kuzco
React Component for product-agnostic NPS survey

### Usage

```javascript
<NPSModal mainQuestion={'How likely are you to recommend our product to a friend?'}/>
```

Promoter, neutral, and detractor follow up questions are built in.

Use product-specific rules engine to determine when to add the modal to the ReactDOM.

### Props

| Property              | Type          | Required      | Description                                                             |
| --------------------- | ------------- |---------------|-------------------------------------------------------------------------|
| Main Question         | String        | Yes           | Product specific first question.                                        |
| Application Endpoint  | String        | No            | API endpoint to send data to application in addition to event pipeline. |


###Demo

Run `npm run example`
Go to `localhost:8080`