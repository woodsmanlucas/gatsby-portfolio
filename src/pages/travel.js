import React from "react"
import { graphql } from "gatsby"
import Container from "../components/container"
import * as travelStyles from "./tech.module.css"


export default function Home({ data }) {
  console.log(data)
  return (
      <Container>
        <h1>
          This is my travel blog.
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3 className={travelStyles.date}>{node.frontmatter.date}</h3>
            <h3 className={travelStyles.title}><a href={node.fields.slug} >{node.frontmatter.title}</a></h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
    </Container>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {categories: {eq: "travel"}}}, sort: { fields: [frontmatter___date], order: DESC}) {
        totalCount
      edges {
        node {
          fields{
            slug
          }
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`