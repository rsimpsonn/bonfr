import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`

  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Montserrat', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Montserrat', sans-serif;
  }

  #app {
    background-color: #fff;
    min-height: 100%;
    min-width: 100%;
  }

  h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    color: #fff;
  }

  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    font-weight: 300;
    color: #fff;
  }

  h4 {
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    font-weight: 400;
    color: #fff;
  }

  button,
  p,
  input {
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5em;
  }

  textarea {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
  }

  label {
    font-family: 'Montserrat', sans-serif;
    color: #fff;
  }

  a {
    text-decoration: none;
  }
`;
