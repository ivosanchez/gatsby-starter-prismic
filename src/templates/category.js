import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostListItem from '../components/PostListItem'
import SEOPage from '../components/SEO/Page'

class CategoryTemplate extends Component {
  render() {
    const { data, pageContext, location } = this.props
    const posts = data.allPrismicPost.edges
    return (
      <Layout location={location}>
        <SEOPage title={pageContext.title} location={location} />
        <h1 className="mb-6">{pageContext.title}</h1>
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
        <Link to="/categories">to back</Link>
      </Layout>
    )
  }
}

export const categoryQuery = graphql`
  query PostByCategory($uid: String!) {
    allPrismicPost(
      filter: { data: { category: { uid: { eq: $uid } } } }
      sort: { fields: [data___title], order: DESC }
    ) {
      edges {
        node {
          id
          uid
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
export default CategoryTemplate
