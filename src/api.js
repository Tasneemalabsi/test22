import React, { Component } from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ModalCompo from './components/modal'

export class api extends Component {
    constructor (props){
     super (props);
     this.state = {
         movieData:[],
         email:'',
         addedData:[],
         selectedResult:{},
         show:false
     }
    }

    componentDidMount= async () =>{
        

     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIES_KEY}&query=california`
     let movieData= await axios.get(url);
     console.log(movieData.data);
     this.setState({
         movieData:movieData.data.results
     })
    }

    selectedMovie = async(idx) =>{
        let selectedResult= await this.state.movieData.find((item,index)=>
        index === idx
    )
    console.log(selectedResult);
    this.setState ({
        selectedResult:selectedResult,
        show:true
    })
    console.log(this.state.selectedResult);


    }

    
    addMovies = async () => {

        const user = this.props.auth0;
        //  let arr =[];
       
         let movieInfo = {
            
            title : this.state.selectedResult.title,
            overview:this.state.selectedResult.overview,
            email: user.user.email
        }
        console.log(movieInfo);
        // console.log(this.state.email);
        let addedData = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/addmovies`,movieInfo)
      this.setState({
          addedData:addedData.data
      })
    }

    handleShow = () => {
        this.setState ({
          show:!this.state.show
        })
      } 

    render() {
        return (
            <div>
                {this.state.movieData.map((item,index)=>{
                    return (
                        <div>
                            
                        <p>{item.title}</p>
                            <p>{item.overview}</p>
                            <Button onClick={()=>{this.selectedMovie(index)}}>Add</Button>
                            <ModalCompo selectadded={this.state.selectedResult} addMovies={this.addMovies} handleShow={this.handleShow} show={this.state.show}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default withAuth0(api);
