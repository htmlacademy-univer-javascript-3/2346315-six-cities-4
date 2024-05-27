import { useAppSelector } from '../../hooks';
import './error-message.css';

const ErrorMessage: React.FC = () => {
  const error = useAppSelector((state) => state.error);

  if (!error) {
    return null;
  }

  return <div className='error-message'>{error}</div>;
};

export default ErrorMessage;