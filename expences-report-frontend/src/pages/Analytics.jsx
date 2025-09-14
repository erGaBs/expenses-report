import NavigationButton from '../components/NavigationButton';

export default function Analytics() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5 text-center gap-2'>
      <h1>Analytics</h1>
      <NavigationButton to="/" label="Vai alla dashboard" />
    </div>
  );
}