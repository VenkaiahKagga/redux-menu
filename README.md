# Redux-Menu
[![npm version](https://badge.fury.io/js/redux-menu.svg)](https://badge.fury.io/js/redux-menu)

React menu component, connected with your Redux state and actions.

## Install

```
npm install --save redux-menu
```

## Example

[Try out](https://redux-menu-example.herokuapp.com/) the example app in `/example`.

## Todos

- [ ] Clean up styles and make them customizable
- [ ] Merge `MenuHeader` and `MenuItem`, remove duplicate code
- [ ] Include icon bar in example
- [ ] Write tests

## Dependencies

This package's usage depends on React and Redux. I assume you're familiar with these packages. Some good references: 

- *React*: [https://facebook.github.io/react/](https://facebook.github.io/react/)
- *Redux*: [http://redux.js.org/](http://redux.js.org/)

## Usage

### Basic usage

The idea of `redux-menu` is to have a menu bar that is connected to your Redux state and dispatch. You can add a menu bar by using the `MenuBar` component. For example,

```jsx
<Provider store={store}>
  <MenuBar>
  </MenuBar>
</Provider>
```
This in itself will not create a valuable menu. Notice how the `MenuBar` component have a [`Provider`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store) as (grand)parent.

### Adding menu items

You can add `MenuHeader` components as children of the `MenuBar` component to start creating your menu. For example,

```jsx
<Provider store={store}>
  <MenuBar>
    <MenuHeader name='File' />
    <MenuHeader name='Edit' />
    <MenuHeader name='View' />
  </MenuBar>
</Provider>
```
This will create a menu bar with three items: *File*, *Edit* and *View*. Nothing will happen when you click on them, because the items don't have children yet. Add children by using the `MenuItem` component. For example,

```jsx
<Provider store={store}>
  <MenuBar>
    <MenuHeader name='File'>
      <MenuItem name='Save' />
      <MenuItem name='Close' />
    </MenuHeader>
    <MenuHeader name='Edit'>
      <MenuItem name='Copy' />
      <MenuItem name='Paste' />
    </MenuHeader>
    <MenuHeader name='View'>
      <MenuItem name='Toolbar' />
    </MenuHeader>
  </MenuBar>
</Provider>
```

You can nest items inside the `MenuItem` component as well, to get deeper menus. For example,

```jsx
<Provider store={store}>
  <MenuBar>
    <MenuHeader name='File'>
      <MenuItem name='Save' />
      <MenuItem name='Close' />
    </MenuHeader>
    <MenuHeader name='Edit'>
      <MenuItem name='Copy' />
      <MenuItem name='Paste' />
      <MenuItem name='Other'>
        <MenuItem name='Undo' />
        <MenuItem name='Redo />
      </MenuItem>
    </MenuHeader>
    <MenuHeader name='View'>
      <MenuItem name='Toolbar' />
    </MenuHeader>
  </MenuBar>
</Provider>
```

You can keep nesting like this, but keep in mind this might not be good UX ;-).

### Other attributes

Except for `name`, these other attributes can be distinguished:

- *icon*: an icon class. E.g. if [FontAwesome](http://fontawesome.io/) is linked, you could use `"fa fa-eye"`.
- *disabled*: if `true`, the item will be disabled.
- *shortKey*: the short key combination that will be shown in the menu. E.g. `"Ctrl+Shift+S"`.
- *onClick*: function that is executed when the item is clicked.

For example, this could give us:

```jsx
<Provider store={store}>
  <MenuBar>
    <MenuHeader name='File' icon='fa fa-file'>
      <MenuItem name='Save' disabled={true} shortKey="Ctrl+Shift+S" onClick={() => console.log('Saving')} />
      <MenuItem name='Close' shortKey="Ctrl+Shift+Q" onClick={() => window.close()}/>
    </MenuHeader>
    ...
  </MenuBar>
</Provider>
```


### Connecting to Redux

Your menu bar can be totally in sync with the rest of your application. You can connect the menu items to your Redux state by passing a funciton of `state` to the attributes. For example,

```jsx
<Provider store={store}>
  <MenuBar>
    <MenuHeader name='File'>
      <MenuItem name={state => state.saving ? 'Saving' : 'Save'}
                disabled={state => state.saving} />
      <MenuItem name='Close' />
    </MenuHeader>
    ...
  </MenuBar>
</Provider>
```

This menu bar will show `Saving` in the `File` menu and will be disabled as long as the application's state has `saving` set to `true`. Otherwise it will just say `Save`. In the same way you can pass `dispatch` to `onClick`, the second parameter will be the event. For example,

```jsx
<Provider store={store}>
  <MenuBar>
    <MenuHeader name='File'>
      <MenuItem name={state => state.saving ? 'Saving' : 'Save'}
                disabled={state => state.saving} 
                onClick = { (dispatch, e) => { console.log(`clicked ${e.target}`); dispatch({type: 'SAVE'}); } } />
      <MenuItem name='Close' />
    </MenuHeader>
    ...
  </MenuBar>
</Provider>
```
