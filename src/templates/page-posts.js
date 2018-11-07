import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEOPage from '../components/SEO/Page'
import PostListItem from '../components/Post/ListItem'
import Pagination from '../components/Post/Pagination'

const PagePostsTemplate = ({ data, location, pageContext }) => {
  const page = data.prismicPostsIndex.data
  const posts = data.allPrismicPost.edges
  return (
    <Layout location={location}>
      <SEOPage title={page.title && page.title} location={location} />
      {page.title && (
        <h1 className="text-4xl leading-tight mb-2">{page.title}</h1>
      )}
      {page.subheading && <h2 className="text-xl mb-8">{page.subheading}</h2>}
      <div
        className="rte"
        dangerouslySetInnerHTML={{ __html: page.body.html }}
      />
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
      <Pagination pageContext={pageContext} />
    </Layout>
  )
}

PagePostsTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export const pagePostsQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    prismicPostsIndex {
      uid
      data {
        title
        subheading
        body {
          html
        }
      }
    }
    allPrismicPost(
      sort: { fields: data___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          ...PostsItem
        }
      }
    }
  }
`

export default PagePostsTemplate
