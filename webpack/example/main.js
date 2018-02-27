import React from 'react'
import ReactDOM from 'react-dom'
import NPSModal from '../../src/NPSModal'

import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import style from '../../stylesheets/nps-modal.styl'

ReactDOM.render(
    <NPSModal
        mainQuestion={'How likely are you to recommend our product to a friend?'}
        promoterFollowUpQuestion={`We're so happy you're happy! We'd love to hear more about your experience:`}
        neutralFollowUpQuestion={`How can we improve your experience?`}
        detractorFollowUpQuestion={`We're sorry you feel that way! What is our product missing?`}

        maxScore={10}
        detractorUpperBound={6}
        promoterLowerBound={9}

        onScoreClick={(score, question) => {alert('User selected ' + score + ' when asked ' + question)}}
        onCommentSubmit={(comment, question) => {alert('User entered ' + comment + ' when asked ' + question)}}
    />,
    document.getElementById('example')
);

