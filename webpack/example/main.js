import React from 'react'
import ReactDOM from 'react-dom'
import NPSModal from '../../src/NPSModal'

import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import style from '../../stylesheets/nps-modal.styl'

ReactDOM.render(
    <NPSModal
        mainQuestion={'How likely are you to recommend our product to a friend?'}
        onScoreClick={(score) => {alert('User selected ' + score)}}
        onCommentSubmit={(comment) => {alert('User entered ' + comment)}}
    />,
    document.getElementById('example')
);

