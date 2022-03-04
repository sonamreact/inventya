import * as React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { AuthConsumer } from 'shared/contexts/AuthContext';
import { DASHBOARD, COMPANY_LIST } from '../constants/RouteConstants';

export default function ProtectedRoute({ component: Component, ...rest }: any) {
    if (rest.path) {
        console.log(rest.path);
    }
    return (
        <Route
            {...rest}
            render={(props) => (
                <AuthConsumer>
                    {({ isAuth, user }) =>
                        isAuth ? (
                          /*
                            user.role.name === 'ADMIN' ? (rest.path.startsWith('/admin') ?
                                <Component {...props} /> : <Redirect
                                    to={{
                                        pathname: FRANCHISES_LIST,
                                        state: { from: rest.location },
                                    }}
                                />) : (!rest.path.startsWith('/admin') ?
                                <Component {...props} /> : <Redirect
                                    to={{
                                        pathname: '/',
                                        state: { from: rest.location },
                                    }}
                                />)
                        )*/
                           rest.path.startsWith('/admin') ? <Component {...props} /> : <Redirect
                                  to={{
                                      pathname: COMPANY_LIST,
                                      state: { from: rest.location },
                                  }}
                              />)
                         : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: rest.location },
                                }}
                            />
                        )
                    }
                </AuthConsumer>
            )}
        />
    );
}
