import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import NavHome from "../home/NavHome";
import { createDeck } from "../utils/api";

// path to this screen is `/decks/new`
// title is Create Deck
// a form that consists of
// a name input field type text titled Name w/ placeholder `Deck Name`
// a description textarea text field titled Description w/ placeholder 'Brief description of the deck'
// at bottom of form:
// Cancel button takes user back to Home screen
// Submit button takes user to Deck screen

function CreateDeck({ updateDecks }) {
  const initialFormState = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(initialFormState);

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewDeck({
      ...newDeck,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createdDeck = await createDeck(newDeck);
    console.log("New deck created:", createdDeck);
    setNewDeck(initialFormState);
    updateDecks(createdDeck);
    history.push(`/decks/${createdDeck.id}`);
  };

  return (
      <NavHome heading="Create Deck">
      <h1>Create Deck</h1>
      <form name="create" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
            onChange={handleChange}
            value={newDeck.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Brief description of the deck"
            onChange={handleChange}
            value={newDeck.description}
            rows="3"
          ></textarea>
        </div>
        <Link to="/" className="btn btn-secondary mr-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </NavHome>
  );
}

export default CreateDeck;
