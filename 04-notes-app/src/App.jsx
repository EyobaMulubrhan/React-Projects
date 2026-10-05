import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    if (title.trim() === "" || content.trim() === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
    };

    setNotes([...notes, newNote]);

    setTitle("");
    setContent("");
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));

    if (editingId === id) {
      cancelEdit();
    }
  }

  function startEdit(note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  }

  function updateNote() {
    if (title.trim() === "" || content.trim() === "") {
      return;
    }

    setNotes(
      notes.map((note) =>
        note.id === editingId
          ? {
              ...note,
              title: title.trim(),
              content: content.trim(),
            }
          : note,
      ),
    );

    cancelEdit();
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setContent("");
  }

  return (
    <main className="notes-page">
      <div className="notes-container">
        <header className="notes-header">
          <div>
            <h1>My Notes</h1>
            <p>Capture your ideas, thoughts, and important information.</p>
          </div>

          <div className="notes-count">
            <strong>{notes.length}</strong>
            <span>{notes.length === 1 ? "Note" : "Notes"}</span>
          </div>
        </header>

        <section className="note-form">
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />

          <div className="form-buttons">
            {editingId !== null ? (
              <>
                <button onClick={updateNote}>Save Changes</button>

                <button className="cancel-button" onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={addNote}>Add Note</button>
            )}
          </div>
        </section>

        <section className="notes-list">
          {notes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✦</div>

              <h2>No notes yet</h2>

              <p>Create your first note above.</p>
            </div>
          ) : (
            notes.map((note) => (
              <article className="note-card" key={note.id}>
                <div className="note-content">
                  <h2>{note.title}</h2>
                  <p>{note.content}</p>
                </div>

                <div className="note-actions">
                  <button onClick={() => startEdit(note)}>Edit</button>

                  <button
                    className="delete-button"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
