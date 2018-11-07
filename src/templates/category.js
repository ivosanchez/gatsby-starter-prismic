import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostListItem from '../components/Post/ListItem'
import SEOPage from '../components/SEO/Page'

const CategoryTemplate = ({ data, pageContext, location }) => {
  const posts = data.allPrismicPost.edges
  const hasPosts =
    data.allPrismicPost.totalCount > 0 && posts && Array.isArray(posts)
  return (
    <Layout location={location}>
      <SEOPage title={pageContext.title} location={location} />
      <h1 className="text-4xl leading-tight mb-8">
        Posts: <small>{pageContext.title}</small>
      </h1>
      {hasPosts &&
        posts.map(({ node }) => (
          <PostListItem
            key={node.id}
            uid={node.uid}
            title={node.data.title}
            date={node.data.date}
            subheading={node.data.subheading}
          />
        ))}
      <Link to="/categories">← View all categories</Link>
    </Layout>
  )
}

CategoryTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export const categoryQuery = graphql`
  query PostByCategory($uid: String!) {
    allPrismicPost(
      filter: { data: { category: { uid: { eq: $uid } } } }
      sort: { fields: [data___title], order: DESC }
    ) {
      totalCount
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
