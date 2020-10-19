import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import * as Test from '@testing-library/react';

import * as actions from '../actions/simpleAction'
import * as data from './test.data.json'

import App from '../App';
import Home from '../pages/home';
import Detail from '../pages/detail';

/**
 * 
 * TEST ACTION DATA INPUT
 * 
 */
describe('actions', () => {
  it('should render data in provider', () => {
    expect(actions.simpleAction(data.data.simpleReducer.result))
  })
});

/**
 * 
 * TEST COMPONENT RENDERING
 * 
 */

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

test('full app rendering/navigating', () => {

  render (
    <>
    {
      data.data.simpleReducer.result ? (
        <Router>
          <Switch>
            <Route exact key="1" path="/">
              <Home key="k_home" data={data.data} /> 
            </Route>
            <Route key="2" path="/fact-detail/:slug">
              <Detail key="k_detail" data={data.data}  />
            </Route>
          </Switch>
        </Router>
      ) : <Loading key="3" />
    }
    </>
  );

  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(screen.getByText(/Cat Facts Made Easy/i)).toBeInTheDocument()

  const leftClick = { button: 0 }
  const el = screen.queryAllByText(/view/i);
  userEvent.click(el[0], leftClick)

  // check that the content changed to the new page
  expect(screen.getByText(/More from/i)).toBeInTheDocument()

})