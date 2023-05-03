import React from "react"
import styles from "../styles"

const Input = ({ type, placeholder, name, onChange, value }) => {
  return (
    <input
      className={styles.Inputs}
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
    />
  )
}

export default Input
