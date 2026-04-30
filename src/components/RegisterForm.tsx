import { useState, type SyntheticEvent } from 'react'
import { useAuthContext } from '../utils.py/AuthContext'

// Register form component lets a new user create an account.
export default function RegisterForm() {
  const {handleRegister} = useAuthContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e:SyntheticEvent) => {
    e.preventDefault()
    handleRegister(username.trim(), password)
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label>
        Username
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choose a password"
          required
          minLength={6}
        />
      </label>
      <button className="primary" type="submit">Register</button>
    </form>
  )
}
