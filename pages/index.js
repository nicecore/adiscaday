import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
// import styles from '@/styles/Home.module.css'
import {GraphQLClient, gql} from 'graphql-request'

const graphcms = new GraphQLClient('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cldutt5830kze01rtgjljevdo/master')

const ALLREVIEWS = gql`
{ 
  reviews {
    coverUrl
    createdAt
    id
    name
    publishedAt
    slug
    summary
    updatedAt
    reviewBody {
      html
    }
  }
}
`


export default function Home({ reviews }) {
  
  return (
    <>
      <Head>
        <title>A Disc A Day</title>
        <meta name="description" content="A Disc A Day" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="albums">
        <div className="container">
          <ul className="album-covers">
            {
              reviews.map((review) => (
                <li key={review.id} className="album">
                  <img src={review.coverUrl} width="400" height="400" alt="" />
                  <Link href={`/reviews/${review.slug}`} className="overlay">
                    <div className="overlay-text">
                      {review.name}
                    </div>
                  </Link>
                </li>

              ))
            }
          </ul>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const { reviews } = await graphcms.request(ALLREVIEWS)

  return {
    props: {
      reviews
    }
  }
}