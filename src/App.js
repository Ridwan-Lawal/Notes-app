import { useState } from "react";

export default function App() {
  return (
    <div className="h-fit flex justify-center">
      <Container />
    </div>
  );
}

function Container() {
  const [notes, setNotes] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [formType, setFormType] = useState("");

  function handleAddNotes(newNote) {
    setNotes((curNotes) => [...curNotes, newNote]);
  }

  function handleOpenForm() {
    setIsOpened((status) => !status);
    setFormType("add");
  }

  function handleDeleteNote(id) {
    setNotes((curNotes) => curNotes.filter((note) => note.id !== id));
  }

  function handleEditNote(title, description, id) {
    setTitle(title);
    setDescription(description);
    setNotes((curNotes) => curNotes.filter((note) => note.id !== id));

    handleOpenForm();
    setFormType("update");
  }

  return (
    <div className="bg-gradient-to-r h-fit px-20  py-12 w-full max-w-fit  from-sky-300 to-cyan-400 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
      <AddNewNotes onOpenForm={handleOpenForm} />
      <NotesDisplay
        notes={notes}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
      />
      <NoteForm
        onAddNotes={handleAddNotes}
        onOpenForm={handleOpenForm}
        isOpened={isOpened}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        formType={formType}
      />
    </div>
  );
}

function AddNewNotes({ onOpenForm }) {
  return (
    <div
      onClick={onOpenForm}
      className="border h-[300px] hover:scale-105 cursor-pointer hover:bg-opacity-95 transition-all w-[260px] rounded-md bg-white flex flex-col items-center justify-center gap-5 "
    >
      <div className="text-sky-400 text-5xl border-2 border-dashed border-sky-400 text-center pb-3 w-fit px-3.5 rounded-full">
        +
      </div>

      <p className="text-sky-400 font-medium text-lg">Add new note</p>
    </div>
  );
}

function NoteForm({
  onAddNotes,
  isOpened,
  onOpenForm,
  title,
  setTitle,
  description,
  setDescription,
  formType,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !description) return;

    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat(navigator.language, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);

    const newNote = {
      title,
      description,
      date: formattedDate,
      id: crypto.randomUUID(),
    };

    onAddNotes(newNote);

    setTitle("");
    setDescription("");

    onOpenForm();
  }

  return (
    isOpened && (
      <div className="fixed top-0 left-0 bg-black bg-opacity-70 flex flex-row items-center w-full h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white pt-3 pb-8 mx-auto rounded-lg w-full  max-w-sm"
        >
          <div className="border-b pb-4 flex justify-between items-center px-8">
            <h1 className="text-blue-950 font-bold text-xl ">
              {formType === "add" ? "Add a new Note" : "Update a Note"}
            </h1>
            <p
              onClick={onOpenForm}
              className="font-bold cursor-pointer text-2xl text-gray-400 "
            >
              &times;
            </p>
          </div>

          {/* title */}
          <div className="px-8">
            <div className="mt-4">
              <label className="font-medium text-blue-950">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form "
              />
            </div>

            {/* description */}
            <div className="mt-8">
              <label className="font-medium text-blue-950">Description</label>
              <textarea
                type="text"
                rows="5"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form resize-none overflow-hidden text-sm"
              />
            </div>

            <button
              className={`bg-gradient-to-r ${
                title && description
                  ? "from-sky-400 to-cyan-500"
                  : "from-sky-100 to-cyan-200"
              }  text-white py-2.5 w-full font-medium hover:scale-105 transition-transform mt-6 rounded-md`}
            >
              {formType === "add" ? " Add Note" : "Update Note"}
            </button>
          </div>
        </form>
      </div>
    )
  );
}

function NotesDisplay({ notes, onDeleteNote, onEditNote }) {
  console.log(notes);
  return (
    <>
      {notes.map((note) => (
        <Note
          note={note}
          key={note.id}
          onDeleteNote={onDeleteNote}
          onEditNote={onEditNote}
        />
      ))}
    </>
  );
}

function Note({ note, onDeleteNote, onEditNote }) {
  const [isOPenMenu, setIsOpenMenu] = useState(false);

  function handleOpenMenu() {
    setIsOpenMenu((status) => !status);
  }

  return (
    <div className="bg-white relative flex flex-col justify-between transition-all h-[300px]  max-w-[260px] px-6 pt-5 rounded-md">
      <div>
        <h1 className="text-blue-950 text-2xl font-semibold">{note.title}</h1>
        <p className="mt-3 font-normal text-gray-600">{note.description}</p>
      </div>

      <div className="flex justify-between items-center border-t mt-6 py-3">
        <p className="text-gray-500 text-sm">{note.date}</p>

        <div className="">
          <ul
            className={`space-y-2 border ${
              !isOPenMenu && "hidden"
            }  bg-white  py-1 absolute w-20 h-20  right-4  top-48  overflow-hidden`}
          >
            <li
              className="list"
              onClick={() => onEditNote(note.title, note.description, note.id)}
            >
              Edit
            </li>
            <li className="list" onClick={() => onDeleteNote(note.id)}>
              Delete
            </li>
          </ul>

          <p
            onClick={handleOpenMenu}
            className="text-gray-500   text-right text-2xl -mt-3 cursor-pointer"
          >
            ...
          </p>
        </div>
      </div>
    </div>
  );

  // the delete and edit button (toggle  hidden)
}

//  add the edit and the delete functionality
