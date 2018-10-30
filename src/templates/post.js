import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import SEOPage from '../components/SEO/Page'

function PostLabel({ label, text }) {
  return (
    <span className="text-sm mr-6 p-1 bg-purple text-white rounded">
      {label ? `${label}: ` : null}
      <b>{text}</b>
    </span>
  )
}

class PostTemplate extends Component {
  render() {
    const { previous, next } = this.props.pageContext
    const [postData] = this.props.data.allPrismicPost.edges
    const post = postData.node.data

    let localImage = false
    if (post.image.url && post.image.localFile.childImageSharp) {
      localImage = post.image.localFile.childImageSharp
      localImage.alt = post.image.alt
        ? post.image.alt
        : 'Batch Post Feature Image'
    }
    return (
      <Layout location={this.props.location}>
        <SEOPage
          title={post.title}
          type="article"
          description={post.subheading}
          location={this.props.location}
        />
        <h1 className="mb-6">{post.title}</h1>
        <div className="mb-6">
          {post.tags &&
            Array.isArray(post.tags) &&
            post.tags.length > 0 &&
            post.tags.map(item => {
              const { tag } = item
              const { title } = tag.document[0].data
              if (tag.isBroken) return null
              return (
                <Link to={`/tags/${tag.slug}`} key={tag.slug}>
                  <PostLabel text={title} key={tag.id} />
                </Link>
              )
            })}
          {post.category &&
            !post.category.isBroken && (
              <Link to={`/categories/${post.category.uid}`}>
                <PostLabel
                  text={post.category.document[0].data.title}
                  key={post.category.uid}
                />
              </Link>
            )}
          {post.date && <PostLabel text={post.date} key={post.date} />}
        </div>
        {post.subheading && <h2 className="mb-6">{post.subheading}</h2>}
        {localImage && (
          <Img fluid={localImage.fluid} alt={localImage.alt} className="mb-6" />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
        <div className="flex justify-between mt-6">
          <div>
            {previous && (
              <Link to={`/posts/${previous.uid}`} rel="prev">
                ← {previous.data.title}
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link to={`/posts/${next.uid}`} rel="next">
                {next.data.title} →
              </Link>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export const postQuery = graphql`
  query PostByUid($uid: String!) {
    allPrismicPost(filter: { uid: { eq: $uid } }) {
      edges {
        node {
          uid
          data {
            title
            subheading
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 960) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              url
              alt
            }
            date(formatString: "dddd DD MMMM YYYY")
            body {
              html
            }
            category {
              uid
              document {
                data {
                  title
                }
              }
            }
            tags {
              tag {
                id
                slug
                isBroken
                document {
                  data {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default PostTemplate
