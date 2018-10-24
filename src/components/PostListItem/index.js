import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const PostListItem = ({ uid, title, date, subheading }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-start items-baseline">
        <h2>
          <Link to={`/posts/${uid}`}>{title}</Link>
        </h2>
        {date && (
          <span className="text-sm italic text-grey-darker ml-2">{date}</span>
        )}
      </div>
      {subheading && (
        <div
          className="pl-2 pt-2 border-grey-light border-l-2 text-grey-darkest"
          dangerouslySetInnerHTML={{ __html: subheading }}
        />
      )}
    </div>
  )
}

PostListItem.propTypes = {
  uid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  subheading: PropTypes.string,
}

export default PostListItem
