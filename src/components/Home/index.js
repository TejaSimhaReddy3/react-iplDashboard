import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamData: [], isLoading: true}

  componentDidMount() {
    this.getIplTeams()
  }

  getIplTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchData = await response.json()
    const formattedData = fetchData.teams.map(eachData => ({
      id: eachData.id,
      name: eachData.name,
      teamImageUrl: eachData.team_image_url,
    }))

    this.setState({teamData: formattedData, isLoading: false})
  }

  renderTeamsList = () => {
    const {teamData} = this.state

    return (
      <div className="homeUlContainer">
        <ul className="homeUl">
          {teamData.map(eachData => (
            <TeamCard key={eachData.id} teamDetails={eachData} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="homeMainContainer">
        <div className="titleContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            className="titleImg"
            alt=" ipl logo"
          />
          <h1 className="titleHead">IPL Dashboard</h1>
        </div>
        <div className="iplTeamsFlexContainer">
          {isLoading ? (
            <div testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            this.renderTeamsList()
          )}
        </div>
      </div>
    )
  }
}

export default Home
