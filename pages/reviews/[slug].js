import React from 'react'
import {GraphQLClient, gql} from 'graphql-request'

const graphcms = new GraphQLClient('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cldutt5830kze01rtgjljevdo/master')

const REVIEW = gql`
  query Review($slug: String!) {
    review(where: {slug: $slug}) {
    id
    coverUrl
    name
    reviewBody {
      markdown
      text
      html
    }
    slug
    summary
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
    return {__html: review.reviewBody.html};
  }


  return (
    <div className='container'>
      <h1>
        {review.name}
      </h1>
      <img className='album-cover' src={review.coverUrl} width="300" height="300" alt="" />
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