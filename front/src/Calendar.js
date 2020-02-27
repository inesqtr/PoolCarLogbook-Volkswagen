import React, { Component } from 'react';
import { ReactAgenda, Modal } from 'react-agenda';
import { BrowserRouter } from 'react-router-dom';
import Booking from './Booking/Booking';
import EditTrip from './EditTrip/EditTrip'
import './Calendar.css';

const now = new Date();

require('moment/locale/en-gb.js');

var colors= {
  'color-VWpetrollight':"rgb(198,223,231)",
  "color-VWred":"rgb(162,30,77)"
}

export default class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      selected:[],
      elementToEdit: null,
      cellHeight: 20,
      showModal:false,
      locale:"en",
      rowsPerHour:2,
      numberOfDays: 7,
      startDate: new Date(),
      selectedDateTime: []
    }
  }

  componentDidMount() {      
    this.setState({items:this.props.tripsForCalendar});
  }

  componentDidUpdate(next) {
    if(next.items){ 
      this.setState({items:next.items});
    }
  }

  // on clicking exiting trips
  handleItemEdit = (item, openModal) => {
    if(item && openModal === true){
      this.setState({elementToEdit:[item] })
      return this._openModal();
    }
  }

  // on click the calendar
  handleCellSelection = (item, openModal) => {
    // open modal and set state when double clicking
    if(this.state.selected && this.state.selected[0] === item){
      this.setState({selectedDateTime:[item.split('T')] })
      return  this._openModal();
    }
    this.setState({selected:[item] })
  }

  _openModal = () => {
    this.setState({showModal:true})
  }

  _closeModal = (e) => {
    if(e){
      e.stopPropagation();
      e.preventDefault();
    }
      this.setState({showModal:false, elementToEdit: null})
  }

  handleItemChange = (items , item) => {
    this.setState({items:items})
  }
  
  render() {
    return (
      <section className="content-expanded "
        //style={{padding:'0 10vw'}}
      >
        <ReactAgenda
          minDate={new Date(now.getFullYear(), now.getMonth()-3)}
          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          startDate={this.state.startDate}
          startAtTime={0}
          endAtTime={24}
          cellHeight={this.state.cellHeight}
          locale="en"
          items={this.props.tripsForCalendar}
          numberOfDays={this.state.numberOfDays}
          headFormat={"ddd DD MMM"}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          helper={false}
          view="calendar"
          autoScale={true}
          fixedHeader={true}
          onChangeEvent={this.handleItemChange}
          onItemEdit={this.handleItemEdit}
          onCellSelect={this.handleCellSelection}
        />
        {
        this.state.showModal ? 
          <Modal clickOutside={this._closeModal} >
            <BrowserRouter>
              {
                this.state.elementToEdit ? (
                  this.props.trips.map((trip)=>(
                    trip.id === this.state.elementToEdit[0]._id &&
                      <EditTrip               
                        isNew={this.props.isNew}
                        selectedTrip={trip}
                        editTrip={this.props.editTrip}
                        key={trip.id}
                        trips={this.props.trips}
                        postTrip={this.props.postTrip} 
                        deleteTrip={this.props.deleteTrip}
                        closeModal={this._closeModal}
                      />
                    )
                  )
                )
                : <Booking 
                    isNew={this.props.isNew} 
                    postTrip={this.props.postTrip} 
                    selectedDateTime={this.state.selectedDateTime}
                    trips={this.props.trips}
                    closeModal={this._closeModal}
                  />
              }
            </BrowserRouter>
          </Modal> 
          : ''
        }
       </section>
    );
  }
}