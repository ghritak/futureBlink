import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const useToast = () => {
  const { setToast } = useContext(UserContext);

  const showToast = (type, text) => {
    setToast({ visibility: true, text, type });
    console.log(type, text);
    setTimeout(() => {
      setToast({ visibility: false });
      console.log('hidden');
    }, 6000);
  };

  return showToast;
};

export default useToast;
