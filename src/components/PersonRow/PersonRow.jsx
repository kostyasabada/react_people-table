import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useParams } from 'react-router-dom';
import classnames from 'classnames';
// import { PersonName } from '../PersonName';

export const PersonRow = ({ person, sortQuery }) => {
  const { name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father } = person;

  const { personSlug } = useParams();

  return (
    <>
      <tr className={classnames({
        activePerson: personSlug === slug,
      })}
      >
        <td
          className={classnames({
            sortedCollumn: sortQuery === 'name',
          })}
        >
          <NavLink
            className={classnames({
              'link-man': sex === 'm',
              'link-woman': sex === 'f',
            })}
            to={`/people/${slug}`}
          >
            {name}
          </NavLink>
        </td>
        <td
          className={classnames({
            sortedCollumn: sortQuery === 'sex',
          })}
        >
          {sex}
        </td>
        <td
          className={classnames({
            sortedCollumn: sortQuery === 'born',
          })}
        >
          {born}
        </td>
        <td
          className={classnames({
            sortedCollumn: sortQuery === 'died',
          })}
        >
          {died}
        </td>
        <td
          className={classnames({
            sortedCollumn: sortQuery === 'motherName',
          })}
        >
          {mother
            ? (
              <NavLink
                className="link-woman"
                to={`/people/${mother.slug}`}
              >
                {motherName}
              </NavLink>
            )
            : `${motherName || 'No info'}`
          }
        </td>
        <td
          className={classnames({
            sortedCollumn: sortQuery === 'fatherName',
          })}
        >
          {father
            ? (
              <NavLink
                className="link-man"
                to={`/people/${father.slug}`}
              >
                {fatherName}
              </NavLink>
            )
            : (`${fatherName || 'No info'}`)
          }
        </td>
      </tr>
    </>
  );
};

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    fatherName: PropTypes.string,
    motherName: PropTypes.string,
    slug: PropTypes.string.isRequired,
    mother: PropTypes.object,
    father: PropTypes.object,
  }).isRequired,
  sortQuery: PropTypes.string.isRequired,
};
