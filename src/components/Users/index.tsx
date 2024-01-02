import { type User } from '../../types'

interface Props {
  users: User[]
  isDefaultColor: boolean
}

const Users = (props: Props) => {
  const {
    users,
    isDefaultColor
  } = props

  return (
    <>
      <table style={{ width: '100%', marginTop: '40px' }}>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Last name</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            users.map((user, index) => {
              const backgroundColor = index % 2 === 0 ? '#333' : '#555'

              return (
                <tr
                  key={user.login.uuid}
                  style={{ backgroundColor: isDefaultColor ? backgroundColor : 'transparent' }}
                >
                  <td>
                    <img src={user.picture.large} />
                  </td>
                  <td>{user.name.first}</td>
                  <td>{user.name.last}</td>
                  <td>{user.location.country}</td>
                  <td>
                    <button>Delete</button>
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
