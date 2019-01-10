import React, { Component } from 'react';
import './GiftList.css';

class GiftList extends Component {
  state = {
    gifts: [],
    newGift: { id: '', person: '', giftName: ''},
    giftBeingEdited: {},
    errorFlag: true,
    isEditing: false
  }

  doInputFieldsHaveContent = () => {
    // console.log('state:', this.state.newGift);
    const { person, giftName } = this.state.newGift;
    const hasPerson = person && person.length > 0;
    const hasGiftName = giftName && giftName.length > 0;
    this.setState({
      errorFlag: !hasPerson || !hasGiftName
    });
  }

  captureName = (event) =>{
    this.setState ({
      newGift: {
        ...this.state.newGift, 
        person: event.target.value
      }
    }, this.doInputFieldsHaveContent)
  }

  captureGift = (event) =>{
    this.setState ({
      newGift: {
        ...this.state.newGift, 
        giftName: event.target.value
      }
    }, this.doInputFieldsHaveContent)
  }

  nextId = () => {
    return this.state.gifts.reduce(( acc, cur ) => {
      return Math.max( acc, cur.id )
    }, 0) + 1
  }

  handleSubmitGift = (event) => {
   let errorFlag = true
   let newGift;
   let gifts;
   
   if (this.state.isEditing) {
     newGift = Object.assign({}, this.state.giftBeingEdited, this.state.newGift)
     let giftIndex = this.state.gifts.findIndex( gift => gift.id === newGift.id)
     gifts = [...this.state.gifts.slice(0, giftIndex), newGift, ...this.state.gifts.slice(giftIndex + 1)]
    //find gift and update it.
    // DO NOT ADD TO GIFTS array! 
   } else {
    // create new gift and add it to the gifts array
    newGift = Object.assign({}, this.state.newGift, {id: this.nextId()})
    gifts = [...this.state.gifts, newGift]
   }
 
    newGift = {
      id: "",
      person: "",
      giftName: ""
    } 
    let isEditing = false;

    this.setState({ gifts, newGift, errorFlag, isEditing })
  }

  updateGiftInputFields = (id) => {
    const isEditing = true;
    const errorFlag = false;
    const gift = this.state.gifts.find( gift => gift.id === id );
    const newGift = Object.assign({}, {id: gift.id, person: gift.person, giftName: gift.giftName})

    this.setState({ newGift, errorFlag, isEditing, giftBeingEdited: gift })
  }

  removeGift = (id) => {
    const gifts = this.state.gifts.filter( gift => gift.id !== id );

    this.setState({ gifts });
  }
  
  render() {
    const allGifts = this.state.gifts.map( gift => {
      return (
          <div key={gift.id} 
              >
            <li>
              <div 
                id={"list-item-" + gift.id}
                className="gift-data"
                onClick={() => this.updateGiftInputFields(gift.id)}>
                {gift.person} | {gift.giftName} 
              </div>
              <button 
                className="delete" 
                id={"delete-item-" + gift.id}
                onClick={() => this.removeGift(gift.id)}>
                Delete
              </button>
            </li>
          </div>
      )
    })
    
    const submitButtonText = this.state.isEditing ? 'Update' : 'Add Gift';
    const submitButtonClass = this.state.isEditing ? 'edit-mode' : null;

    return (
      <div>
        <h2>Gift Giver</h2>
        <input type='text' 
          data-person
          placeholder="name of gift recipient" 
          value={this.state.newGift.person}
          onChange={this.captureName}
        />
        <input type='text' 
          data-gift
          placeholder="what's the gift?" 
          value={this.state.newGift.giftName}
          onChange={this.captureGift}
        />
        <button 
          data-submit 
          onClick={this.handleSubmitGift}
          disabled={this.state.errorFlag}
          className={submitButtonClass}>
          {submitButtonText}
        </button>

        <section>
          <ul data-gift-list>
            {allGifts}
          </ul>
        </section>
      </div>
    );
  }
}

export default GiftList;