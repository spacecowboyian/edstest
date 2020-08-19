import React, { useState, useEffect, useRef } from 'react';
import ExperianLogo from './components/ExperianLogo';
import '@experian/eds-styles/dist/eds-all.css';
import '@experian/eds-elements/dist/eds-core';
import '@experian/eds-elements/dist/eds-autocomplete';

function App() {
  const [selection, setSelection] = useState('');

  const autocompleteRef = useRef();

  useEffect(() => {
    window.addEventListener('valueUpdate', e => {
      console.log(e)
    })
  });

  return (
    <div className="App">
      <header className="eds-primary-header">
        <a href="javascript:void(0)" className="eds-primary-header_#logo">
          <ExperianLogo />
        </a>

        <h1 className="eds-primary-header_#title">Food Finder</h1>

        <nav className="eds-primary-header_.section" role="navigation" aria-label="Control Center">
          <a href="javascript:void(0)" className="eds-primary-header_.eds-primary-nav-item eds-primary-nav-item eds-primary-nav-item.eds-link eds-link" aria-haspopup="true">
            <div className="eds-primary-nav-item_.eds-avatar eds-avatar eds-avatar.sm eds-avatar.blue">
              <img
                style={{ height: '100%' }}
                src="data:image/jpeg;base64,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"
              />
            </div>
          </a>
        </nav>
      </header>
      <section style={{ textAlign: 'center' }}>
        <h2 className="eds-heading eds-heading.lg-caps mt-64">What will you eat today?</h2>
        <div className="mx-auto" style={{ width: '258px' }}>
          <eds-autocomplete ref={autocompleteRef} options={JSON.stringify([{
            content: 'Apple (Honeycrisp)',
            value: 'apple-honeycrisp',
            selected: false
          }, {
            content: 'Apple (Granny Smith)',
            value: 'apple-grannysmith',
            selected: false
          }, {
            content: 'Grape (Green)',
            value: 'grape-green',
            selected: false
          }, {
            content: 'Grape (Red)',
            value: 'grape-red',
            selected: false
          }])} />
          {selection}
        </div>
      </section>
    </div>
  );
}

export default App;
