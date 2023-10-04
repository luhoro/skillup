import Head from 'next/head'
import Link from 'next/link'

import styles from './Posts.module.scss'
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from 'react-icons/fi'
import { GetStaticProps } from 'next'

import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { useState } from 'react'

type Post = {
  slug: string | undefined
  title: string
  description: string
  cover: string
  updatedAt: string
}

interface PostProps {
  posts: Post[]
  page: string
  totalPage: string
}

export default function Posts({
  posts: postsBlog,
  page,
  totalPage,
}: PostProps) {

  const [currentPage, setCurrentPage] = useState(Number(page))
  const [posts, setPosts] = useState(postsBlog || [])

  const reqPost = async (pageNumber: number) => {
    const prismic = getPrismicClient()
    const response = await prismic.query([
      Prismic.Predicates.at('document.type', 'post')
    ], {
      orderings: '[document.last_publication_date desc]',
      fetch: ['post.title, post.description, post.cover'],
      pageSize: 3,
      page: String(pageNumber)
    })

    return response
  }

  const navigatePage = async (pageNumber: number) => {
    const response = await reqPost(pageNumber)

    if (response.results.length === 0) {
      return 
    }

    const getPosts = response.results.map(post => {
      return {
        slug: post.uid,
        title: RichText.asText(post.data.title),
        description:
          post.data.description.find((content) => content.type === 'paragraph')
            ?.text ?? '',
        cover: post.data.cover.url,
        updatedAt: new Date(
          post.last_publication_date as string
        ).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      }
    })

    setCurrentPage(pageNumber)
    setPosts(getPosts)
  }

  return (
    <>
      <Head>
        <title>Blog | Skill Up</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <img src={post.cover} alt={post.title} width={720} height={410} />

              <strong>{post.title}</strong>
              <time>{post.updatedAt}</time>
              <p>{post.description}</p>
            </Link>
          ))}

          <div className={styles.buttonNavigate}>
            {Number(currentPage) >= 2 && (
              <div className={styles.back}>
                <button onClick={() => navigatePage(1)}>
                  <FiChevronsLeft size={30} color="var(--gray-700)" />
                </button>

                <button onClick={() => navigatePage(Number(currentPage - 1))}>
                  <FiChevronLeft size={30} color="var(--gray-900)" />
                </button>
              </div>
            )}

            {Number(currentPage) < Number(totalPage) && (
              <div className={styles.forward}>
                <button onClick={() => navigatePage(Number(currentPage + 1))}>
                  <FiChevronRight size={30} color="var(--gray-900)" />
                </button>

                <button onClick={() => navigatePage(Number(totalPage))}>
                  <FiChevronsRight size={30} color="var(--gray-700)" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      orderings: '[document.last_publication_date desc]',
      fetch: ['post.title, post.description, post.cover'],
      pageSize: 3,
    }
  )

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      description:
        post.data.description.find((content) => content.type === 'paragraph')
          ?.text ?? '',
      cover: post.data.cover.url,
      updatedAt: new Date(
        post.last_publication_date as string
      ).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  })

  return {
    props: {
      posts,
      page: response.page,
      totalPage: response.total_pages,
    },
    revalidate: 60 * 30,
  }
}
