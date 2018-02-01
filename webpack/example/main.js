import React from 'react'
import ReactDOM from 'react-dom'
import NPSModal from '../../lib/NPSModal'

import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
    <NPSModal mainQuestion={'How likely are you to recommend our product to a friend?'}></NPSModal>,
    document.getElementById('example')
);

