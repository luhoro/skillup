import React from 'react'
import ActiveLink from '../ActiveLink'
import styles from './Footer.module.scss'
import Image from 'next/image'
import logo from '../../../public/images/logo.svg'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div>
          <Image src={logo} alt="Skill up logo" width={180} />
          <p>
            Uma inovação no mercado de tecnologia, formando profissionais
            capacitados.
          </p>
        </div>

        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <span>Home</span>
          </ActiveLink>

          <ActiveLink href="/posts" activeClassName={styles.active}>
            <span>Conteúdos</span>
          </ActiveLink>

          <ActiveLink href="/sobre" activeClassName={styles.active}>
            <span>Quem somos?</span>
          </ActiveLink>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
