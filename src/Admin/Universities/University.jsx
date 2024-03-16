import React, { useEffect, useState } from 'react';
import { Badge, Table, ToggleSwitch } from 'flowbite-react';
import moment from 'moment';


const University = (props) => {
  const course = props.slot;



  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{props?.index + 1}</Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
        {course?.logo ? (
          <img src={course?.logo} style={{ height: '18px' }} />
        ) : (
          <FontAwesomeIcon icon={faImage} size="lg" />
        )}
      </Table.Cell>

      <Table.Cell>{course.name}</Table.Cell>
      <Table.Cell>{course.slug}</Table.Cell>
      <Table.Cell>
        <Table.Cell>
          {moment(course?.createdAt).format('D MMM,  YYYY')}
        </Table.Cell>
      </Table.Cell>

      <Table.Cell>
        <i
          className="fa-solid fa-pen-to-square cursor-pointer"
          onClick={() => props.openUniversityModal(course.id)}
        ></i>{' '}
        &nbsp;
        <i
          className="fa-solid fa-trash cursor-pointer"
          onClick={() => props.deleteUniversity(course.id)}
        ></i>
      </Table.Cell>
    </Table.Row>
  );
};

export default University;
