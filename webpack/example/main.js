import React from 'react'
import ReactDOM from 'react-dom'
import NPSModal from '../../src/NPSModal'

ReactDOM.render(
    <NPSModal
        header="Satisfaction Survey"
        modalClassName="revshare"
        overlayClassName=""
        mainQuestion="How happy are you with our product?"
        promoterFollowUpQuestion="We're so happy you're happy! We'd love to hear more about your experience:"
        neutralFollowUpQuestion="How can we improve your experience?"
        detractorFollowUpQuestion="We're sorry you feel that way! What is our product missing?"

        minScoreBlurb="Not Happy"
        maxScoreBlurb="Very Happy"
        maxScore={10}
        detractorUpperBound={6}
        promoterLowerBound={9}

        onScoreClick={(score, question) => {alert('User selected ' + score + ' when asked ' + question)}}
        onCommentSubmit={(comment, question) => {alert('User entered ' + comment + ' when asked ' + question)}}
    />,
    document.getElementById('example')
);

