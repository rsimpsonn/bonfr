import React from 'react';
import { getAsyncInjectors } from 'utils/asyncInjectors';
import GroupPage from 'containers/GroupPage';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([import('containers/HomePage')]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/start',
      name: 'start',
      getComponent(nextState, cb) {
        const importModules = Promise.all([import('containers/CreateGroup')]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/interests',
      name: 'interests',
      getComponent(nextState, cb) {
        const importModules = Promise.all([import('components/Interests')]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'group',
      getComponent(loc, cb) {
        cb(null, (props) => <GroupPage {...props} id={location.pathname} />);
      },
    },
  ];
}
