module.exports = {
  site: {
    title: `Batch's Gatsby Starter (Prismic Edition)`,
    description: `Batch's Gatsby Starter for Prismic projects`, // Used in the meta description
    siteUrl: `https://gatsby-starter-batch-prismic.netlify.com`, // No trailing slash
    twitterHandle: `@batchnz`,
    image: `site-image.jpg`, // Relative to the folder `./static/`
  },
  manifest: {
    shortName: `Batch Starter`, // Under 12 characters.
    bgColor: `#ff006a`,
    themeColor: `#ff006a`,
    icon: `icon.png`, // Relative to the folder `./src/images/`
  },
  google: {
    analytics: {
      trackingId: ``,
    },
  },
  prismic: {
    repository: `gatsby-starter-batch`,
  },
}
