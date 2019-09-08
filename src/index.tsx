import React, { createContext, useContext } from "react"
import { render } from "react-dom"
import { Synth } from "tone"

const ToneContext = createContext({
  synth: new Synth().toMaster()
})

const TriggerAttackRelease = ({ note }) => {
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

const App = () => {
  return (
    <div>
      <div>
        <a href="https://github.com/terrierscript/example-tone" target="_blank">
          Source
        </a>
      </div>
      <div>
        <TriggerAttackRelease note="C4" />
        <TriggerAttackRelease note="D4" />
        <TriggerAttackRelease note="E4" />
        <TriggerAttackRelease note="F4" />
        <TriggerAttackRelease note="G4" />
        <TriggerAttackRelease note="A4" />
        <TriggerAttackRelease note="B4" />
      </div>
    </div>
  )
}

render(<App />, document.querySelector("#container"))
