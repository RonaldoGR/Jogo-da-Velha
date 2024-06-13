import styles from './Score.module.css'

import Icon from '../components/icon/Icon'
import Button from '../components/button/Button'



function Score ({winnerCircle, winnerX,resetScore}) {
  const disabledButton = () =>  winnerX === 0 && winnerCircle === 0

 

  return (
    <>
        <h4>Placar:</h4>
        <div className={styles.score}>
          <div className={styles.scoreContent}>
            <Icon iconName='circle' />
              <h2>{winnerCircle}</h2>
          </div>
          <div className={styles.scoreContent}>
          <Icon iconName='x' />
            <h2>{winnerX}</h2>
          </div>
        </div>
        <div className={styles.scoreButton}>
          <Button 
          onClick={resetScore}
          disabled={disabledButton()}
          >
            Resetar placar
          </Button> 
        </div>
    </>

  )
}

export default Score