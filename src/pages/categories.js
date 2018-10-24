import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

export default class Categories extends Component {
  render() {
    const { data } = this.props
    const categoriesTotal = data.allPrismicCategories.totalCount

    let categories = false
    if (categoriesTotal > 0) categories = data.allPrismicCategories.edges

    return (
      <Layout>
        <h1 className="mb-6">{categoriesTotal} Categories:</h1>
        {categories &&
          Array.isArray(categories) &&
          categories.map(({ node }) => (
            <div key={node.id} className="mb-6">
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
