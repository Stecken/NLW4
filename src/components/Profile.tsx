import { useContext } from 'react';
import Cookies from 'js-cookie';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'
import { AuthContext } from '../contexts/AuthContext';

export function Profile() {
    const { level } = useContext(ChallengesContext);

    const { userAuth, logout } = useContext(AuthContext);

    return (
        <div className={styles.profileContainer}>
            <img src={`${userAuth.avatar_url}`} alt="Yuri Martins" />
            <div>
                <div>
                    <strong>{userAuth.name}</strong>
                    <button
                        type="button"
                        onClick={logout}
                    >
                        logout
                    </button>
                </div>
                <p className={styles.username}>{userAuth.login}</p>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}