import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'
import { Link } from 'react-router-dom';
import Spiner from '../components/Spiner/Spiner';
import { usePosContext } from '../hooks/usePosContext';
import { useLogin } from '../hooks/hooksAuth';

function LoginForm() {
    const navigate = useNavigate()

    const [api_usuario, setNombre] = useState('')
    const [api_password, setPassword] = useState('')
    const [mensaje, setMensaje] = useState('')
   const { setvalidarUsuario, isLoading} = usePosContext()
   const login = useLogin({ api_usuario, api_password });

   const onSubmit = async(e: React.FormEvent) => {
    try {
      e.preventDefault()
      await login();
      setvalidarUsuario(true)
      navigate('/inicio')
    } catch (error) {
      console.log(error)
    }

     
   
   }
   const disableLogin = api_usuario === '' || api_password === '';
    
   if(isLoading) return <Spiner/>
  return (
    <>
        <form className="bg-gray-100 min-h-screen flex items-center justify-center" onSubmit={onSubmit}>
        <div className="max-w-md p-5 rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            
            {mensaje && (
       <div className="bg-red-100 text-red-500 p-2 rounded-md">
      {mensaje}
       </div>
      )}
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email
              </label>
              <input 
                                type="text"
                                className="form-control w-100"
                                placeholder="Correo"
                                name='nombre'
                                value={api_usuario}
                                onChange={(e) => {
                                    setNombre(e.target.value);
                                    setMensaje(''); // Borrar el mensaje de error al escribir en el campo
                                  }}
                                />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Password
              </label>
              <input placeholder="Password" type="password" name='password' value={api_password} 
              onChange={e => 
              {  setPassword(e.target.value)
                setMensaje(''); }
                } className='text-dark form-control'  />

            </div>
            <div className="flex items-center space-x-2">

              <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
            </div>
            <button
            type="submit"
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full bg-[#4285F4] text-black ${
              disableLogin ? 'disabled:pointer-events-none disabled:opacity-50' : ''
            }`}
            disabled={disableLogin}
          >
              <div className="flex items-center justify-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className=" w-5 h-5 mr-2"
                >
                  <circle cx={12} cy={12} r={10} />
                  <circle cx={12} cy={12} r={4} />
                  <line x1="21.17" x2={12} y1={8} y2={8} />
                  <line x1="3.95" x2="8.54" y1="6.06" y2={14} />
                  <line x1="10.88" x2="15.46" y1="21.94" y2={14} />
                </svg>
              <span className='cursor-pointer text-dark'>Login</span> 
              </div>
            </button>
       
          </div>
          <div className='d-flex justify-content-center mt-3'>
          <Link to='/register'>¿Aun no tienes una cuenta? Registrate</Link>
          </div>
          
        </div>
       
      </form>
      
    </>
    
  )
}

export default LoginForm