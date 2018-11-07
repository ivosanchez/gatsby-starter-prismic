const _ = require('lodash')
const chalk = require('chalk')
const PurgeCssPlugin = require('purgecss-webpack-plugin')
const path = require('path')
const glob = require('glob')
const { paginate } = require('gatsby-awesome-pagination')

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
        allPrismicPost {
          totalCount
        }
        allPrismicTag {
          totalCount
        }
        allPrismicCategories {
          totalCount
        }
        allPrismicMenu {
          totalCount
        }
        allPrismicPage {
          totalCount
        }
        allPrismicContactIndex {
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
        allPrismicPost(sort: { fields: data___date, order: DESC }) {
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
    const promiseMenu = graphql(`
      {
        allPrismicMenu {
          edges {
            node {
              uid
              data {
                link {
                  isBroken
                }
              }
            }
          }
        }
      }
    `)
    const promisePages = graphql(`
      {
        allPrismicPage {
          edges {
            node {
              uid
            }
          }
        }
      }
    `)
    const promiseContactIndex = graphql(`
      {
        prismicContactIndex {
          uid
        }
      }
    `)
    const {
      allPrismicPost,
      allPrismicTag,
      allPrismicCategories,
      allPrismicPage,
      allPrismicContactIndex,
    } = graphqlResult.data

    // ! Posts ↓ needs to be updated per project
    if (
      allPrismicPost &&
      allPrismicPost.totalCount &&
      allPrismicPost.totalCount > 0
    ) {
      const graphqlPost = await promisePosts
      const posts = graphqlPost.data.allPrismicPost.edges
      paginate({
        createPage,
        items: posts,
        itemsPerPage: 6,
        pathPrefix: '/posts',
        component: path.resolve('./src/templates/page-posts.js'),
      })
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
      allPrismicTag &&
      allPrismicTag.totalCount &&
      allPrismicTag.totalCount > 0
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
      allPrismicCategories &&
      allPrismicCategories.totalCount &&
      allPrismicCategories.totalCount > 0
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

    // page - repeatable page - repeat
    if (
      allPrismicPage &&
      allPrismicPage.totalCount &&
      allPrismicPage.totalCount > 0
    ) {
      const graphqlPages = await promisePages
      graphqlPages.data.allPrismicPage.edges.forEach(({ node }) => {
        createPage({
          path: node.uid,
          component: path.resolve('./src/templates/page.js'),
          context: {
            uid: node.uid,
          },
        })
      })
    }
    // page - contact page - single
    if (
      allPrismicContactIndex &&
      allPrismicContactIndex.totalCount &&
      allPrismicContactIndex.totalCount === 1
    ) {
      const graphqlPagesContact = await promiseContactIndex
      const pageContactUid = graphqlPagesContact.data.prismicContactIndex.uid
      createPage({
        path: pageContactUid,
        component: path.resolve('./src/templates/page-contact.js'),
        context: {
          uid: pageContactUid,
        },
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      log(chalk.yellow.bgBlue(`❌  Error at CreatePages: ${error.message}`))
    } else {
      log(chalk.yellow.bgBlue(`❌ Error at CreatePages: ${error}`))
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
