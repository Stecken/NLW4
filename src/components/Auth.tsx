import React, { useContext, useState } from 'react';
import styles from '../styles/components/Auth.module.css';
import { FaGithub } from 'react-icons/fa'
import { AuthContext } from '../contexts/AuthContext';
import { ChallengesContext } from '../contexts/ChallengesContext';

export function Auth() {
    const [userName, setUserName] = useState('');
    const { singIn } = useContext(AuthContext);

    const handleSingIn = async () => {
        singIn(userName);
    }

    return (
        <div className={styles.authContainer}>
            <div>
                <h1>Bem-vindo(a) ao MoveWe</h1>
                <div>
                    <FaGithub className={styles.iconeGit}/>
                    <p>Entre com seu GitHub!</p>
                </div>
            </div>
            
            <div className={styles.containerButton}>
                <input type="text" placeholder="Digite seu username" onChange={(e) => setUserName(e.target.value.trim())} />
                <button
                    type="button"
                    onClick={handleSingIn}
                >
                    <img src="icons/seta.svg" alt="Entrar" className={styles.iconeEntrar}/>
                </button>
            </div>
        </div>
    );
}
