import Head from 'next/head'
import Link from 'next/link'

import styles from './Posts.module.scss'
import {FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight} from 'react-icons/fi'
import { GetStaticProps } from 'next'

import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

type Post = {
  slug: string
  title: string
  description: string
  cover: string
  updatedAt: string
}

interface PostProps {
  posts: Post[]
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Blog | Skill Up</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <Link href='/#'>
            <img src={'https://res.cloudinary.com/abuhakmeh/image/fetch/c_limit,f_auto,q_auto,w_800/https://khalidabuhakmeh.com/assets/images/posts/youtube-thumbnails/bg_computer_programmer.png'} width={720} height={410} alt='Post Título 1' />
            
            <strong>Modelo título 1ª postagem</strong>
            <time>26 de Setembro 2023</time>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae voluptas rem eius, nobis minus cum et quis eaque! Culpa, officia?</p>
          </Link>

          <Link href='/#'>
            <img src={'https://res.cloudinary.com/abuhakmeh/image/fetch/c_limit,f_auto,q_auto,w_800/https://khalidabuhakmeh.com/assets/images/posts/youtube-thumbnails/bg_computer_programmer.png'} width={720} height={410} alt='Post Título 1' />
            
            <strong>Modelo título 1ª postagem</strong>
            <time>26 de Setembro 2023</time>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae voluptas rem eius, nobis minus cum et quis eaque! Culpa, officia?</p>
          </Link>

          <div className={styles.buttonNavigate}>
            <div>
              <button>
                <FiChevronsLeft size={30} color='var(--gray-700)' />
              </button>

              <button>
                <FiChevronLeft size={30} color='var(--gray-900)' />
              </button>
            </div>

            <div>
              <button>
                <FiChevronRight size={30} color='var(--gray-900)' />
              </button>

              <button>
                <FiChevronsRight size={30} color='var(--gray-700)' />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ], {
    orderings: '[document.last_publication_date desc]',
    fetch: ['post.title, post.description, post.cover'],
    pageSize: 3
  })

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
      cover: post.data.cover.url,
      updatedAt: new Date(post.last_publication_date as string).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }) 
    }
  })

  return {
    props: {
      posts
    },
    revalidate: 60 * 30
  }
}