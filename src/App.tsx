import StickyNotes from "./components/stickyNotes";
import FilterStickyNotes from "./components/FilterStickyNotes";
import AddStickyNote from "./components/AddStickyNote";
import AddTeamMember from "./components/AddTeamMember";
import { Toaster } from "@/components/ui/sonner"
import SearchStickyNotes from "./components/SearchStickyNotes";

function App() {

  return (
    <div style={{ zIndex: 1 }} className="relative">
      <Toaster richColors closeButton position="top-right" />
      <div className="mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch ">
          <div className="p-4 flex items-center md:justify-center lg:justify-start">
            <h1 className="text-xl font-semibold">Sticky Scheduler</h1>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <SearchStickyNotes />
            <FilterStickyNotes />
            <AddStickyNote />
            <AddTeamMember />
          </div>
        </div>
      </div>
      <StickyNotes />
    </div>
  )
}

export default App
