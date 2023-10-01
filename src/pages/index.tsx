import { GetStaticProps } from 'next'

import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import Card from '../components/Card'
import {
  FaRegLightbulb,
  FaSearch,
  FaCommentDots,
  FaChalkboardTeacher,
  FaRocket
} from 'react-icons/fa'

import { getPrismicClient } from '../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

type Content = {
  title: string,
  subtitle: string,
  name_linkaction: string,
  linkaction: string
}

interface ContentProps {
  content: Content
}

export default function Home({ content }: ContentProps) {
  // console.log(content)

  return (
    <>
      <Head>
        <title> Home | Skill Up </title>
      </Head>

      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.content}>
            <h1>
              Descubra uma <span>melhor versão</span> de si mesmo
            </h1>

            <p>
              {content.subtitle}
            </p>

            <a href={content.linkaction} target='_blank'>
              <button className="baseButton">{content.name_linkaction}</button>
            </a>
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
          <FaRocket size={40}/>

          <h3>
            Mais de <span>10 mil</span> já levaram suas carreiras ao próximo
            nível
          </h3>

          <span>
            E você vai perder esssa oportunidade de evoluir de uma vez por
            todas?
          </span>

          <a href={content.linkaction} target='_blank'>
            <button className="baseButton">Acessar turma!</button>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'home')
  ])

  // console.log(response.results[0].data)

  const { title, subtitle, linkaction, name_linkaction } = response.results[0].data

  const content = {
    title: RichText.asText(title),
    subtitle: RichText.asText(subtitle),
    name_linkaction: RichText.asText(name_linkaction),
    linkaction: linkaction.url
  }

  return {
    props: {
      content
    },
    revalidate: 60 * 2
  }
}