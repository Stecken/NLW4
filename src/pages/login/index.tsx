import { Auth } from "../../components/Auth";
import React, { useContext } from "react";
import Head from "next/head"
import styles from '../../styles/pages/Login.module.css';
import { AuthContext } from "../../contexts/AuthContext";
import { GetServerSideProps } from "next";

export default function Login() {
    const { } = useContext(AuthContext);

    return (
        <div className={styles.loginContainer}>
            <Head>
                <title>Login | MoveWe</title>
            </Head>
            <Auth />
        </div>
    );
}