import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { getIngredients } from '../../services/ingredients/actions';
import {
  ingredients,
  isIngredientsLoading
} from '../../services/ingredients/slice';
import { order } from '../../services/order/slice';
import { useDispatch } from '../../services/store';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { checkUserAuth } from '../../services/user/actions';

const App = () => {
  const isIngredientsListLoading = useSelector(isIngredientsLoading);
  const error = null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, []);

  const navigate = useNavigate();

  const location = useLocation();

  const background = location.state?.background;

  const currentOrder = useSelector(order)?.number;

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route
          path='/'
          element={
            isIngredientsListLoading ? (
              <Preloader />
            ) : error ? (
              <div
                className={`${styles.error} text text_type_main-medium pt-4`}
              >
                {error}
              </div>
            ) : ingredients.length > 0 ? (
              <ConstructorPage />
            ) : (
              <div
                className={`${styles.title} text text_type_main-medium pt-4`}
              >
                Нет игредиентов
              </div>
            )
          }
        />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth children={<Login />} />}
        />

        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth children={<Register />} />}
        />

        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth children={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth children={<ResetPassword />} />}
        />

        <Route
          path='/profile'
          index
          element={<ProtectedRoute children={<Profile />} />}
        />

        <Route
          path='/profile/orders'
          element={<ProtectedRoute children={<ProfileOrders />} />}
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title={`#${currentOrder}`} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                children={
                  <Modal
                    title={`#${currentOrder}`}
                    onClose={() => navigate(-1)}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
