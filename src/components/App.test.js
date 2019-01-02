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

  // const buttonEvent = {
  //   preventDefault: () => {}
  // }

  nameInput.simulate('change', nameEvent);
  giftInput.simulate('change', giftEvent);
  submitButton.simulate('click')
  
  const updatedGifts = [{ person: 'Becca', gift: 'Google Pixel 3'}];

  expect(wrapper.state().gifts).toEqual(updatedGifts);
});
// it("displays additional information about the teams", () => {
//   let teamSearchField = component.find('[data-team-search-input]')
//   let submitButton = component.find('[data-team-search-button]')
  
//   const inputEvent = {
//     target: {
//       value: "Birmingham Bolts"
//     }
//   }
//   const buttonEvent = {
//     preventDefault: () => {}
//   }
//   // Given I am a user
//   // When I type a team name into the search box
//   teamSearchField.simulate("change", inputEvent)
//   submitButton.simulate('click', buttonEvent)
  
//   let teamSearchResultsText = component.find('[data-team-results]').text()
//   // And I submit the search box
//   // Then I should see more information about the team presented on the page
//   expect(teamSearchResultsText).toEqual("Birmingham Bolts - Birmingham, Alabama - Colors: Purple, Yellow, Silver")
// })