import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <h1 className="m-40">Hi people</h1>
        <p className="text-gray-400">Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <Link to="/page-2/">Go to page 2</Link>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
