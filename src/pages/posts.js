import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostListItem from '../components/PostListItem'

const PostsPage = props => {
  const posts = props.data.allPrismicPost.edges
  return (
    <Layout>
      <h1 className="mb-10">Post List</h1>
      {posts &&
        Array.isArray(posts) &&
        posts.length > 0 &&
        posts.map(({ node }) => (
          <PostListItem
            key={node.id}
            uid={node.uid}
            title={node.data.title}
            date={node.data.date}
            subheading={node.data.subheading}
          />
        ))}
    </Layout>
  )
}

export default PostsPage

export const postsQuery = graphql`
  query {
    allPrismicPost {
      edges {
        node {
          uid
          id
          data {
            title
            subheading
            date(formatString: "dddd DD MMMM YYYY")
          }
        }
      }
    }
  }
`
