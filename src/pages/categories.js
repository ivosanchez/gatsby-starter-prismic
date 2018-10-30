import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEOPage from '../components/SEO/Page'

export default class Categories extends Component {
  render() {
    const { data, location } = this.props
    const categoriesTotal = data.allPrismicCategories.totalCount

    let categories = false
    if (categoriesTotal > 0) categories = data.allPrismicCategories.edges

    return (
      <Layout location={location}>
        <h1 className="mb-6">{categoriesTotal} Categories:</h1>
        {categories &&
          Array.isArray(categories) &&
          categories.map(({ node }) => (
            <div key={node.id} className="mb-6">
              <SEOPage title={node.data.title} location={location} />
              <Link to={`/categories/${node.uid}`}>
                <h2>{node.data.title}</h2>
              </Link>
            </div>
          ))}
      </Layout>
    )
  }
}

export const categoryQuery = graphql`
  query {
    allPrismicCategories {
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
