import { GetServerSideProps } from 'next'

import { getPrismicClient } from '../../services/prismic'
import { RichText } from 'prismic-dom'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

interface PostProps {
  post: {
    slug: string
    title: string
    description: string
    cover: string
    updatedAt: string
  }
}

export const Post = ({ post }: PostProps) => {
  console.log(post)
  return (
    <div>
      <h1>aaa</h1>
      <p>bbbbbbb</p>
    </div>
  )
}

export default Post

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { slug } = params as Params
  const prismic = getPrismicClient(req)

  const response = await prismic.getByUID('post', String(slug), {})

  if (!response) {
    return {
      redirect: {
        destination: '/posts',
        permanent: false,
      },
    }
  }

  const post = {
    slug: slug,
    title: RichText.asText(response.data.title),
    description: RichText.asHtml(response.data.description),
    cover: response.data.cover.url,
    updatedAt: new Date(
      response.last_publication_date as string
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }

  return {
    props: {
      post,
    },
  }
}
