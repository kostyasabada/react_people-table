import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

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
      {people.length > 0 && (
        <PeopleTable
          people={people}
        />
      ) }
    </>
  );
};
