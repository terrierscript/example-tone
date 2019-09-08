import React, { createContext, useContext } from "react"
import { render } from "react-dom"
import { Synth } from "tone"
import styled from "styled-components"

const ToneContext = createContext({
  synth: new Synth().toMaster()
})

const area = `
  "ccr ddb ddb ddr eeb eeb eer ffr ggb ggb ggr aab aab aar bbb bbb bbr"
  "ccw ccw ddw ddw ddw eew eew ffw ffw ggw ggw ggw aaw aaw aaw bbw bbw"
`

const Area = styled.div`
  grid-area: ${({ area }) => area};
  height: 10em;
  border: 1px solid black;
  background: ${({ black }) => (black ? "black" : "white")};
  color: ${({ black }) => (black ? "white" : "black")};
  ${({ top }) => top && "border-top: 0px;"}
  ${({ bottom }) => bottom && "border-bottom: 0px;"}
`
const Grid = styled.div`
  display: grid;
  grid-template-areas: ${area};
`

const TriggerAttackRelease = ({ note, h }) => {
  const { synth } = useContext(ToneContext)
  return (
    <button
      onClick={() => {
        synth.triggerAttackRelease(note, "8n")
      }}
    >
      {note}
    </button>
  )
}
const extra = (x) => {
  switch (x) {
    case "w":
      return { top: true }
    case "b":
      return { black: true, bottom: true }
    case "r":
      return { bottom: true }
  }
}
const getNote = (key, x) => {
  // if()
  switch (x) {
    case "w":
    case "r":
      return `${key[0]}4`
    case "b":
      return `${key[0]}b4`
  }
}
const App = () => {
  const { synth } = useContext(ToneContext)

  return (
    <div>
      <div>
        <a href="https://github.com/terrierscript/example-tone" target="_blank">
          Source
        </a>
      </div>
      <Grid>
        {["cc", "dd", "ee", "ff", "gg", "aa", "bb"].map((key) =>
          ["w", "r", "b"].map((x) => {
            const area = `${key}${x}`
            if (area === "ffb" || area === "ccb") return
            const note = getNote(key, x)
            return (
              <Area
                key={area}
                area={area}
                {...extra(x)}
                onClick={() => {
                  synth.triggerAttackRelease(note, "8n")
                }}
              ></Area>
            )
          })
        )}
      </Grid>
    </div>
  )
}

render(<App />, document.querySelector("#container"))
