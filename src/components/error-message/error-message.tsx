import { useAppSelector } from '../../hooks';
import { getError } from '../../store/app-settings-slice/app-settings-selectors';
import './error-message.css';

const ErrorMessage: React.FC = () => {
  const error = useAppSelector(getError);

  if (!error) {
    return null;
  }

  return <div className='error-message'>{error}</div>;
};

export default ErrorMessage;
