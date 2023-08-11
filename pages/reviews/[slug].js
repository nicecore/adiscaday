import React from 'react'
import {GraphQLClient, gql} from 'graphql-request'
import Head from 'next/head'

const graphcms = new GraphQLClient('https://api-us-west-2.hygraph.com/v2/cll5m1xec0rey01t7adiz2gvp/master')

const REVIEW = gql`
  query Review($slug: String!) {
    review(where: {slug: $slug}) {
      title
      id
      slug
      cover {
        url
      }
      body {
        html
      }
    }
  }
`

const SLUGLIST = gql`
  query SLUGS {
    reviews {
      slug
    }
  }
`


const ReviewDetail = ({ review }) => {

  // Dangerously set inner HTML
  function createMarkup() {
    return {__html: review.body.html};
  }

  // comment so I can push


  return (
    <div className='container'>
      <Head>
        <title>{review.title} | A Disc A Day</title>
        <meta name="description" content={`{review.title} | A Disc A Day`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>
        {review.title}
      </h1>
      <img className='album-cover' src={review.cover.url} width="400" height="400" alt="" />
      <div className='detail-container'>
        <p className="review-detail-body" dangerouslySetInnerHTML={createMarkup()}></p>
        {/* <p className='review-detail-body'>
          {review.reviewBody.markdown}
        </p> */}
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  const data = await graphcms.request(REVIEW, { slug })
  const review = data.review

  return {
    props: {
      review
    }
  }
}

export async function getStaticPaths() {
  const { reviews } = await graphcms.request(SLUGLIST)
  return {
    paths: reviews.map((review) => ({ params: { slug: review.slug }})),
    fallback: false,
  }
}

export default ReviewDetail