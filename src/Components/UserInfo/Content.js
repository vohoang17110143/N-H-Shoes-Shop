import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config

import userRoute from './../../userRoute';
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
const Content = () => {
  return (
    <main className="c-main pt-0">
        <Suspense fallback={loading}>
          <Switch>
            {userRoute.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) =>
                    localStorage.getItem("usertoken") !== null ? (
                      <CFade>
                      <route.component {...props} />
                    </CFade>
                    ) : (
                      <Redirect to="/" />
                    )
                  }
                />
              ) : null;
            })}
               <Redirect from="/" to="/" />
          </Switch>
        </Suspense>

    </main>
  )
}

export default React.memo(Content)