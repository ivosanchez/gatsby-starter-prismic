import React from 'react'
import PropTypes from 'prop-types'

const Textarea = ({ name, label, placeholder, required }) => (
  <div className="flex justify-start items-end mb-6 px-3 border border-red border-l-4 border-t-0 border-b-0 border-r-0">
    <label htmlFor={`id_${name}`} className="mr-3 text-lg">
      {label}:{' '}
    </label>
    <textarea
      id={`id_${name}`}
      name={name}
      placeholder={placeholder && placeholder}
      required={required && required}
      className="border border-gray px-3"
    />
  </div>
)

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
}

export default Textarea
