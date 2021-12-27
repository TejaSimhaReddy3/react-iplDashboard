import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {name, teamImageUrl, id} = teamDetails
  return (
    <Link to={`/team-matches/${id}`} className="homeLists">
      <li>
        <div className="homeListsContainer">
          <img src={teamImageUrl} className="homeTeamImgs" alt={name} />
          <h1 className="teamsHomeHeading">{name}</h1>
        </div>
      </li>
    </Link>
  )
}

export default TeamCard
