import React from "react"
import { graphql } from "gatsby"
import Container from "../components/container"
import * as blogStyles from "./blog-post.module.css"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  return (
    <Container>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Container>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`