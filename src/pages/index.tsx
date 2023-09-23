import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Image from 'next/image'

import techsImage from '../../public/images/techs.svg'

export default function Home() {
  return (
    <>
      <Head>
        <title>Skill Up - Home</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.content}>
            <h2>Descubra uma melhor versão de si mesmo</h2>

            <span>
              Conheça a plataforma perfeita para descobrir e aprimorar suas
              habilidades profissionais e conseguir crescer em sua carreira.
            </span>

            <div>
              <button>Acess agora</button>
            </div>
          </section>

          <img src="/images/banner-conteudos.png" alt="Conteúdos Skill Up" />
        </div>

        <div className={styles.divisor}></div>

        <div className={styles.sectionContent}>
          <section>
            <h2>Aprenda tudo sobre o mundo dev</h2>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              numquam accusamus cupiditate adipisci nostrum? Ea sapiente non
              saepe eius sequi.
            </span>
          </section>

          <img src="/images/financasApp.png" alt="Conteúdos da plataforma" />
        </div>

        <div className={styles.divisor}></div>

        <div className={styles.sectionContent}>
          <img src="/images/webDev.png" alt="Conteúdos da plataforma" />

          <section>
            <h2>Aprenda tudo sobre o mundo dev</h2>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              numquam accusamus cupiditate adipisci nostrum? Ea sapiente non
              saepe eius sequi.
            </span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image src={techsImage} alt='Tecnologias'/>
          <h2>Mais de <span>10 mil</span> já levaram suas carreiras ao próximo nível</h2>

          <span>
            E você vai perder esssa oportunidade de evoluir de uma vez por todas?
          </span>

          <div>
            <button>Acessar turma!</button>
          </div>
        </div>
      </main>
    </>
  )
}
