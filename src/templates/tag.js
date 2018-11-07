import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostListItem from '../components/Post/ListItem'
import SEOPage from '../components/SEO/Page'

const TagTemplate = ({ data, pageContext, location }) => {
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
      <Link to="/tags">← View all tags</Link>
    </Layout>
  )
}

TagTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export const tagQuery = graphql`
  query PostByTag($uid: String!) {
    allPrismicPost(
      filter: {
        data: {
          tags: {
            elemMatch: {
              tag: { document: { elemMatch: { uid: { eq: $uid } } } }
            }
          }
        }
      }
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

export default TagTemplate
