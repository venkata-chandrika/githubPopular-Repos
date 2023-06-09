// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filterDetails, updateActiveBtn, isActive} = props
  const {id, language} = filterDetails
  const btnClassName = isActive ? 'active-btn' : ''
  const onClickBtn = () => {
    updateActiveBtn(id)
  }
  return (
    <li className="lang-container">
      <button
        type="button"
        className={`button ${btnClassName}`}
        onClick={onClickBtn}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
