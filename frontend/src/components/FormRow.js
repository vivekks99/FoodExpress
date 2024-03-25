import React from 'react'
import '../assets/css/formrow.css'

function FormRow({inputType,formLabel, formValue, onChange, isDisabled, isRequired}) {

  return (
    <div className="form-row">
        <label className="label">{formLabel}: </label>
        <input className="input" type={inputType} name="name" defaultValue={formValue} disabled={isDisabled} onChange={onChange} required={isRequired} />
    </div>
  )
}

export default FormRow