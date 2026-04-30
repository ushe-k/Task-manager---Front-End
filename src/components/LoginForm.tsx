import { useState, type SyntheticEvent} from 'react'
import { useAuthContext } from '../utils.py/AuthContext'

// Login form component lets the user enter username and password.
export default function LoginForm({  }) {
  const {handleLogin} = useAuthContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)


  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    handleLogin(username.trim(), password)
    setLoading(true)
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        Username
        <input
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
            
          }
          placeholder="Enter username"
          required
          
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
      </label>
      <button className="primary" type="submit" onclick={()=>{handleSubmit}}>
        {
          loading?
          (
          <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Loading...</span>
          </button>
          ):
          (<p>login</p>)
        }
      </button>
        
    </form>
  )
}
