import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import setupTests from './../setupTests.js';
import tempPolyfills from './../tempPolyfills';
//our test needs a local copy of the App. so we will shallowly render one.


// it('renders correctly', () => {
  //   expect(wrapper).toMatchSnapshot();
  // });
  describe('App landing page', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<App />)
    })

  describe('valid user input', () => {

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
      
      const updatedGifts = [{ person: 'Becca', giftName: 'Google Pixel 3'}];
      
      expect(wrapper.state().gifts).toEqual(updatedGifts);
    });
    
    it('input fields are empty after clicking the `add gift` button', () => {
      //user adds name and gift into fields
      //user clicks submit button
      //input fields are empty
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
      
      // expect(nameInput.value).toEqual(''); yields undefined. value is a prop on input field
      expect(nameInput.props().value).toEqual('');
      expect(giftInput.props().value).toEqual('');
    });
    
    it('adds newly created gift records to page', () => {
      //user adds gift
      //clicks button
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
      
      const giftResultsText = wrapper.find('[data-gift-list]').text();
      //gift text should render on page
      expect(giftResultsText).toContain("Becca | Google Pixel 3");
      // expect(giftResultsText).toBe("Becca | Google Pixel 3");
      // expect(giftResultsText).toEqual("Becca | Google Pixel 3");
    })

    it('adds multiple new gifts page', () => {
      //user adds gift
      //clicks button
      const nameInput = wrapper.find('[data-person]');
      const giftInput = wrapper.find('[data-gift]');
      const submitButton = wrapper.find('[data-submit]');
      
      const nameEvent1 = {
        target: {
          value: "Becca"
        }
      }
      
      const giftEvent1 = {
        target: {
          value: "Google Pixel 3"
        }
      }

      
      nameInput.simulate('change', nameEvent1);
      giftInput.simulate('change', giftEvent1);
      submitButton.simulate('click')
      
      const nameEvent2 = {
        target: {
          value: "Louis"
        }
      }
      
      const giftEvent2 = {
        target: {
          value: "Garmin watch"
        }
      }

      nameInput.simulate('change', nameEvent2);
      giftInput.simulate('change', giftEvent2);
      submitButton.simulate('click')

      const giftResultsText = wrapper.find('[data-gift-list]').text();

      expect(giftResultsText).toContain("Becca | Google Pixel 3");
      expect(giftResultsText).toContain("Louis | Garmin watch");
    })
  })

  it('lists gifts in order as they are added to the list', () => {
    const nameInput = wrapper.find('[data-person]');
    const giftInput = wrapper.find('[data-gift]');
    const submitButton = wrapper.find('[data-submit]');
    
    const nameEvent1 = {
      target: {
        value: "Becca"
      }
    }
    
    const giftEvent1 = {
      target: {
        value: "Google Pixel 3"
      }
    }

    
    nameInput.simulate('change', nameEvent1);
    giftInput.simulate('change', giftEvent1);
    submitButton.simulate('click')
    
    const nameEvent2 = {
      target: {
        value: "Louis"
      }
    }
    
    const giftEvent2 = {
      target: {
        value: "Garmin watch"
      }
    }

    nameInput.simulate('change', nameEvent2);
    giftInput.simulate('change', giftEvent2);
    submitButton.simulate('click')

    const giftResults = wrapper.find('[data-gift-list]');
    const becca = giftResults.childAt(0);
    const louis = giftResults.childAt(1);

    // expect(wrapper.find('ul').childAt(0).type()).to.equal('li');
    expect(becca.text()).toEqual("Becca | Google Pixel 3");
    expect(louis.text()).toEqual("Louis | Garmin watch");
  })
})


