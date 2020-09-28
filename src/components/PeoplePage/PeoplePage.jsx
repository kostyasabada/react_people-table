import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const filteredPeople = useMemo(() => people
    .filter((any) => {
      if (any.motherName
        && any.motherName.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }

      if (any.fatherName
        && any.fatherName.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }

      return any.name.toLowerCase().includes(query.toLowerCase());
    }),
  [people, query]);

  // console.log(query);

  useEffect(() => {
    getPeople()
      .then(result => setPeople(result
        .map(person => (
          {
            ...person,
            mother: result.find(any => any.name === person.motherName),
            father: result.find(any => any.name === person.fatherName),
          }
        ))));
  }, []);

  // console.log(people);

  return (
    <>
      <h1>People Page</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(event) => {
            searchParams.set('query', event.target.value);
            history.push({
              search: searchParams.toString(),
            });
          }}
        />
      </div>
      {people.length > 0 && (
        <PeopleTable
          people={filteredPeople}
        />
      ) }
    </>
  );
};
