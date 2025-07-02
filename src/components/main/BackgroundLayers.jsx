// src/components/BackgroundLayers.jsx
import styled from 'styled-components'

const TopLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  background-color: #E0FFFF; /* Цвет сверху */
  z-index: -2;
`

const BottomLayer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  background-color: #87CEFA; /* Цвет снизу */
  z-index: -2;
`

export default function BackgroundLayers() {
  return (
    <>
      <TopLayer />
      <BottomLayer />
    </>
  )
}