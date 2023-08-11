import Head from 'next/head'
import Link from 'next/link'
// import styles from '@/styles/Home.module.css'
import {GraphQLClient, gql} from 'graphql-request'

const graphcms = new GraphQLClient('https://api-us-west-2.hygraph.com/v2/cll5m1xec0rey01t7adiz2gvp/master')

const ALLREVIEWS = gql`
{ 
  reviews(orderBy: createdAt_DESC) {
    createdAt
    dateAndTime
    id
    publishedAt
    slug
    title
    updatedAt
    cover {
      url
    }
  }
}
`


export default function Home({ reviews }) {
  
  return (
    <>
      <Head>
        <title>A Disc A Day</title>
        <meta name="description" content="A Disc A Day | Short album reviews every day" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="albums">
        <div className="container">
          <ul className="album-covers">
            {
              reviews.map((review) => (
                <li key={review.id} className="album">
                  <Link href={`/reviews/${review.slug}`}>
                    <img src={review.cover.url} width="400" height="400" alt="" className='grow' />
                  </Link>
                    {/* <div className="overlay-text">
                      {review.name}
                    </div> */}

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