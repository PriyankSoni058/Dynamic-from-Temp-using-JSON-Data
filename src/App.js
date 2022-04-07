import formJSON from './formElement.json';

import profileJSON from './profileElement.json';
// import PElement from './components/PElement';
// import { PFormContext } from './PFormContext';

import { useState, useEffect } from 'react';
import Element from './components/Element';
import { FormContext } from './FormContext';

function App() {

  const [elements, setElements] = useState(null);
  useEffect(() => {
    setElements(formJSON[0],profileJSON[0])

  }, [])

  const { fields, page_label } = elements ?? {}
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(elements)
  }
  const handleChange = (id, event) => {
    const newElements = { ...elements }
    newElements.fields.forEach(field => {
      const { field_type, field_id } = field;
      if (id === field_id) {
        switch (field_type) {
          case 'checkbox':
            field['field_value'] = event.target.checked;
            break;

          default:
            field['field_value'] = event.target.value;
            break;
        }


      }
      setElements(newElements)
    });
    console.log(elements)

  }
  return (
    <FormContext.Provider value={{ handleChange }}>
      <div className="App container">
        <div className="m-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a href="Application" className="nav-link active">Application</a>
            </li>
            <li className="nav-item">
              <a href="Profile" className="nav-link">Profile</a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h3>{page_label}</h3>
        <form>
          {fields ? fields.map((field, i) => <Element key={i} field={field} />) : null}
          <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>

      </div>

    </FormContext.Provider>

  );
}

export default App;
