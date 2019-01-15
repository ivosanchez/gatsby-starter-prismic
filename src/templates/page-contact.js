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
      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="text" name="name" placeholder="name" />
        <input type="email" name="email" placeholder="email" />
        <input type="textarea" name="message" placeholder="leave a message" />
        <input type="text" name="newsletter" placeholder="newsletter" />
        <input type="text" name="roles" placeholder="newsletter" />
        <input type="text" name="plan" placeholder="plan" />
        <button type="submit">Send</button>
      </form>
      {/* <Form /> */}
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
