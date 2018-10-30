import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import urljoin from 'url-join'

import config from '../../../data/site-config'
import TwitterCard from './TwitterCard'
import OpenGraph from './OpenGraph'
import socialBanner from '../../images/social-banner.jpg'

class SEOPage extends Component {
  state = { socialBanner }

  UNSAFE_componentWillMount() {
    const { location } = this.props
    if (location && process.env.NODE_ENV === 'production') {
      this.setState({
        socialBanner: urljoin(String(location.href), socialBanner),
      })
    }
  }

  render() {
    const { title, type, description } = this.props
    return (
      <Fragment>
        {title && <Helmet title={title} />}
        <TwitterCard
          title={config.site.title}
          site={config.twitterHandle}
          image={this.state.socialBanner}
        />
        {title && <OpenGraph title={title} />}
        {type && <OpenGraph type={type} />}
        {description && <OpenGraph description={description} />}
      </Fragment>
    )
  }
}

SEOPage.propTypes = {
  location: PropTypes.object.isRequired,
  // ↓ ↓ ↓ optional, over write page default meta tags
  title: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
}

export default SEOPage
