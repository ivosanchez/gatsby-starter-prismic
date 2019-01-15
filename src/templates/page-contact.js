import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEOPage from '../components/SEO/Page'
import Form from '../components/Form'

const PageContactTemplate = ({ data, location }) => {
  const page = data.prismicContact.data
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
      <Form />
    </Layout>
  )
}

PageContactTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export const pageContactQuery = graphql`
  query {
    prismicContact {
      uid
      data {
        title
        subheading
        body {
          html
        }
      }
    }
  }
`

export default PageContactTemplate
