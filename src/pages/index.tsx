import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

import CoasterScene from '../scenes/CoasterScene'

const IndexPage = () => (
  <IndexLayout>
    <CoasterScene />
  </IndexLayout>
)

export default IndexPage
