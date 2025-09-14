import NavigationButton from '../components/NavigationButton';
import Button from "@mui/material/Button";


export default function DashboardNotLogged() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5 text-center gap-2'>
      <h1>Dashboard</h1>
      <br></br>
      <span>Non sei loggato, effettua la login per avere accesso ai tuoi report</span>
       <br></br>
      <NavigationButton to="/login" label="Vai al Login" />
    </div>
  );
}