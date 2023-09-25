import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import Card from '../components/Card'
import {
  FaRegLightbulb,
  FaSearch,
  FaCommentDots,
  FaChalkboardTeacher,
} from 'react-icons/fa'
import { PiTargetBold } from 'react-icons/pi'

export default function Home() {
  return (
    <>
      <Head>
        <title>Skill Up - Home</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.content}>
            <h1>
              Descubra uma <span>melhor versão</span> de si mesmo
            </h1>

            <p>
              Conheça a plataforma perfeita para descobrir e aprimorar suas
              habilidades profissionais e conseguir crescer em sua carreira.
            </p>

            <div>
              <button className="baseButton">Acesse agora!</button>
            </div>
          </section>

          <img src="/images/banner.png" alt="Conteúdos Skill Up" />
        </div>

        <div className={styles.divisor}></div>

        <div className={styles.sectionContent}>
          <div className={styles.cards}>
            <Card
              icon={<FaRegLightbulb size={30} />}
              color={true}
              title="Hard skills"
            >
              Desenvolva suas habilidades técnicas nos assuntos mais recentes e
              promissores da tecnologia.
            </Card>

            <Card
              icon={<FaSearch size={30} />}
              color={false}
              title="Soft skills"
            >
              Aprenda a gerenciar seu tempo, e a trabalhar em uma equipe na
              prática com outros estudantes.
            </Card>

            <Card
              icon={<FaCommentDots size={30} />}
              color={true}
              title="Língua inglesa"
            >
              Aprenda inglês da forma mais eficaz com o método skill UP, um
              curso focado na prática e focado para desenvolvedores.
            </Card>

            <Card
              icon={<FaChalkboardTeacher size={30} />}
              color={false}
              title="Mentorias"
            >
              Tenha confiança em seu processo de aprendizagem com mentorias
              individuais dos profissionais da skill Up.
            </Card>
          </div>

          <div className={styles.text}>
            <h2> além de <span>lives</span> semanais! </h2>
            <button className="baseButton">Conheça mais!</button>
          </div>
        </div>

        <div className={styles.divisor}></div>

        <div className={styles.nextLevelContent}>
          <PiTargetBold size={40}/>

          <h3>
            Mais de <span>10 mil</span> já levaram suas carreiras ao próximo
            nível
          </h3>

          <span>
            E você vai perder esssa oportunidade de evoluir de uma vez por
            todas?
          </span>

          <div>
            <button className="baseButton">Acessar turma!</button>
          </div>
        </div>
      </main>
    </>
  )
}
