import { api } from '@/api/axios'
import type { AxiosResponse } from 'axios'
import type { RegisterBody, LoginBody, UpdatedAccountBody } from '@/ts/types/auth.types'

export default {
  async register(body: RegisterBody): Promise<AxiosResponse> {
    return await api.post('/user/auth/register', body)
  },
  async login(body: LoginBody): Promise<AxiosResponse> {
    return await api.post('/user/auth/login', body)
  },
  async updateAccount(body: UpdatedAccountBody, id: string): Promise<AxiosResponse> {
    return await api.put(`/user/update/${id}`, body)
  },
  async deleteAccount(id: string): Promise<AxiosResponse> {
    return await api.delete(`/user/remove/${id}`)
  },
  async verify(token: string): Promise<AxiosResponse> {
    return await api.get('/user/verify', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
