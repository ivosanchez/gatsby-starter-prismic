// Used for tags, category and timestamp
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const PreviousBtn = ({ humanPageNumber, previousPagePath }) => {
  const isFirstPage = humanPageNumber === 1
  if (isFirstPage) {
    return (
      <li>
        <span className="block text-grey px-3 py-2">Home</span>
      </li>
    )
  } else {
    return (
      <li>
        <Link
          className="block hover:text-white hover:bg-blue text-blue border-r border-grey-light px-3 py-2"
          to={previousPagePath}
        >
          Previous
        </Link>
      </li>
    )
  }
}

const NextBtn = ({ humanPageNumber, nextPagePath, numberOfPages }) => {
  const isLastPage = humanPageNumber === numberOfPages
  if (isLastPage) {
    return (
      <li>
        <span className="block text-grey px-3 py-2">End</span>
      </li>
    )
  } else {
    return (
      <li>
        <Link
          className="block hover:text-white hover:bg-blue text-blue px-3 py-2"
          to={nextPagePath}
        >
          Next
        </Link>
      </li>
    )
  }
}

const PagesLinks = ({ numberOfPages, pageNumber }) => {
  const pagesLinkArr = Array.from(Array(numberOfPages).keys())
  return pagesLinkArr.map(pageIndex => {
    const isActive = pageNumber === pageIndex
    const path = pageIndex === 0 ? '/posts' : `/posts/${pageIndex + 1}`
    const renderHumanPageNumber = pageIndex + 1
    return (
      <li key={renderHumanPageNumber}>
        {isActive ? (
          <span className="block text-grey px-3 py-2">
            {renderHumanPageNumber}
          </span>
        ) : (
          <Link
            className="block hover:text-white hover:bg-blue text-blue border-r border-grey-light px-3 py-2"
            to={path}
          >
            {renderHumanPageNumber}
          </Link>
        )}
      </li>
    )
  })
}

const Pagination = ({ pageContext }) => (
  <ul className="flex list-reset border border-grey-light rounded w-auto font-sans">
    <PreviousBtn {...pageContext} />
    <PagesLinks {...pageContext} />
    <NextBtn {...pageContext} />
  </ul>
)

Pagination.propTypes = {
  pageContext: PropTypes.object.isRequired,
}
export default Pagination
