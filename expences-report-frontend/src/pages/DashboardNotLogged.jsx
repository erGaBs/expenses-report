import NavigationButton from '../components/NavigationButton';
import Button from "@mui/material/Button";


export default function DashboardNotLogged() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5 text-center gap-2'>
      <h1>Dashboard, ma non sei loggato</h1>
      <NavigationButton to="/login" label="Vai al Login" />
    </div>
  );
}