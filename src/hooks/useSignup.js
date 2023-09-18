import { useState } from 'react'
import { useAuthContext } from '../shared/useAuthContext'
export const useSignup = () => {
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (firstname,lastname,email, password,role) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:3002/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ firstname,lastname,email, password,role })
    })
    const json = await response.json()
    if (!response.ok) {
      console.log("hello")
      setIsLoading(false)
      setError(json[0])
      console.log(json.error)
      console.log(json[0])  

    }
    if (response.ok) {
     setError("");
     setMessage('You have successfuly added the new member ') ;
      console.log(json)

      
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error ,message }
}

