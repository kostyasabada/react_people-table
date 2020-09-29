import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PersonRow } from '../PersonRow';

export const PeopleTable = ({ people }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortQuery = searchParams.get('sortBy') || '';
  const history = useHistory();

  const handleSort = (queryValue) => {
    searchParams.set('sortOrder',
      searchParams.get('sortBy') === queryValue
      && searchParams.get('sortOrder') === 'asc'
        ? 'desc'
        : 'asc');
    searchParams.set('sortBy', queryValue);
    history.push({
      search: searchParams.toString(),
    });
  };

  const sorteredPeople = useMemo(() => {
    const peopleArr = people.sort((a, b) => {
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
    });

    if (searchParams.get('sortOrder') === 'asc') {
      return peopleArr;
    }

    return peopleArr.reverse();
  },
  [sortQuery, people, searchParams.get('sortOrder')]);

  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <th
            className={classnames('thead__cell', {
              thead__cell_active: searchParams.get('sortBy') === 'name',
            })}
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
            className={classnames('thead__cell', {
              thead__cell_active: searchParams.get('sortBy') === 'sex',
            })}
            onClick={() => {
              handleSort('sex');
            }}
          >
            Sex
          </th>
          <th
            className={classnames('thead__cell', {
              thead__cell_active: searchParams.get('sortBy') === 'born',
            })}
            onClick={() => {
              handleSort('born');
            }}
          >
            Born
          </th>
          <th
            className={classnames('thead__cell', {
              thead__cell_active: searchParams.get('sortBy') === 'died',
            })}
            onClick={() => {
              handleSort('died');
            }}
          >
            Died
          </th>
          <th
            className={classnames('thead__cell', {
              thead__cell_active: searchParams.get('sortBy') === 'motherName',
            })}
            onClick={() => {
              handleSort('motherName');
            }}
          >
            Mother
          </th>
          <th
            className={classnames('thead__cell', {
              thead__cell_active: searchParams.get('sortBy') === 'fatherName',
            })}
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
