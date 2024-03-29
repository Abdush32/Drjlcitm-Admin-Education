import React, { useEffect, useState } from 'react';
import { Badge, Table, ToggleSwitch } from 'flowbite-react';
import moment from 'moment';

const Course = (props) => {
  const course = props.course;

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{props?.index + 1}</Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
        {course?.image ? (
          <img src={course?.image} style={{ height: '18px' }} />
        ) : (
          <FontAwesomeIcon icon={faImage} size="lg" />
        )}
      </Table.Cell>

      <Table.Cell>{course?.name ?? "N/A"}</Table.Cell>
      <Table.Cell>
        {moment(course?.createdAt).format('D MMM,  YYYY')}
      </Table.Cell>

      <Table.Cell>
        <i
          className="fa-solid fa-pen-to-square cursor-pointer"
          onClick={() => props.openCourseModal(course?.id)}
        ></i>{' '}
        &nbsp;
        <i
          className="fa-solid fa-trash cursor-pointer"
          onClick={() => props.deleteCourse(course?.id)}
        ></i>
      </Table.Cell>
    </Table.Row>
  );
};

export default Course;
