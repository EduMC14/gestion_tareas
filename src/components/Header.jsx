import React from 'react'
import logo from '../assets/logo-bitam.svg'

const Header = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-text-light" id='navegador'>
        <div className="container-fluid">
          <img src={logo} alt="" className='img-bitam'/>
          <a className="navbar-brand" href="#">
            Gestion De Tareas
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Fecha
                </a>
              </li>
              <li className="nav-item d-flex align-items-center">
                <select
                  class="form-select form-select-sm "
                  aria-label=".form-select-sm example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
}

export default Header