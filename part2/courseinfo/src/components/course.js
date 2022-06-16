/*
Description:

*/

import Header from './header';
import Content from './content';
import Total from './total';

const Course = ({course}) => {

    return (
        <>
            <Header course = {course.name} />
            <Content parts = {course.parts} />
            <Total parts = {course.parts} />
        </>
    );
}

export default Course;