import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <div className="bg-purple mb-6">
    <div className="max-w-xl mx-auto p-6">
      <h1>
        <Link to="/" className="no-underline text-white">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header
