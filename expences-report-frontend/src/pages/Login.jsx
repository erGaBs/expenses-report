import NavigationButton from '../components/NavigationButton';
import LoginCard from '../components/LoginCard';
export default function Login() {

  

  return (
    <div className=''>
       <div className='d-flex flex-column justify-content-center align-items-center mt-5 text-center gap-2'>
      <h1>Login</h1>
      </div>
      <LoginCard />
      <div className='d-flex flex-column justify-content-center align-items-center mt-0 text-center gap-2'>
      <span>Non hai un'account?</span> <NavigationButton to="/register" label="Registrati" />
      </div>
    </div>
  );
}