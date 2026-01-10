import { PAGE_SIZE } from '../config'
import type { Blog, PaginatedResponse } from '../types'
import { BaseService } from "./base-service"

type ShopifyBlogResponse = {
  id: number
  handle: string
  title: string
  body_html: string
  author: string
  created_at: string
  updated_at: string
  commentable: string
  feedburner: string
  feedburner_location: string
  template_suffix: string
  tags: string
}

type BlogListResponse = {
  blogs: ShopifyBlogResponse[]
}

function transformShopifyBlog(blog: ShopifyBlogResponse): Blog {
  return {
    id: blog.id.toString(),
    slug: blog.handle,
    title: blog.title,
    description: blog.body_html?.substring(0, 200) || '',
    image: null,
    publishedAt: blog.created_at,
    updatedAt: blog.updated_at,
    status: blog.commentable === 'yes' ? 'active' : 'draft',
  }
}

export class BlogService extends BaseService {
  private static instance: BlogService

  static getInstance(): BlogService {
    if (!BlogService.instance) {
      BlogService.instance = new BlogService()
    }
    return BlogService.instance
  }

  /**
   * List all blogs
   */
  async list({ page = 1, perPage = PAGE_SIZE } = {}): Promise<PaginatedResponse<Blog>> {
    const searchParams = new URLSearchParams()
    searchParams.set('limit', String(Math.min(perPage, 250)))

    try {
      const res = await this.get<BlogListResponse>('/blogs.json?' + searchParams.toString())

      return {
        page,
        pageSize: perPage,
        count: res.blogs?.length || 0,
        noOfPage: 1,
        data: res.blogs?.map(transformShopifyBlog) || []
      }
    } catch (error: any) {
      console.error("Error fetching blogs:", error)
      return {
        page,
        pageSize: perPage,
        count: 0,
        noOfPage: 1,
        data: []
      }
    }
  }

  /**
   * Get a single blog by ID
   */
  async getOne(id: string) {
    try {
      const blog = await this.get<ShopifyBlogResponse>('/blogs/' + id + '.json')
      return transformShopifyBlog(blog)
    } catch (error: any) {
      console.error("Error fetching blog:", error)
      return null
    }
  }

  /**
   * Get blog articles
   */
  async getArticles(blogId: string, { page = 1, perPage = PAGE_SIZE } = {}) {
    const searchParams = new URLSearchParams()
    searchParams.set('limit', String(Math.min(perPage, 250)))

    try {
      const res = await this.get<any>('/blogs/' + blogId + '/articles.json?' + searchParams.toString())
      return {
        data: res.articles?.map((article: any) => ({
          id: article.id.toString(),
          title: article.title,
          body: article.body_html,
          author: article.author,
          createdAt: article.created_at,
          updatedAt: article.updated_at,
          blogId: article.blog_id.toString(),
        })) || [],
        count: res.articles?.length || 0,
        page,
        pageSize: perPage
      }
    } catch (error: any) {
      console.error("Error fetching blog articles:", error)
      return { data: [], count: 0, page, pageSize: perPage }
    }
  }
}

export const blogService = BlogService.getInstance()
