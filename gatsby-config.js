const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'gatsby-three-ts-plus',
    description: 'A starter kit for Three.js scenes using a TypeScript-based Gatsby framework with emotion and tailwindcss.',
    keywords: 'three.js, typescript, gatsbyjs, gatsby, emotion, tailwindcss',
    siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com',
    author: {
      name: 'Shumpei Koike',
      url: 'https://twitter.com/shunpei42ba_',
      email: 'resir014@gmail.com'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com'
      }
    },
    'gatsby-plugin-emotion',
    `gatsby-plugin-postcss`,
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-robots-txt'
  ]
}
