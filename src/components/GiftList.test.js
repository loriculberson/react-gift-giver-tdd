import React from 'react';
import { shallow } from 'enzyme';
import GiftList from './GiftList';
// import setupTests from '../setupTests.js';
// import tempPolyfills from '../tempPolyfills';
//our test needs a local copy of the App. so we will shallowly render one.

// it('renders correctly', () => {
  //   expect(wrapper).toMatchSnapshot();
  //});
  describe('GiftList landing page', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<GiftList />)
    })

    describe('when user input is valid', () => {

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
      
      xit('adds a new gift to `state` when clicking the `add gift` button', () => {
        //Avoid mixing enzyme interactions (simulate, click) with 
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
        
        const updatedGifts = [{ id: 1, person: 'Becca', giftName: 'Google Pixel 3'}];
        
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
      
      it('adds newly created gift record to page', () => {
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
        
        const giftResults = wrapper.find('[data-gift-list]');
        //gift text should render on page
        expect(giftResults.text()).toContain("Becca | Google Pixel 3");
        expect(giftResults.children()).toHaveLength(1);
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

        const giftResults = wrapper.find('[data-gift-list]');

        expect(giftResults.children()).toHaveLength(2)
        expect(giftResults.text()).toContain("Becca | Google Pixel 3");
        expect(giftResults.text()).toContain("Louis | Garmin watch");
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
        
        expect(becca.text()).toContain("Becca | Google Pixel 3");
        expect(louis.text()).toContain("Louis | Garmin watch");
      })

      it('displays default colored button', () => {
        const nameInput = wrapper.find('[data-person]');
        const giftInput = wrapper.find('[data-gift]');
        
        const nameEvent = {
          target: {
            value: "Cristiano"
          }
        }
        
        const giftEvent = {
          target: {
            value: "soccer ball"
          }
        }
        nameInput.simulate('change', nameEvent);
        giftInput.simulate('change', giftEvent);
        
        /* Note: this test fails if the submit button is declared with the nameInput and giftInputs. 
        The button needs to be "found" AFTER the input fields have content because its prop disabled value changes
        */
        const submitButton = wrapper.find('[data-submit]');
        expect(submitButton.props().disabled).toBe(false);
      })

    describe('delete mode', () => {
      it('displays a delete button for each list item', () => {
        const nameInput = wrapper.find('[data-person]');
        const giftInput = wrapper.find('[data-gift]');

        const nameEvent = {
          target: {
            value: "Cristiano"
          }
        }
        
        const giftEvent = {
          target: {
            value: "soccer ball"
          }
        }

        nameInput.simulate('change', nameEvent);
        giftInput.simulate('change', giftEvent);
        
        const submitButton = wrapper.find('[data-submit]');

        submitButton.simulate('click');
        
        const nameEvent2 = {
          target: {
            value: "Kylie"
          }
        }
        
        const giftEvent2 = {
          target: {
            value: "basketball"
          }
        }
        
        nameInput.simulate('change', nameEvent2);
        giftInput.simulate('change', giftEvent2);
        
        submitButton.simulate('click');

        const giftResults = wrapper.find('[data-gift-list]');

        expect(giftResults.children()).toHaveLength(2);
        
        const deleteButton = wrapper.find(`[data-delete-item=${1}]`);
        const deleteButton2 = wrapper.find(`[data-delete-item=${2}]`);

        expect(deleteButton.exists()).toBe(true);
        expect(deleteButton2.exists()).toBe(true);

      });

      it('deletes gift from list when delete button is clicked', () => {
        const nameInput = wrapper.find('[data-person]');
        const giftInput = wrapper.find('[data-gift]');

        const nameEvent = {
          target: {
            value: "Cristiano"
          }
        }
        
        const giftEvent = {
          target: {
            value: "soccer ball"
          }
        }
        nameInput.simulate('change', nameEvent);
        giftInput.simulate('change', giftEvent);

        const submitButton = wrapper.find('[data-submit]');
        submitButton.simulate('click');

        let giftResults = wrapper.find('[data-gift-list]');
        
        expect(giftResults.children()).toHaveLength(1);
        
        const deleteButton = wrapper.find(`[data-delete-item=${1}]`);

        deleteButton.simulate('click');
        giftResults = wrapper.find('[data-gift-list]');
        
        expect(giftResults.children()).toHaveLength(0);
        expect(giftResults.children().exists()).toBe(false)
      })
    }) 

    describe('editing mode', () => {
      it('populates input fields with person and giftname when list item is clicked', ()=> {
        let nameInput = wrapper.find('[data-person]');
        let giftInput = wrapper.find('[data-gift]');
        const submitButton = wrapper.find('[data-submit]');

        let nameEvent = {
          target: {
            value: "Cristiano"
          }
        }
        
        let giftEvent = {
          target: {
            value: "soccer ball"
          }
        }

        nameInput.simulate('change', nameEvent);
        giftInput.simulate('change', giftEvent);
        
        submitButton.simulate('click');
        
        const listElement = wrapper.find(`[data-list-item=${1}]`);

        listElement.simulate('click');
        
        nameInput = wrapper.find('[data-person]');
        giftInput = wrapper.find('[data-gift]');

        expect(nameInput.props().value).toBe("Cristiano");
        expect(giftInput.props().value).toBe("soccer ball");
      })

      it('changes the button text to `Update` and is enabled', () => {
        let nameInput = wrapper.find('[data-person]');
        let giftInput = wrapper.find('[data-gift]');
        let submitButton = wrapper.find('[data-submit]');

        let nameEvent = {
          target: {
            value: "Cristiano"
          }
        }
        
        let giftEvent = {
          target: {
            value: "soccer ball"
          }
        }

        nameInput.simulate('change', nameEvent);
        giftInput.simulate('change', giftEvent);
        
        submitButton.simulate('click');
        
        const listElement = wrapper.find(`[data-list-item=${1}]`);

        listElement.simulate('click');
        submitButton = wrapper.find('[data-submit]');

        expect(submitButton.props().disabled).toBe(false);
        expect(submitButton.text()).toBe('Update');
        expect(submitButton.props().className).toBe(`edit-mode`)
      })

      it('displays the updated item in original list position', ()=> {
        const nameInput = wrapper.find('[data-person]');
        const giftInput = wrapper.find('[data-gift]');
        const submitButton = wrapper.find('[data-submit]');

        const nameEvent = {
          target: {
            value: "Cristiano"
          }
        }
        
        const giftEvent = {
          target: {
            value: "soccer ball"
          }
        }

        nameInput.simulate('change', nameEvent);
        giftInput.simulate('change', giftEvent);
        
        submitButton.simulate('click');
        
        const listElement = wrapper.find(`[data-list-item=${1}]`);

        listElement.simulate('click');

        const nameEventUpdate = {
          target: {
            value: "Michelle"
          }
        }
        
        const giftEventUpdate = {
          target: {
            value: "Bose headphones"
          }
        }
        // nameInput = wrapper.find('[data-person]');
        // giftInput = wrapper.find('[data-gift]');
        nameInput.simulate('change', nameEventUpdate);
        giftInput.simulate('change', giftEventUpdate);
        // submitButton = wrapper.find('[data-submit]')

        submitButton.simulate('click');

        const giftResults = wrapper.find('[data-gift-list]');

        const michelle = giftResults.childAt(0);
        
        expect(michelle.text()).toContain("Michelle | Bose headphones");
      })
    })
    })

    describe('when user input is invalid', () => {
      describe('button is disabled', () => {

        it('on page load', () => {
          const submitButton = wrapper.find('[data-submit]');
      
          submitButton.simulate('click')
          
          expect(submitButton.props().disabled).toBe(true);
        });
        
        it('when both input fields are empty', () => {
          const nameInput = wrapper.find('[data-person]');
          const giftInput = wrapper.find('[data-gift]');
          
          const nameEvent = {
            target: {
              value: ""
            }
          }
          
          const giftEvent = {
            target: {
              value: ""
            }
          }
          nameInput.simulate('change', nameEvent);
          giftInput.simulate('change', giftEvent);

          const submitButton = wrapper.find('[data-submit]');
          submitButton.simulate('click')
          
          expect(submitButton.props().disabled).toBe(true);
        })

        it('when name input field is empty', () => {
          const nameInput = wrapper.find('[data-person]');
          const giftInput = wrapper.find('[data-gift]');
          
          const nameEvent = {
            target: {
              value: ""
            }
          }
          
          const giftEvent = {
            target: {
              value: "Texans hat"
            }
          }
          nameInput.simulate('change', nameEvent);
          giftInput.simulate('change', giftEvent);

          const submitButton = wrapper.find('[data-submit]');
          submitButton.simulate('click')
          
          expect(submitButton.props().disabled).toBe(true);
        })

        it('when gift input field is empty', () => {
          const nameInput = wrapper.find('[data-person]');
          const giftInput = wrapper.find('[data-gift]');
          
          const nameEvent = {
            target: {
              value: "Rochelle"
            }
          }
          
          const giftEvent = {
            target: {
              value: ""
            }
          }
          nameInput.simulate('change', nameEvent);
          giftInput.simulate('change', giftEvent);

          const submitButton = wrapper.find('[data-submit]');
          submitButton.simulate('click')
          
          expect(submitButton.props().disabled).toBe(true);
        })
      })
    })
})
  
  
  