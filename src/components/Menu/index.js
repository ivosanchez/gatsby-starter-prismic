import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'

const MenuItem = ({ title, link }) => (
  <Link
    to={link}
    className="inline-block text-white mr-4 no-underline hover:underline focus:underline"
  >
    {title}
  </Link>
)

const Menu = ({ menuList }) => (
  <StaticQuery
    query={graphql`
      query {
        allPrismicMenu(sort: { fields: [data___order], order: ASC }) {
          totalCount
          edges {
            node {
              id
              uid
              data {
                title
                link {
                  isBroken
                  document {
                    ... on PrismicPage {
                      uid
                    }
                    ... on PrismicPostsIndex {
                      uid
                    }
                    ... on PrismicContactIndex {
                      uid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { allPrismicMenu } = data

      if (allPrismicMenu.totalCount && allPrismicMenu.totalCount > 0) {
        menuList = menuList.concat(allPrismicMenu.edges)
      }
      return (
        <div className="flex-grow flex items-center">
          <div className="text-sm flex-grow">
            {menuList.map(({ node }) => {
              // If no relationship filed or Relationship link is broken, return null
              if (!node.data.link || node.data.link.isBroken) return null
              // Slug is page's slug, relationship filed
              const slug = node.data.link.document[0].uid
              return (
                <MenuItem
                  title={node.data.title}
                  link={`/${slug}`}
                  key={node.id}
                />
              )
            })}
          </div>
        </div>
      )
    }}
  />
)

Menu.defaultProps = {
  menuList: [
    {
      node: {
        id: 'home-index',
        data: {
          title: 'Home',
          link: {
            isBroken: false,
            document: [{ uid: '' }],
          },
        },
      },
    },
  ],
}

Menu.propTypes = {
  menuList: PropTypes.array.isRequired,
}

export default Menu
