import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEOPage from '../components/SEO/Page'
import PostListItem from '../components/Post/ListItem'

const IndexPage = ({ data, location }) => {
  const page = data.prismicHome.data
  const posts = page.link
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
        posts.map(({ post }) => {
          const [node] = post.document
          return (
            <PostListItem
              key={node.id}
              uid={node.uid}
              title={node.data.title}
              date={node.data.date}
              subheading={node.data.subheading}
            />
          )
        })}
    </Layout>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export const pageHomeQuery = graphql`
  query {
    prismicHome {
      uid
      data {
        title
        subheading
        body {
          html
        }
        link {
          post {
            document {
              ...PostsItem
            }
          }
        }
      }
    }
  }
`

export default IndexPage
