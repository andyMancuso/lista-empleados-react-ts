import { type User } from '../types'

export const fetchUsers = async ({ pageParam }: { pageParam?: number }) => {
  return await fetch(`https://randomuser.me/api?results=10&seed=pepeloco&page=${pageParam}`)
    .then(async res => {
      if (!res.ok) throw new Error('Something went wrong')
      return await res.json()
    })
    .then(res => {
      const currentPage = Number(res.info.page)
      const nextPage = currentPage > 10 ? undefined : currentPage + 1
      const users: User[] = (res.results)
      return {
        users,
        nextPage,
      }
    })
}
