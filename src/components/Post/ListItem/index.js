import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Link from '../../TransitionLink'

const PostListItem = ({ uid, title, date, subheading }) => (
  <div className="mb-10">
    <h2 className="text-2xl leading-tight mb-1">
      <Link
        classSpan="no-underline hover:underline focus:underline"
        cover
        direction="right"
        to={`/posts/${uid}`}
      >
        {title}
      </Link>
    </h2>
    {date && <div className="text-xl text-grey-dark mb-4">{date}</div>}
    {subheading && <div dangerouslySetInnerHTML={{ __html: subheading }} />}
  </div>
)

PostListItem.propTypes = {
  uid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  subheading: PropTypes.string,
}

export const PostsItemFragment = graphql`
  fragment PostsItem on PrismicPosts {
    uid
    id
    data {
      title
      subheading
      date(formatString: "dddd DD MMMM YYYY")
    }
  }
`
export default PostListItem
