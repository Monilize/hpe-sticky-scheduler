import StickyNotes from "./components/stickyNotes";
import FilterStickyNotes from "./components/FilterStickyNotes";
import AddStickyNote from "./components/AddStickyNote";

function App() {

  return (
    <div className="wireframe-background">
      <div className="mx-auto p-6 block justify-center">
        <div className="flex flex-wrap items-stretch -mx-4">
          <div className="flex-5 p-4">
            <h1>Sticky Scheduler</h1>
          </div>
          <div className="flex-1 p-4">
            <FilterStickyNotes />
          </div>
          <div className="flex-[0.5] p-4">
            <AddStickyNote />
          </div>
        </div>
      </div>
      <StickyNotes />
    </div>
  )
}

export default App
