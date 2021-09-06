import axios from 'axios';
import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import UpdateForm from './components/form'

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMovies: [],
      email:'',
      selectedMovie:{},
      show:false
    }
  }

  componentDidMount = async () => {
    const user = this.props.auth0;
    let userMovies = await axios.get (`${process.env.REACT_APP_SERVER_LINK}/getmovies?email=${user.user.email}`)
    console.log(userMovies.data);
     this.setState({
       userMovies:userMovies.data
     })
  }

  deleteMovies = async (movieID) => {
      const user = this.props.auth0;
      let deletedMovies = await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/deletemovies/${movieID}?email=${user.user.email}`);
      let userMovies = await axios.get (`${process.env.REACT_APP_SERVER_LINK}/getmovies?email=${user.user.email}`)
      this.setState ({
        userMovies:userMovies.data
      })
  }

  updateMovies = async (movieID)=>{
    let selectedMovie = this.state.userMovies.find(item => {
      if(item._id === movieID) return item;
    })
    this.setState({
      selectedMovie: selectedMovie,
      show:true
    })
    console.log(this.state.selectedMovie);
  }

  updateMovies2= async (event) =>{
    const user = this.props.auth0;

    event.preventDefault();
    let movieInfo ={
      title: event.target.title.value,
      overview:event.target.overview.value,
      email:user.user.email
    }
    let movieID =this.state.selectedMovie._id;
    console.log(movieID);
    let movieData = await axios.put(`${process.env.REACT_APP_SERVER_LINK}/updatemovies/${movieID}`,movieInfo)
    this.setState({
      userMovies:movieData.data
    })

  }

  handleShow = () => {
    this.setState ({
      show:!this.state.show
    })
  }

  render() {

    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.userMovies.map(item=>{
            return(
              <div>
                <p>{item.title}</p>
                <p>{item.overview}</p>
                <Button onClick={()=>this.deleteMovies(item._id)}>delete</Button>
                <Button onClick={()=>this.updateMovies(item._id)}>update</Button>

              </div>
            )
          })}
          <UpdateForm updateMovies2={this.updateMovies2} selectedMovie={this.state.selectedMovie} show={this.state.show} handleShow={this.handleShow} />
      </>
    )
  }
}

export default withAuth0(BestBooks);
