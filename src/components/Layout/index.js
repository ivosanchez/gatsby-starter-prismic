import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../Header'
import SEOLayout from '../SEO/Layout'

import '../../styles/index.css'

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Fragment>
        <SEOLayout location={location} />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="max-w-xl mx-auto p-6"> {children} </div>
      </Fragment>
    )}
  />
)

Layout.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
