import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import styles from './flipper.module.css';

interface Flipper {
  sceneStyle: React.CSSProperties;
  frontNode: React.ReactNode;
  backNode: React.ReactNode;
}

const Flipper = (props: Flipper) => {
  const { sceneStyle, frontNode, backNode } = props;
  const [isFront, setIsFront] = useState<boolean>(true);
  const flip = useCallback(() => {
    setIsFront(!isFront);
  }, [isFront]);

  return (
    <div className={styles.scene} style={sceneStyle}>
      <div
        onClick={flip}
        className={classNames(
          styles.card,
          !isFront ? styles['is-flipped'] : ''
        )}
      >
        <div
          className={classNames(
            styles['card__face'],
            styles['card__face--front']
          )}
        >
          {frontNode}
        </div>
        <div
          className={classNames(
            styles['card__face'],
            styles['card__face--back']
          )}
        >
          {backNode}
        </div>
      </div>
    </div>
  );
};

export default Flipper;
