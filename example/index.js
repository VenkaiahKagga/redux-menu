import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {MenuBar, MenuHeader, MenuItem} from 'redux-menu';

const store = createStore(i => i, {});

render(
  <Provider store={store}>
    <div>
      <h3>Menu bar</h3>
      <MenuBar>
        <MenuHeader name='File'>
          <MenuItem name='Save' />
          <MenuItem name='Exit' />
        </MenuHeader>
        <MenuHeader name='View'>
          <MenuItem name='Preview' />
          <MenuItem name='Edit' />
        </MenuHeader>
      </MenuBar>
      <input type='textarea' />
    </div>
  </Provider>,
  document.getElementById('app')
)
