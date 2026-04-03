import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import store, { useDispatch, useSelector } from '../../services/store';
import { checkUserAuth, registerUser } from '../../services/user/actions';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({ email: email, name: userName, password: password })
    );
    // dispatch(checkUserAuth());
    // const user = useSelector((state) => state.user);
    // if (user) {
    //   navigate(location);
    // }
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
