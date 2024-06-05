"use client"
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";
import axios from "axios";

export default function Home() {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  const onClickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
        }),
      });

      // console.log('working fine');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <main style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={(e) => onClickHandler(e)}>
        <input
          placeholder="Enter email id"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            // Add your CSS-in-JS styles here
            padding: '0.5rem',
            marginBottom: '1rem',
            borderRadius: '0.25rem',
            border: '1px solid #ccc',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
        <input
          placeholder="Enter the name of invitee"
          onChange={(e) => setUsername(e.target.value)}
          style={{
            // Add your CSS-in-JS styles here
            padding: '0.5rem',
            marginBottom: '1rem',
            borderRadius: '0.25rem',
            border: '1px solid #ccc',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <button
            style={{
              // Add your CSS-in-JS styles here
              padding: '0.5rem 1rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
