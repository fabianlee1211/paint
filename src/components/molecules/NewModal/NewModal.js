import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from '../../atoms/Modal/Modal'
import Button from '../../atoms/Button/Button'
import Window from '../../organisms/Window/Window'
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter'
import { setCanvasSize, setFileName } from '../../../store/canvas/actions'
import './NewModal.css'

const useFormFields = (state, submitHandler) => {
  const [fields, setFields] = useState(state)
  const handleSubmit = event => {
    event && event.preventDefault()
    submitHandler && submitHandler()
  }

  const handleInputChange = event => {
    event.persist()
    setFields({
      ...fields,
      [event.target.name]: {
        ...fields[event.target.name],
        value: event.target.value,
      },
    })
  }

  return {
    handleSubmit,
    handleInputChange,
    fields,
  }
}

const NewModal = ({ show, setShowNewModal }) => {
  const initialFieldConfigs = {
    filename: {
      type: 'text',
      value: 'untitled',
    },
    width: {
      type: 'number',
      value: 0,
    },
    height: {
      type: 'number',
      value: 0,
    },
  }
  
  const dispatch = useDispatch()
  
  const submitHandler = () => {
    dispatch(setCanvasSize({
      width: fields.width.value,
      height: fields.height.value
    }))
    dispatch(setFileName(fields.filename.value))
    setShowNewModal(false)
  }
  
  const handleCancel = event => {
    event.preventDefault()
    setShowNewModal(false)
  }

  const {
    handleSubmit,
    handleInputChange,
    fields
  } = useFormFields(initialFieldConfigs, submitHandler)


  let inputFields = []
  for (let key in fields) {
    inputFields = [...inputFields, { name: key, ...fields[key] }]
  }

  return (
    <Modal show={show}>
      <Window
        title="New File"
        onClick={() => setShowNewModal(false)}
        className="NewModal__Window"
        closeOnly
      >
        <form className="NewModal__Form" onSubmit={handleSubmit}>
          {inputFields.map(field => (
            <div key={field.name} className="NewModal__FormField">
              <label htmlFor={field.name}>{`${capitalizeFirstLetter(field.name)}:`}</label>
              <input
                value={field.value}
                name={field.name}
                type={field.type}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
          <div className="NewModal__Buttons">
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </form>
      </Window>
    </Modal>
  )
}

export default NewModal
