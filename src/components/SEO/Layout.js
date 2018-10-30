import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import urljoin from 'url-join'

import config from '../../../data/site-config'
import OpenGraph from './OpenGraph'
import socialBanner from '../../images/social-banner.jpg'

class SEOLayout extends Component {
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
    const { name, url, title, description, keywords } = config.site
    return (
      <Fragment>
        <Helmet>
          <html lang="en" />
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
        </Helmet>
        <OpenGraph
          type="website"
          siteName={name}
          url={url}
          title={title}
          description={description}
          image={this.state.socialBanner}
        />
      </Fragment>
    )
  }
}

SEOLayout.propTypes = {
  location: PropTypes.object.isRequired,
}

export default SEOLayout
