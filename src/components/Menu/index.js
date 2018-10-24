import React from 'react'
import Img from 'gatsby-image'
import { Link, StaticQuery, graphql } from 'gatsby'

const MenuItem = ({ title, link }) => (
  <Link
    to={link}
    className="text-lg no-underline text-white hover:text-blue-dark ml-2"
  >
    {title}
  </Link>
)

const Menu = () => {
  let menuList = [
    {
      node: {
        id: 'fixed-title-posts',
        uid: 'posts',
        data: {
          title: 'Posts',
        },
      },
    },
  ]
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
          allPrismicMenu(sort: { fields: [data___order], order: ASC }) {
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
          logo: file(relativePath: { eq: "gatsby-icon.png" }) {
            childImageSharp {
              fixed(width: 50) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={data => {
        const { site, allPrismicMenu } = data
        if (allPrismicMenu.totalCount && allPrismicMenu.totalCount > 0) {
          menuList = menuList.concat(allPrismicMenu.edges)
        }
        return (
          <nav className="font-sans flex items-center flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline bg-purple">
            <div className="mb-2 sm:mb-0">
              <Link
                to="/"
                className="no-underline text-white flex justify-between items-center"
              >
                <Img
                  fixed={data.logo.childImageSharp.fixed}
                  alt="An example for using the file-system to query static image"
                  className="mr-6"
                />
                <h1>{site.siteMetadata.title}</h1>
              </Link>
            </div>
            <div>
              {menuList.map(({ node }) => (
                <MenuItem
                  title={node.data.title}
                  link={`/${node.uid}`}
                  key={node.id}
                />
              ))}
            </div>
          </nav>
        )
      }}
    />
  )
}

export default Menu
