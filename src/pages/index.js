import React from 'react'

import Layout from '../components/Layout'
import Form from '../components/Form'
import SEOPage from '../components/SEO/Page'

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <SEOPage title="!optional title, home page" location={location} />
    <h1>Home</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Form />
  </Layout>
)

export default IndexPage
