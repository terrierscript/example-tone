import React, { createContext, useContext } from "react"
import { render } from "react-dom"
import { Synth } from "tone"

const ToneContext = createContext({
  synth: new Synth().toMaster()
})

const TriggerAttackRelease = ({ note }) => {
  const { synth } = useContext(ToneContext)
  return (
    <div>
      <button
        onClick={() => {
          synth.triggerAttackRelease(note, "8n")
        }}
      >
        {note}
      </button>
    </div>
  )
}
const App = () => {
  return (
    <div>
      <TriggerAttackRelease note="C4" />
      <TriggerAttackRelease note="D4" />
      <TriggerAttackRelease note="E4" />
      <TriggerAttackRelease note="F4" />
      <TriggerAttackRelease note="G4" />
      <TriggerAttackRelease note="A4" />
      <TriggerAttackRelease note="B4" />
    </div>
  )
}

render(<App />, document.querySelector("#container"))
