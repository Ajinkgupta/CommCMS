import { api_endpoint } from '@/constants/index';
import { GraphQLClient, gql } from 'graphql-request';

export const getConfig = async () => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    {
      commcmsConfig(first: 1, orderBy: updatedAt_DESC) {
        siteName
        siteDescription
       openGraph {
          url
          width
          height
        }
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};

export const getBlogsAndEvents = async () => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    {
      blogs(first: 4, orderBy: updatedAt_DESC) {
        title
        date
        tags
        slug
        bannerImage {
          url
          width
          height
        }
      }
      events(first: 4, orderBy: updatedAt_DESC) {
        title
        tags
        subheading
        slug
        bannerImage {
          url
          width
          height
        }
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};





export const getPaginatedBlogs = async () => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    query getPaginatedBlog {
      blogsConnection(orderBy: updatedAt_DESC, first: 5, skip: 0) {
        edges {
          node {
            title
            date
            tags
            slug
            content
            bannerImage {
              url
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};

 

export const getEvents = async () => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    {
      events {
        title
        tags
        subheading
        slug
        bannerImage {
          url
          width
          height
        }
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};

export const getSingleBlog = async slug => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    query getSingleBlog($slug: String!) {
      blogs(where: { slug: $slug }) {
        title
        date
        tags
        slug
        content
        bannerImage {
          url
          width
          height
        }
      }
    }
  `;

  const slugName = {
    slug
  };

  const response = await graphQLClient.request(query, slugName);
  return response;
};

export const getSingleEvent = async slug => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    query getSingleEvent($slug: String!) {
      events(where: { slug: $slug }) {
        title
        tags
        subheading
        register
        content
        slug
        bannerImage {
          url
          width
          height
        }
      }
    }
  `;

  const slugName = {
    slug
  };

  const response = await graphQLClient.request(query, slugName);
  return response;
};

export const getEventSlugs = async () => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    {
      events {
        slug
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};

export const getBlogSlugs = async () => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    {
      blogs {
        slug
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};
