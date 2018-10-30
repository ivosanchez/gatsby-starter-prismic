const config = require('./data/site-config')

module.exports = {
  siteMetadata: {
    title: config.site.title,
    siteUrl: config.site.url, // No trailing slash
  },
  plugins: [
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.site.title,
        short_name: config.manifest.shortName,
        start_url: '/',
        background_color: config.manifest.bgColor,
        theme_color: config.manifest.themeColor,
        display: 'minimal-ui',
        icon: config.manifest.icon, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: config.prismic.repository,
        accessToken: process.env.PRISMIC_TOKEN,
        // See: https://prismic.io/docs/javascript/query-the-api/link-resolving
        linkResolver: ({ node, key, value }) => doc => {
          if (doc.type === 'menu') return '/menu/' + doc.uid
          // Fallback for other types, in case new custom types get created
          return '/' + doc.id
        },
        // See: https://prismic.io/docs/javascript/query-the-api/fetch-linked-document-fields
        fetchLinks: [
          'Color',
          'Content Relationship',
          'Date',
          'Image',
          'Key Text',
          'Number',
          'Rich Text',
          'Select',
          'Timestamp',
          'Title',
        ],
        // See: https://prismic.io/docs/nodejs/beyond-the-api/html-serializer
        htmlSerializer: ({ node, key, value }) => (
          type,
          element,
          content,
          children
        ) => {
          switch (type) {
            // case 'paragraph': return children = children.map(p => `<p class='paragraph'>${p}</p>`)
            default:
              return null
          }
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.google.analytics.trackingId,
        head: true, // Put tracking script in the head
        respectDNT: true, // Respect users who have enabled Do Not Track
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => process.env.NODE_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    'gatsby-plugin-offline',
    'gatsby-plugin-sharp',
    'gatsby-plugin-netlify-cache',
    {
      // Make sure to put last in the array
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': ['Cache-Control: no-cache'],
        },
      },
    },
  ],
}
