import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {recentMatcheData: [], isLoading: true}

  componentDidMount() {
    this.getLatestMatches()
  }

  getLatestMatches = async () => {
    // console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const formattedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: {
        umpires: fetchedData.latest_match_details.umpires,
        result: fetchedData.latest_match_details.result,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        id: fetchedData.latest_match_details.id,
        date: fetchedData.latest_match_details.date,
        venue: fetchedData.latest_match_details.venue,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        firstInnings: fetchedData.latest_match_details.first_innings,
        secondInnings: fetchedData.latest_match_details.second_innings,
        matchStatus: fetchedData.latest_match_details.match_status,
      },
      recentMatches: fetchedData.recent_matches.map(recentMatch => ({
        umpires: recentMatch.umpires,
        result: recentMatch.result,
        manOfTheMatch: recentMatch.man_of_the_match,
        id: recentMatch.id,
        date: recentMatch.date,
        venue: recentMatch.venue,
        competingTeam: recentMatch.competing_team,
        competingTeamLogo: recentMatch.competing_team_logo,
        firstInnings: recentMatch.first_innings,
        secondInnings: recentMatch.second_innings,
        matchStatus: recentMatch.match_status,
      })),
    }
    console.log(formattedData)

    this.setState({recentMatcheData: formattedData, isLoading: false})
  }

  renderRecentMatches = () => {
    const {recentMatcheData} = this.state
    const {recentMatches} = recentMatcheData

    return (
      <ul className="recentMatchCardUl">
        {recentMatches.map(eachRecentMatch => (
          <MatchCard matchDetails={eachRecentMatch} key={eachRecentMatch.id} />
        ))}
      </ul>
    )
  }

  getMatchCompleteDetails = () => {
    const {match} = this.props
    const {params} = match
    // for using alt id..we need to get all these stuff
    const {id} = params
    const {recentMatcheData} = this.state
    const {teamBannerUrl, latestMatchDetails} = recentMatcheData

    return (
      <div className="teamMatchContainer">
        <img src={teamBannerUrl} alt="team banner" className="bannerImage" />
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        {this.renderRecentMatches()}
      </div>
    )
  }

  getTeamBgs = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className={`teamMatchesContainer ${this.getTeamBgs()}`}>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.getMatchCompleteDetails()
        )}
      </div>
    )
  }
}

export default TeamMatches
