import NavigationButton from '../components/NavigationButton';
import Button from "@mui/material/Button";
import DashboardNotLogged from './DashboardNotLogged';


export default function Dashboard (){

  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) {
    return <DashboardNotLogged />;
  }

  return (
    
    <div className='d-flex flex-column justify-content-center align-items-center mt-5 text-center gap-2'>
      <h1>Dashboard normale</h1>
      <NavigationButton to="/login" label="Vai al Login" />
    </div>
  );
}