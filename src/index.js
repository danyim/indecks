import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import Root from './root'

Modal.setAppElement('#root')
ReactDOM.render(<Root />, document.getElementById('root'))
