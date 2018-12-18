import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEOPage from '../components/SEO/Page'
import Link from '../components/TransitionLink'

const Posts = ({ data, location }) => {
  const tags = data.allPrismicPostsTags.edges
  const hasTags =
    data.allPrismicPostsTags.totalCount > 0 && tags && Array.isArray(tags)
  return (
    <Layout location={location}>
      <SEOPage title="tags page" location={location} />
      <h1 className="text-4xl leading-tight mb-8">Tags</h1>
      {hasTags ? (
        tags.map(({ node }) => {
          return (
            <div key={node.id} className="mb-6">
              <Link cover direction="right" to={`/tags/${node.uid}`}>
                <h2>{node.data.title}</h2>
              </Link>
            </div>
          )
        })
      ) : (
        <h2>No Tag Found</h2>
      )}
    </Layout>
  )
}

Posts.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default Posts

export const tagsQuery = graphql`
  query {
    allPrismicPostsTags {
      totalCount
      edges {
        node {
          id
          uid
          data {
            title
          }
        }
      }
    }
  }
`
