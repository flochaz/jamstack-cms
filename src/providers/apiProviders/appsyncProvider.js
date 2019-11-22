import { itemsByContentType, listPages, listPosts } from '../../graphql/queries';
import getSignedImage from '../../utils/getSignedImage';
import { API, graphqlOperation } from "aws-amplify"

export async function  fetchPages() {
    try {
      const pageData = await API.graphql(graphqlOperation(listPages))
      const { items: pages } = pageData.data.listPages
      return pages;
    } catch (err) {
      console.log('error fetching posts:', err)
    }
  }
  export async function fetchPosts() {
    try {
      const postData = await API.graphql(graphqlOperation(listPosts))
      const { items: posts } = postData.data.listPosts
      return posts;
    } catch (err) {
      console.log('error fetching posts:', err)
    }
  }

  export async function fetchItemsByContentType() {
    try {
      const postData = await API.graphql(graphqlOperation(itemsByContentType, { limit: 500, contentType: "Post" }))
      const { items: posts } = postData.data.itemsByContentType
      const postsWithSignedImages = await Promise.all(posts.map(async post => {
        if (!post.cover_image) return post
        const signedImage = await getSignedImage(post.cover_image)
        post['signedImage'] = signedImage
        return post
      }))
      return postsWithSignedImages;
    } catch (err) {
      console.log('error fetching fetchItemsByContentType:', err)
    }
  }