// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = itemDetails
  return (
    <li className="list-item-container">
      <img src={avatarUrl} alt={name} className="image-item" />
      <h1 className="name">{name}</h1>
      <div className="sub-img-item-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="sub-image"
        />

        <p className="sub-item">{starsCount} star</p>
      </div>
      <div className="sub-img-item-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="sub-image"
        />
        <p className="sub-item">{forksCount} fork count</p>
      </div>
      <div className="sub-img-item-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="sub-image"
        />
        <p className="sub-item">{issuesCount} open issues </p>
      </div>
    </li>
  )
}

export default RepositoryItem
