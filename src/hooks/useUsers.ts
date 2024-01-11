import { type QueryFunction, type QueryKey, useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/users'
import { type User } from '../types'

export const useUsers = () => {
  const {
    isLoading,
    isError,
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{ users: User[], nextPage: number }>(
    {
      queryKey: ['users'],
      queryFn: fetchUsers as QueryFunction<{ users: User[], nextPage: number }, QueryKey, unknown>,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 0,
    },
  )

  return {
    isLoading,
    isError,
    data,
    users: data?.pages.flatMap(page => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
  }
}
