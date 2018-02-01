import React from 'react'
import ReactDOM from 'react-dom'
import NPSModal from '../../src/NPSModal'

import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
    <NPSModal mainQuestion={'How likely are you to recommend our product to a friend?'} />,
    document.getElementById('example')
);

