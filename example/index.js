import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {MenuBar, MenuHeader, MenuItem, HorSep, IconBar, IconItem} from 'redux-menu';

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DISABLE_EDIT':
      return {...state, disableEdit: !state.disableEdit};

    default:
      return state;
  }
}

const store = createStore(stateReducer, {
  disableEdit: false
});

render(
  <Provider store={store}>
    <div>
      <h3>Menu 1</h3>
      <MenuBar>
        <MenuHeader name='File'>
          <MenuItem name='Save' icon='fa fa-save' />
          <MenuItem name={state => state.disableEdit ? 'Enable Edit' : 'Disable Edit'}
                    onClick={dispatch => dispatch({type: 'TOGGLE_DISABLE_EDIT'})}/>
          <MenuItem name='Exit' />
        </MenuHeader>
        <MenuHeader name='View'>
          <MenuItem name='Preview' icon='fa fa-eye' />
          <MenuItem name='Edit' icon='fa fa-edit'
                    disabled={state => state.disableEdit} />
          <HorSep />
          <MenuItem name="Others">
            <MenuItem name="Item one">
              <MenuItem name="Nesting one">
                <MenuItem name="Nesting two" />
                <MenuItem name="Deeper" />
              </MenuItem>
            </MenuItem>
            <MenuItem name="Item two" />
          </MenuItem>
        </MenuHeader>
      </MenuBar>
      <h3>Menu 2</h3>
      <MenuBar>
        <MenuHeader name='Only item'>
          <MenuItem name='Only one item' />
        </MenuHeader>
      </MenuBar>
      <h3>Menu 3</h3>
      <IconBar>
        <IconItem name='Preview' icon='fa fa-eye' />
        <IconItem name='Save' icon='fa fa-save' />
        <IconItem name='Edit' icon='fa fa-edit' disabled={state => state.disableEdit} />

      </IconBar>
    </div>
  </Provider>,
  document.getElementById('app')
)
