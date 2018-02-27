# kuzco
React Component for product-agnostic NPS survey

### Usage

```javascript
<NPSModal
    mainQuestion={'How likely are you to recommend our product to a friend?'}
    promoterFollowUpQuestion={`We're so happy you're happy! We'd love to hear more about your experience:`}
    neutralFollowUpQuestion={`How can we improve your experience?`}
    detractorFollowUpQuestion:={`We're sorry you feel that way! What is our product missing?`}
    
    maxScore={10}
    detractorUpperBound={6}
    promoterLowerBound={9}
    
    onScoreClick={(score, question) => {alert('User selected ' + score + ' when asked ' + question)}}
    onCommentSubmit={(comment, question) => {alert('User entered ' + comment + ' when asked ' + question)}}
/>
```

Use product-specific rules engine to determine when to add the modal to the ReactDOM.

The question that was asked and the response are passed back to the `onScoreClick` and `onCommentSubmit` functions for data collection purposes.

### Demo

Run `npm run example`

Go to `localhost:8080`

### Props

| Property                     | Type          | Required      | Description                                                                                                                              |
| ---------------------------- | ------------- |---------------|----------------------------------------------------------------------------------------------------------------------------------------- |
| Main Question                | String        | Yes           | Product specific first question.                                                                                                         |
| Promoter Follow Up Question  | String        | Yes           | Product specific question to ask users who chose a score in the promoter score range `[Promoter Lower Bound,..., Maximum Score]`         |
| Neutral Follow Up Question   | String        | Yes           | Product specific question to ask users who chose a score in the neutral score range. `(Detractor Upper Bound,..., Promoter Upper Bound)` |
| Detractor Follow Up Question | String        | Yes           | Product specific question to ask users who chose a score in the detractor score range. `[0,..., Detractor Upper Bound]`                  |
| Max Score                    | Number        | Yes           | Maximum score for users to choose from. Zero is the minimum.                                                                             | 
| Detractor Upper Bound        | Number        | Yes           | Inclusive upper boundary for detract score range.                                                                                        |
| Promoter Lower Bound         | Number        | Yes           | Inclusive lower boundary for promoter score range.                                                                                       |
| onScoreClick                 | Function      | Yes           | Function for parent component to handle User selecting score.                                                                            |
| onCommentSubmit              | Function      | Yes           | Function for parent component to handle User submitting comment.                                                                         |
