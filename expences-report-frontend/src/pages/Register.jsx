import NavigationButton from '../components/NavigationButton';
import RegistrationCard from '../components/RegistrationCard';

export default function Register() {
  return (
    <div className=''>
       <div className='d-flex flex-column justify-content-center align-items-center mt-5 text-center gap-2'>
      <h1>Registrati</h1>
      </div>
      <RegistrationCard />
      <div className='d-flex flex-column justify-content-center align-items-center mt-0 text-center gap-2'>
      <NavigationButton to="/login" label="Vai alla login" />
      </div>
    </div>
  );
}