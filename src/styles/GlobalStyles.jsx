// src/styles/GlobalStyle.jsx
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #87CEFA;
    color: #333;

    /* Блокируем эффект "резинового скролла" */
    overscroll-behavior: contain; /* 🔥 ключевой параметр */
  }

  #root, #__next {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* Для элементов с внутренним скроллом */
  .scrollable {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* Плавность на iOS */
  }
`