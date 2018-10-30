const _ = require('lodash')
const chalk = require('chalk')
const PurgeCssPlugin = require('purgecss-webpack-plugin')
const { createRemoteFileNode } = require('gatsby-source-filesystem')
const path = require('path')
const glob = require('glob')

const log = console.log

const PATHS = {
  src: path.join(__dirname, 'src'),
}

const purgeCssConfig = {
  paths: glob.sync(`${PATHS.src}/**/*.js`, { nodir: true }),
  extractors: [
    {
      extractor: class {
        static extract(content) {
          return content.match(/[A-Za-z0-9-_:/]+/g) || []
        }
      },
      extensions: ['js'],
    },
  ],
  // Adjust for each project
  whitelist: ['class-to-whitelist'],
  // Adjust for each project
  whitelistPatterns: [/body/, /headroom/, /ReactModal/, /ril/],
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  try {
    // ! ↓ needs to be updated per project
    const graphqlResult = await graphql(`
      {
        allPrismicPage {
          edges {
            node {
              uid
            }
          }
        }
        allPrismicPost {
          totalCount
        }
        allPrismicTag {
          totalCount
        }
        allPrismicCategories {
          totalCount
        }
      }
    `)
    const promiseCategories = graphql(`
      {
        allPrismicCategories {
          totalCount
          edges {
            node {
              id
              uid
              data {
                title
              }
            }
          }
        }
      }
    `)
    const promisePosts = graphql(`
      {
        allPrismicPost {
          edges {
            node {
              uid
              data {
                title
                image {
                  url
                }
              }
            }
          }
        }
      }
    `)
    const promiseTags = graphql(`
      {
        allPrismicTag {
          edges {
            node {
              uid
              data {
                title
              }
            }
          }
        }
      }
    `)
    // ! Pages ↓ needs to be updated per project
    graphqlResult.data.allPrismicPage &&
      graphqlResult.data.allPrismicPage.edges.forEach(({ node }) => {
        createPage({
          path: `${node.uid}`,
          component: path.resolve('./src/templates/page.js'),
          context: { uid: node.uid },
        })
      })
    // ! Posts ↓ needs to be updated per project
    if (
      graphqlResult.data.allPrismicPost &&
      graphqlResult.data.allPrismicPost.totalCount &&
      graphqlResult.data.allPrismicPost.totalCount > 0
    ) {
      const graphqlPost = await promisePosts
      const posts = graphqlPost.data.allPrismicPost.edges
      posts.forEach(({ node }, index) => {
        const previous =
          index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node
        createPage({
          path: `posts/${node.uid}`,
          component: path.resolve('./src/templates/post.js'),
          context: {
            uid: node.uid,
            previous,
            next,
          },
        })
      })
    }
    // ! Tags ↓ needs to be updated per project
    if (
      graphqlResult.data.allPrismicTag &&
      graphqlResult.data.allPrismicTag.totalCount &&
      graphqlResult.data.allPrismicTag.totalCount > 0
    ) {
      const graphqlTags = await promiseTags
      graphqlTags.data.allPrismicTag.edges.forEach(({ node }) => {
        createPage({
          path: `tags/${node.uid}`,
          component: path.resolve('./src/templates/tag.js'),
          context: {
            uid: node.uid,
            title: node.data.title,
          },
        })
      })
    }
    // ! Categories ↓ Needs to be updated per project
    if (
      graphqlResult.data.allPrismicCategories &&
      graphqlResult.data.allPrismicCategories.totalCount &&
      graphqlResult.data.allPrismicCategories.totalCount > 0
    ) {
      const graphqlCategories = await promiseCategories
      graphqlCategories.data.allPrismicCategories.edges.forEach(({ node }) => {
        createPage({
          path: `categories/${node.uid}`,
          component: path.resolve('./src/templates/category.js'),
          context: {
            uid: node.uid,
            title: node.data.title,
          },
        })
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      log(chalk.yellow.bgBlue(`❌  Error at CreatePages: ${error.message}`))
    } else {
      log(chalk.yellow.bgBlue(` ❌ Error at CreatePages: ${error}`))
    }
  }
}

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage.includes('develop')) {
    actions.setWebpackConfig({
      devtool: 'cheap-module-source-map',
    })
    return true
  }

  // Add PurgeCSS in production
  // See: https://github.com/gatsbyjs/gatsby/issues/5778#issuecomment-402481270
  if (stage.includes('build')) {
    actions.setWebpackConfig({
      plugins: [new PurgeCssPlugin(purgeCssConfig)],
    })
  }
}
/* END */
