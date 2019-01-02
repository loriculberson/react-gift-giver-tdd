import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import setupTests from './../setupTests.js';
import tempPolyfills from './../tempPolyfills';
//our test needs a local copy of the App. so we will shallowly render one.

const wrapper = shallow(<App />);

// it('renders correctly', () => {
//   expect(wrapper).toMatchSnapshot();
// });

it('initializes the `state` with an empty array of gifts', () => {
  expect(wrapper.state().gifts).toEqual([]);
});

it('displays input fields for person and gift', () => {
  const nameInput = wrapper.find('[data-person]');
  const giftInput = wrapper.find('[data-gift]');

  expect(nameInput.exists()).toEqual(true)
  expect(giftInput.exists()).toEqual(true)
});

it('displays the submit button', () => {
  const submitButton = wrapper.find('[data-submit]');
  
  expect(submitButton.exists()).toEqual(true)
})

it('adds a new gift to `state` when clicking the `add gift` button', () => {
  //user adds name and gift into fields
  //user clicks submit button
  //person and gift populate a list
  const nameInput = wrapper.find('[data-person]');
  const giftInput = wrapper.find('[data-gift]');
  const submitButton = wrapper.find('[data-submit]');

  const nameEvent = {
    target: {
      value: "Becca"
    }
  }

  const giftEvent = {
    target: {
      value: "Google Pixel 3"
    }
  }

  nameInput.simulate('change', nameEvent);
  giftInput.simulate('change', giftEvent);
  submitButton.simulate('click')

  const updatedGifts = [{ person: 'Becca', gift: 'Google Pixel 3'}];

  expect(wrapper.state().gifts).toEqual(updatedGifts);
});
