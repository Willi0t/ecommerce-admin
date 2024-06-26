import React from 'react'
import styles from "@/styles/center.module.css";

const Center = ({children}) => {
  return (
	<div className={styles.container}>
		{children}
	</div>
  )
}

export default Center