import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

const PostsPage = props => {
  const tags = props.data.allPrismicTag.edges
  return (
    <Layout>
      {tags &&
        Array.isArray(tags) &&
        tags.map(({ node }) => {
          return (
            <div key={node.id} className="mb-6">
              <Link to={`/tags/${node.uid}`}>
                <h2>{node.data.title}</h2>
              </Link>
            </div>
          )
        })}
    </Layout>
  )
}

export default PostsPage

export const tagsQuery = graphql`
  query {
    allPrismicTag {
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
