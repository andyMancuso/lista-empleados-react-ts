import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import Users from './components/Users'
import { SortBy, type User } from './types.d'
import Pagination from './components/Pagination'
import { Header } from './components'

const fetchUsers = async (page: number) => {
  return await fetch(`https://randomuser.me/api?results=10&seed=pepeloco&page=${page}`)
    .then(async res => {
      if (!res.ok) throw new Error('Something went wrong')
      return await res.json()
    })
    .then(res => res.results)
}

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isDefaultColor, setIsDefaultColor] = useState(false)
  const [sortingValue, setSortingValue] = useState<SortBy>(SortBy.NONE)
  const [countryFilterValue, setCountryFilterValue] = useState('')
  const originalUsers = useRef<User[]>([])
  const [isLoading, setIsloading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setIsloading(true)
    setIsError(false)

    fetchUsers(currentPage)
      .then(fetchedUsers => {
        setUsers(prevUsers => {
          const uniqueFetchedUsers = fetchedUsers.filter((oldUser: { login: { uuid: string } }) => (
            !prevUsers.some(
              (existingUser: { login: { uuid: string } }) =>
                existingUser.login.uuid === oldUser.login.uuid)
          ))
          const newUsers = [...prevUsers, ...uniqueFetchedUsers]
          originalUsers.current = newUsers
          return newUsers
        })
      })
      .catch(err => {
        setIsError(err)
        console.log(err)
      })
      .finally(() => { setIsloading(false) })
  }, [currentPage])


  const isSortingByCountry = () => {
    const newSortingValue = sortingValue === SortBy.NONE
      ? SortBy.COUNTRY
      : SortBy.NONE
    setSortingValue(newSortingValue)
  }

  const handleSortBy = (newSortingValue: SortBy) => {
    sortingValue === newSortingValue
      ? setSortingValue(SortBy.NONE)
      : setSortingValue(newSortingValue)
  }

  const inputFiltered = useMemo(() => {
    return countryFilterValue
      ? users.filter((user => {
        return user.location.country.toLowerCase().includes(countryFilterValue.toLowerCase())
      }))
      : users
  }, [countryFilterValue, users])


  const sortedByValue = useMemo(() => {
    if (sortingValue === SortBy.COUNTRY) {
      return inputFiltered.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    } else if (sortingValue === SortBy.NAME) {
      return inputFiltered.toSorted((a, b) => a.name.first.localeCompare(b.name.first))
    } else if (sortingValue === SortBy.LAST) {
      return inputFiltered.toSorted((a, b) => a.name.last.localeCompare(b.name.last))
    } else if (sortingValue === SortBy.NONE) {
      return inputFiltered
    }
  }, [inputFiltered, sortingValue])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const changeColors = () => {
    setIsDefaultColor(prev => !prev)
  }

  const deleteRow = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const resetUsers = () => {
    setUsers(originalUsers.current)
    setSortingValue(SortBy.NONE)
  }


  return (
    <>
      <Header
        changeColors={changeColors}
        isSortingByCountry={isSortingByCountry}
        resetUsers={resetUsers}
        setCountryFilterValue={setCountryFilterValue}
        isDefaultColor={isDefaultColor}
        sortingValue={sortingValue}
      />

      <main>
        {users.length > 0 && <div>
          <Users
            users={sortedByValue}
            isDefaultColor={isDefaultColor}
            deleteRow={deleteRow}
            handleSortBy={handleSortBy}
          />
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
        }
        {isLoading && <p style={{ marginTop: '60px' }}>Loading...</p>}
        {isError && <p style={{ marginTop: '60px' }}>Something went wrong</p>}
        {users.length === 0 && <p style={{ marginTop: '60px' }}>No users found</p>}
      </main>

    </>

  )
}

export default App
