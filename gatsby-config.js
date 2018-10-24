module.exports = {
  siteMetadata: {
    title: "Batch's Gatsby Starter",
    siteUrl: 'https://www.batch.nz',
  },
  plugins: [
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'gatsby-starter-batch',
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
