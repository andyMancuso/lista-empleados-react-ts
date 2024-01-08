import { TableHeader } from '..'
import { type SortBy, type User } from '../../types.d'

interface Props {
  users: User[] | undefined
  isDefaultColor: boolean
  deleteRow: (email: string) => void
  handleSortBy: (newSortingValue: SortBy) => void
}

const Users = (props: Props) => {
  const {
    users,
    isDefaultColor,
    deleteRow,
    handleSortBy,
  } = props


  return (
    <>
      <table style={{ width: '100%', marginTop: '40px' }}>
        <thead>
          <tr>
            <th>Picture</th>
            <TableHeader
              title='Name'
              value='name'
              handleSortBy={handleSortBy}
            />
            <TableHeader
              title='Last Name'
              value='last'
              handleSortBy={handleSortBy}
            />
            <TableHeader
              title='Country'
              value='country'
              handleSortBy={handleSortBy}
            />
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? '#333' : '#555'

            return (
              <tr
                key={user.login.sha1}
                style={{
                  backgroundColor: isDefaultColor
                    ? backgroundColor
                    : 'transparent',
                }}
              >
                <td>
                  <img src={user.picture.large} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => { deleteRow(user.email) }}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </>
  )
}

export default Users
