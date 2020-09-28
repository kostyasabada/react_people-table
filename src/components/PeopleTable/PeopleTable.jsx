import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PersonRow } from '../PersonRow';

export const PeopleTable = ({ people }) => {
  // const [queryValue, setQueryValue] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortQuery = searchParams.get('sortBy') || '';
  const history = useHistory();

  // console.log(sortQuery);

  const handleSort = (queryValue) => {
    searchParams.set('sortBy', queryValue);
    history.push({
      search: searchParams.toString(),
    });
  };

  // useEffect(() => {
  //   searchParams.set('sortBy', queryValue);
  //   history.push({
  //     search: searchParams.toString(),
  //   });
  // }, [queryValue]);

  const sorteredPeople = useMemo(() => people.sort((a, b) => {
    switch (sortQuery) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'sex':
        return a.sex.localeCompare(b.sex);
      case 'born':
        return a.born - b.born;
      case 'died':
        return a.died - b.died;
      case 'motherName':
        if (a.motherName) {
          return b.motherName ? a.motherName.localeCompare(b.motherName) : -1;
        }

        if (b.motherName) {
          return a.motherName ? b.motherName.localeCompare(a.motherName) : 1;
        }

        break;

      case 'fatherName':
        if (a.fatherName) {
          return b.fatherName ? a.fatherName.localeCompare(b.fatherName) : -1;
        }

        if (b.fatherName) {
          return a.fatherName ? b.fatherName.localeCompare(a.fatherName) : 1;
        }

        break;

      default:
        return a === b;
    }

    return true;
  }),
  [sortQuery, people]);

  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <th
            onClick={() => {
              handleSort('name');
              // setQueryValue('name');
              // searchParams.set('sortBy', 'name');
              // console.log(sortQuery);
              // history.push({
              //   search: searchParams.toString(),
              // });
            }}
          >
            Name
          </th>
          <th
            onClick={() => {
              handleSort('sex');
            }}
          >
            Sex
          </th>
          <th
            onClick={() => {
              handleSort('born');
            }}
          >
            Born
          </th>
          <th
            onClick={() => {
              handleSort('died');
            }}
          >
            Died
          </th>
          <th
            onClick={() => {
              handleSort('motherName');
            }}
          >
            Mother
          </th>
          <th
            onClick={() => {
              handleSort('fatherName');
            }}
          >
            Father
          </th>
        </tr>
      </thead>
      <tbody>
        {sorteredPeople.map(person => (
          <PersonRow
            key={person.name}
            person={person}
            sortQuery={sortQuery}
          />
        ))}
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};
