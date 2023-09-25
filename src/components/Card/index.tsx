import styles from './Card.module.scss'
import React, { ReactElement } from 'react'
import { FaArrowRight } from 'react-icons/fa'

interface ICard {
  children: string
  title: string
  icon: ReactElement
  color: boolean
}

const Card = ({ title, icon, color, children }: ICard) => {
  return (
    <div className={`${styles.card} ${color ? styles.orange : ''}`}>
      {icon}

      <div>
        <h4>{title}</h4>
        <p>{children}</p>
      </div>

      <FaArrowRight className={styles.next} size={30} />
    </div>
  )
}

export default Card
