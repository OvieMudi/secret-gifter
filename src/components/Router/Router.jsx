import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Layout from '../Layout/Layout';
import { AuthContextProvider } from '../../context/authContext';
import Groups from '../Groups/Groups';
import PrivateRoute from './PrivateRoute';
import Discover from '../Discover/Discover';
import { GroupsProvider } from '../../context/groupsContext';
import GroupPage from '../GroupInfo/GrouInfo';
import routes from '../../utils/routes';

const WithGroupsProvider = (Component) => () => (
  <GroupsProvider>
    <Component />
  </GroupsProvider>
);
const Router = () => {
  return (
    <AuthContextProvider>
      <Layout>
        <Switch>
          <PrivateRoute
            path={routes.groupInfo}
            component={WithGroupsProvider(GroupPage)}
          />
          <PrivateRoute
            path={routes.groups}
            component={WithGroupsProvider(Groups)}
          />
          <Route exact path={routes.discover} component={Discover} />
          <Route path={routes.index} component={Home} />
        </Switch>
      </Layout>
    </AuthContextProvider>
  );
};

export default Router;
