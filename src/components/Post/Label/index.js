// Used for tags, category and timestamp
import React from 'react'
import PropTypes from 'prop-types'

import Link from '../../TransitionLink'

const PostLabel = ({ text, slug }) => {
  if (slug) {
    return (
      <Link
        classSpan="mr-4 leading-none text-xs px-3 py-1 bg-purple-light hover:bg-purple text-white rounded"
        cover
        direction="right"
        to={slug}
      >
        {text}
      </Link>
    )
  }
  return (
    <span className="leading-none text-xs px-3 py-1 bg-purple-light hover:bg-purple text-white rounded">
      {text}
    </span>
  )
}

PostLabel.propTypes = {
  text: PropTypes.string.isRequired,
  slug: PropTypes.string,
}
export default PostLabel
