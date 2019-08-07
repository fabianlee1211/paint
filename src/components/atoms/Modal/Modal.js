import React, { useMemo } from 'react'
import './Modal.css'

const Modal = props => {
  return useMemo(() => {
    return (
      <React.Fragment>
        <div
          className="Modal Shadow"
          style={{
            opacity: props.show ? '1' : '0',
            visibility: props.show ? 'visible' : 'hidden',
          }}
          {...props}
        >
          {props.children}
        </div>
      </React.Fragment>
    )
  }, [props.children, props.show])
}

export default Modal
