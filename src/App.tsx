import { useMemo, useState } from 'react'
import './App.css'
import Users from './components/Users'
import { SortBy } from './types.d'
import { Header } from './components'
import { useUsers } from './hooks/useUsers'


const App = () => {
  const {
    isLoading,
    isError,
    users,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useUsers()

  console.log(users)

  const [isDefaultColor, setIsDefaultColor] = useState(false)
  const [sortingValue, setSortingValue] = useState<SortBy>(SortBy.NONE)
  const [countryFilterValue, setCountryFilterValue] = useState('')


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


  const changeColors = () => {
    setIsDefaultColor(prev => !prev)
  }

  const deleteRow = (email: string) => {
    // const filteredUsers = users.filter((user) => user.email !== email)
    // setUsers(filteredUsers)
  }

  const resetUsers = () => {
    void refetch()
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

          <button
            disabled={!hasNextPage}
            style={{
              margin: '30px 0 30px 0',
            }}
            onClick={() => { void fetchNextPage() }}
          >
            {hasNextPage ? 'Load more users' : 'No more users'}
          </button>


        </div>
        }
        {isLoading && <p style={{ marginTop: '60px' }}>Loading...</p>}
        {!isLoading && isError && <p style={{ marginTop: '60px' }}>Something went wrong</p>}
        {!isLoading && users.length === 0 && <p style={{ marginTop: '60px' }}>No users found</p>}
      </main>
    </>

  )
}

export default App
