import axios from 'axios'
import React, { Component } from 'react'

export class PictureSearch extends Component {
    state ={
        query:'',
        results:[]
    }
    handleInputChange = (event) => {
        const {value} = event.target
        this.setState({query:value})
    }
    onSearchSubmit = async (event) => {
        event.preventDefault();
        const {query} = this.state;

        const response = await axios.get('https://api.unsplash.com/search/photos',{
            params : {query},
            headers :{
                Authorization: 'Client-ID WiYxM2swuoMTaY3Nk46ZIbtwo2t8KaLGk_eJXN7veKk'
            }
        })
        const newResults = response.data.results.map(
            item =>{
                return {
                    id: item.id,
                    altDescription : item.alt_description,
                    smallUrl : item.urls.small
                }
            }
        )
        this.setState({results:newResults})

    }
    render() {
        return (
    <>
      <div>
  <div className="ui segment container" style={{marginTop: 50}}>
    <form className="ui form" onSubmit={this.onSearchSubmit}>
      <div className="field">
        <div className="ui icon input">
          <input type="text" placeholder="search picture ...." 
          onChange={this.handleInputChange}
          />
          <i className="search icon" />
        </div>
      </div>
    </form>
  </div>
  <div className="ui diver">
    <div className="ui four column grid container">
      {
          this.state.results.length > 0 &&
        this.state.results.map(item=> (
            <div className="column" key={item.id}>
            <div className="ui card">
              <div className="image">
                <img src={item.smallUrl} alt={item.alt_description}/>
              </div>
            </div>
          </div>
          ))
         
      }
    </div>
  </div>
</div>
</>
        )
    }
}

export default PictureSearch
