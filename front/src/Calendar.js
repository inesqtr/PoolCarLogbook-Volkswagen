import React, { Component } from 'react';
import { ReactAgenda, Modal } from 'react-agenda';
import { BrowserRouter } from 'react-router-dom';

import Booking from './Booking/Booking';
import './Calendar.css';


const now = new Date();

require('moment/locale/en-gb.js');

var colors= {
  'color-1':"rgba(102, 195, 131 , 1)" ,
  "color-2":"rgba(242, 177, 52, 1)" ,
  "color-3":"rgba(235, 85, 59, 1)" ,
  "color-4":"rgba(70, 159, 213, 1)",
  "color-5":"rgba(170, 59, 123, 1)"
}

// For testing proposes
var items = [
  {
   _id            : 1,
    name          : 'Meeting , dev staff!',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes       : 'color-1 color-4'
  },
  {
   _id            : 2,
    name          : 'Working lunch , Holly',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 13, 0),
    classes       : 'color-2'
  },
  {
   _id            : 3,
    name          : 'Conference , plaza',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11 , 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 14 ,30),
    classes       : 'color-4'
  },
  {
   _id            : 4,
    name          : 'Customers issues review',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+2, 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+2, 15, 0),
    classes       : 'color-3'

  },
  {
    _id           :'event-5',
    name          : 'Group activity',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+3, 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+3, 16, 30),
    classes       : 'color-4'
  },
  {
    _id           :'event-6',
    name          : 'Fun Day !',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+7, 9, 14),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+7, 17),
    classes       : 'color-3'
  }
];

export default class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      selected:[],
      cellHeight: 20,
      showModal:false,
      locale:"en",
      rowsPerHour:2,
      numberOfDays:7,
      startDate: new Date()
    }
  }

  componentDidMount() {
    this.setState({items:items});
  }


  componentDidUpdate(next , last) {
    if(next.items){ 
      this.setState({items:next.items});
    }
  }
  handleItemEdit = (item, openModal) => {
    console.log('handleItemEdit', item)
    if(item && openModal === true){
      this.setState({selected:[item] })
      return this._openModal();
    }
  }

  handleCellSelection = (item, openModal) => {
    console.log('handleCellSelection',item)
    if(this.state.selected && this.state.selected[0] === item){
      return  this._openModal();
    }
      this.setState({selected:[item] })
  }

  handleRangeSelection = (selected) => {
    console.log('handleRangeSelection', selected);
    this.setState({selected:selected , showCtrl:true});
    this._openModal();
  }

  _openModal = () => {
    this.setState({showModal:true})
  }

  _closeModal = (e) => {
    console.log("closing!")
    if(e){
      e.stopPropagation();
      e.preventDefault();
    }
      this.setState({showModal:false})
  }

  handleItemChange = (items , item) => {
    this.setState({items:items})
  }
  
  render() {
    return (

      <section className="content-expanded "
        style={{padding:'0 10vw'}}
      >
        <ReactAgenda
          minDate={new Date(now.getFullYear(), now.getMonth()-3)}
          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          startDate={this.state.startDate}
          startAtTime={7}
          endAtTime={20}
          cellHeight={this.state.cellHeight}
          locale="en"
          items={this.state.items}
          numberOfDays={this.state.numberOfDays}
          headFormat={"ddd DD MMM"}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          helper={false}
          view="calendar"
          autoScale={true}
          fixedHeader={true}
          onRangeSelection={this.handleRangeSelection.bind(this)}
          onChangeEvent={this.handleItemChange.bind(this)}
          onItemEdit={this.handleItemEdit.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
        />
        {

        this.state.showModal ? 
            <Modal clickOutside={this._closeModal} >
              <BrowserRouter>
                <Booking isNew={this.props.isNew}/>
              </BrowserRouter>
            </Modal> 
            : ''
        }
       </section>

    );
  }
}