import { useEffect, useState} from 'react'
import { useAuth } from '../../Context/MyContext';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../Utils/cookies';

const Login = () => {
  const Navigate = useNavigate();
  const { setEmpData } = useAuth();
  useEffect(() => {
    const token = getCookie('token');
    if(token){
      const getEmpData = getCookie('empData');
      setEmpData(JSON.parse(getEmpData));
      Navigate('/dashboard');
    } 
  }, []);
  
  const {loginAPI} = useAuth();
  const [empIdOrMobile, setEmpIdOrMobile] = useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const imgPartStyles = {
    height: "100vh",
    width: "100%",
    background: "linear-gradient( to right, #FED438, white)"
  }
  const logoBg = {
    background: "linear-gradient( to bottom ,  #FED438, white)",
    height:'7rem',
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    const loginData ={
      empIdOrMobile,
      password
    };
    loginAPI(loginData , setError ,setLoading);
  }
  return (
    <>
      <div className="flex justify-center items-center w-screen">
        <div className="basis-1/2 flex flex-col justify-center items-center h-screen " style={imgPartStyles}>
            <div >
              <h1 className=' text-5xl font-bold pb-3 tracking-wide'><span className='text-dark'>WELCOME</span> <br/><span>TO GALO ENERGY</span></h1>
              <p className='text-dark font-semibold  pt-3 tracking-wide not-italic hover:italic'>Connecting <br/> You to Seamless Solutions.<br/>
                Your Trusted Partner, Always With in Reach.
              </p>
            </div>
        </div>
        <div className="basis-1/2 flex justify-center items-center " >
          <div className="login-container border h-fit rounded-lg" >
          <div className="logoContainer flex justify-center items-center w-full rounded-lg" style={logoBg}>
            {/* <img src={galoLogo} alt='Galo' className='content-center mx-auto' height={100} width={100}/> */}
            <h1 className='text-5xl font-bold'>GALO</h1>
          </div>
          <div className='p-12'>

            <h1 className='text-3xl font-bold'>Login</h1>
            <p className='font-normal tracking-wide text-slate-400 text-xs mt-2 w-full'>Enter your personal details and start work<br/>  with us.</p>
            <form onSubmit={handleSubmit}>
              <div className='mt-4'>
                <label htmlFor="empIdOrMobile" className='font-mono subpixel-antialiased'>User Id:</label>
                <input
                  type="text"
                  id="empIdOrMobile"
                  value={empIdOrMobile}
                  onChange={(e) => setEmpIdOrMobile(e.target.value)}
                  required
                  className='block w-full rounded-md border-0 py-1.5 pl-7 mt-1 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6'
                />
              </div>

              <div className='mt-4'>
                <label htmlFor="password" className='font-mono subpixel-antialiased'>Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 mt-1 my-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6'
                />
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
              <p className='font-normal tracking-wide text-slate-400 text-xs pb-5 text-right w-full'>Forgot Your Password.?</p>
              <div>
                <button type="submit" disabled={loading} className="rounded-md w-full px-2.5 py-1.5 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 firstBgColor">
                {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
