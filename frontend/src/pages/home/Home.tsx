import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../home/home.css';
import { hover } from '@testing-library/user-event/dist/hover';
import procure from '../../images/procure.svg';


function Home() {
  useEffect(() => {
    document.title = "ATM CHECK";
  }, []);

  return (

    <div style={{
      background: "#070416e0",
      width: "100%",
      height: "100dvh"
    }}>

      <div className="header" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>

        <div className="logo">
          <h1 className='title-page' style={{
            margin: "10px",
            fontSize: "1.5em",
            fontWeight: "900"
          }}>ATM CHECK</h1>
        </div>

        <div className="menu" style={{
          display: "flex",
          gap: "10px",
          margin: "10px",
          border: "1px solid #321da8b0",
          borderRadius: "30px",
          background: "#aca4db38",
          padding: "5px"
        }}>

          <Link to="/login-admin" style={{
            textDecoration: "none",
            fontWeight: "bold",
            color: "#fff",
            padding: "10px",
            borderRadius: "30px"
          }}>Admin</Link>

          <Link to="/login-agent" style={{
            textDecoration: "none",
            fontWeight: "bold",
            color: "#fff",
            background: "radial-gradient(circle,rgba(88, 86, 214, 1) 0%, rgba(50, 29, 168, 1) 100%)",
            padding: "10px 20px",
            borderRadius: "30px"
          }}>Agent</Link>
        </div>

      </div>

      <div className="session-image" style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        <div className="image-particula">
          <img src={procure} alt="imagem de filas" style={{
            width: "350px",
            height: "230",
            marginBottom:"30px"
          }} />
        </div>
      </div>

      <div className="session-iniciar" style={{
        background: "#ffffffbb",
        position: "fixed",
        bottom: "0px",
        width: "100vw",
        height: "50vh",
        borderRadius: "30px 30px 0px 0px"
        }}>

        <div className="inicio" style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px"
          }}>

          <h2 className='text-inicio' style={{
            fontSize: "1.8em",
            fontWeight: "900",
            color: "#5856D6",
            textAlign: "center",
            width: "310px"
          }}>
            Encontre os pontos de ATM com menos filas proximos de ti.
          </h2>
        </div>

        {/* <p style={{ color: "#fff", textAlign: "center" }}>Encontre agora mesmo.</p> */}


        <div className="session-client" style={{
          display: "flex",
          justifyContent: "center"
          }}>

          <Link to="/" className='btn-checar'
            style={{
              cursor: "not-allowed",
              textDecoration: "none",
              fontWeight: "bold",
              color: "#fff",
              background: "radial-gradient(circle,rgba(88, 86, 214, 1) 0%, rgba(50, 29, 168, 1) 100%)",
              padding: "10px",
              borderRadius: "30px",
              width: "250px",
              textAlign: "center",
              boxShadow: " #321da85e 0px 4px 24px",
              marginTop: "60px",
              position:"fixed",
              bottom:"60px"
            }}>CHECAR</Link>

        </div>
      </div>
    </div>

  );
}

export default Home;
