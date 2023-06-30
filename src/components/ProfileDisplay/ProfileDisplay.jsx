import "./ProfileDisplay.css";

import avatar from "../../assets/avatar.png";

function ProfileDisplay({ userFound, user, repos }) {
  const ratedRepos = repos.map(repo => ({ ...repo, rating: repo.forks_count + repo.stargazers_count }))
  const sortedRepos = ratedRepos.sort((a, b) => b.rating - a.rating);
  const top4repos = sortedRepos.slice(0, 4);
  const listItems = top4repos.map(repo => <li key={repo.id}><a href={repo.html_url} target="_blank"
    rel="noopener noreferrer">{repo.name}</a></li>);

  if (userFound) {
    return (
      <div className="ProfileDisplay" >
        <img className="ProfileDisplay-avatar" src={user.avatar_url} alt="GitHub user's ProfileDisplay-avatar" />
        <h1 className="ProfileDisplay-fullname">{user.name !== null ? user.name : "..."}</h1>
        <h2 className="ProfileDisplay-username">{user.login}</h2>
        {/* <p className="ProfileDisplay-detail">{user.followers} followers - {repos.length} repositories</p> */}
        <p className="ProfileDisplay-detail">{user.followers} followers - {repos.length} repositories
        </p>
        <p className="ProfileDisplay-detail">top 4 repos:</p>
        <ul className="ProfileDisplay-detail ProfileDisplay-list">
          {listItems}
        </ul>
      </div>
    );
  }
  return (
    <div className="ProfileDisplay" >
      <img className="ProfileDisplay-avatar" src={avatar} alt="avatar placeholder" />
      <h1 className="ProfileDisplay-fullname">Full Name</h1>
      <p className="ProfileDisplay-username">username</p>
      <p className="ProfileDisplay-detail">x followers - x repositories</p>
      <p className="ProfileDisplay-detail">top 4 repos:</p>
      <ul className="ProfileDisplay-detail ProfileDisplay-list">
        <li>repo</li>
        <li>repo</li>
        <li>repo</li>
        <li>repo</li>
      </ul>
    </div>
  );

}

export default ProfileDisplay;