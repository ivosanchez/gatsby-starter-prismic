import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEOPage from '../components/SEO/Page'
import Link from '../components/TransitionLink'

const Categories = ({ data, location }) => {
  const categories = data.allPrismicPostsCategories.edges
  const hasCategories =
    data.allPrismicPostsCategories.totalCount > 0 &&
    categories &&
    Array.isArray(categories)
  return (
    <Layout location={location}>
      <SEOPage title="categories page" location={location} />
      <h1 className="text-4xl leading-tight mb-8">Categories</h1>
      {hasCategories ? (
        categories.map(({ node }) => {
          return (
            <div key={node.id} className="mb-6">
              <Link cover direction="right" to={`/categories/${node.uid}`}>
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

Categories.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default Categories

export const categoryQuery = graphql`
  query {
    allPrismicPostsCategories {
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
