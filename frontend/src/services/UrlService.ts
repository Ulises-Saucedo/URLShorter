import { api } from '@/api/axios'
import type { AxiosResponse } from 'axios'

export default {
  async createShortUrl(url: string, token: string): Promise<AxiosResponse> {
    return await api.post(
      '/url/save',
      {
        originalURL: url
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  },
  async createShortUrlTtl(url: string): Promise<AxiosResponse> {
    return await api.post('/url/ttl', {
      originalURL: url
    })
  },
  async redirectToOriginalUrl(shortUrl: string): Promise<AxiosResponse> {
    return await api.get(`/url/redirect/${shortUrl}`)
  },
  async updateUrl(url: string, shortUrl: string, token: string): Promise<AxiosResponse> {
    return await api.put(
      `/url/update/${shortUrl}`,
      {
        originalURL: url
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  },
  async removeUrl(shortUrl: string, token: string): Promise<AxiosResponse> {
    return await api.delete(`/url/remove/${shortUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  async getUserShortedUrls(token: string, page?: number, limit?: number): Promise<AxiosResponse> {
    return await api.get('/url/list', {
      params: {
        page: page || 1,
        limit: limit || 10
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
