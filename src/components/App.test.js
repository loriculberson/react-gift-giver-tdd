import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import setupTests from './../setupTests.js';
import tempPolyfills from './../tempPolyfills';
//our test needs a local copy of the App. so we will shallowly render one.

const wrapper = shallow(<App />);

it('renders correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('initializes the `state` with an empty array of gifts', () => {
  expect(wrapper.state().gifts).toEqual([]);
})