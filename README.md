# kuzco
React Component for product-agnostic NPS survey

### Usage

```javascript
    <NPSModal
        header={'Satisfaction Survey'} // optional
        modalClassName={'revshare'} // optional
        mainQuestion={'How happy are you with our product?'}
        promoterFollowUpQuestion={`We're so happy you're happy! We'd love to hear more about your experience:`}
        neutralFollowUpQuestion={`How can we improve your experience?`}
        detractorFollowUpQuestion={`We're sorry you feel that way! What is our product missing?`}

        minScoreBlurb={'Not Happy'} // optional
        maxScoreBlurb={'Very Happy'} // optional
        maxScore={10}
        detractorUpperBound={6}
        promoterLowerBound={9}

        onScoreClick={(score, question) => {alert('User selected ' + score + ' when asked ' + question)}}
        onCommentSubmit={(comment, question) => {alert('User entered ' + comment + ' when asked ' + question)}}

        contentClassName=""
        overlayClassName=""
    />
```

Use product-specific rules engine to determine when to add the modal to the ReactDOM.

The question that was asked and the response are passed back to the `onScoreClick` and `onCommentSubmit` functions for data collection purposes.

### Demo

Run `npm run example`

Go to `localhost:8080`

### Props

| Property                     | Type     | Required | Description                                                                                                                              |
| ---------------------------- | -------- |----------|----------------------------------------------------------------------------------------------------------------------------------------- |
| `header`                       | String   | No       | Eye catching header for question. |
| `modalClassName`             | String   | No       | Modal Class Name this product belongs to, for styling purposes. |
| `overlayClassName`             | String   | No       | Classname to attach to the react-modal overlay component (for custom styling) |
| `mainQuestion`                | String   | Yes      | Product specific first question. |
| `promoterFollowUpQuestion`  | String   | Yes      | Product specific question to ask users who chose a score in the promoter score range `[Promoter Lower Bound,..., Maximum Score]` |
| `neutralFollowUpQuestion`   | String   | Yes      | Product specific question to ask users who chose a score in the neutral score range. `(Detractor Upper Bound,..., Promoter Upper Bound)` |
| `detractorFollowUpQuestion` | String   | Yes      | Product specific question to ask users who chose a score in the detractor score range. `[0,..., Detractor Upper Bound]`                  |
| Min Score Blurb              | String   | No       | Text associated with the lowest score |
| Max Score Blurb              | String   | No       | Text associated with the highest score |
| Max Score                    | Number   | Yes      | Maximum score for users to choose from. Zero is the minimum. |
| Detractor Upper Bound        | Number   | Yes      | Inclusive upper boundary for detract score range. |
| Promoter Lower Bound         | Number   | Yes      | Inclusive lower boundary for promoter score range. |
| onScoreClick                 | Function | Yes      | Function for parent component to handle User selecting score. |
| onCommentSubmit              | Function | Yes      | Function for parent component to handle User submitting comment. |
