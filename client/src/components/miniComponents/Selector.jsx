/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';

function Selector({ specialities, set }) {
    const [elements, SetElements] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [selected, setSelected] = useState('');
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
      SetElements(specialities);
    }, []);
  
    return (
      <div className="w-72 font-medium relative">
        <div
          onClick={() => setOpen(!open)}
          className={`bg-gray-50 w-full border-blue-100 border p-2 flex items-center justify-between rounded ${
            !selected && 'text-gray-700'
          }`}
        >
          {selected
            ? selected?.length > 25
              ? `${selected?.substring(0, 25)}...`
              : selected
            : 'Please Select'}
          <ion-icon name="chevron-down-outline"/>
        </div>
        <ul
          className={`bg-white mt-2 overflow-y-auto ${
            open ? 'max-h-60' : 'max-h-0'
          } absolute w-full left-0 top-12 z-10`}
        >
          <div className="flex items-center px-2 sticky top-0 bg-white">
            <ion-icon name="search-outline"/>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              placeholder='search...'
              className="placeholder:text-gray-700 p-2 outline-none"
            />
          </div>
          {elements?.map((elem) => (
            <li
              key={elem?.name}
              className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              elem?.name?.toLowerCase() === selected?.toLowerCase() &&
              'bg-sky-600 text-white'
            }
            ${
              elem?.name?.toLowerCase().startsWith(inputValue)
                ? 'block'
                : 'hidden'
            }`}
              onClick={() => {
                if (elem?.name?.toLowerCase() !== selected.toLowerCase()) {
                  setSelected(elem?.name);
                  setOpen(false);
                  setInputValue('');
                  set(elem?.name)
                }
              }}
            >
              {elem?.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Selector;
  
