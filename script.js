const byId = (id) => document.getElementById(id).value
// course
const database = firebase.database();
const courses =  database.ref('/courses');

const addCourse = () => {
    const autoId = courses.push().key;
    courses.child(autoId).set({
        course_name: byId('courseName'),
        course_price: byId('coursePrice'),
        course_logo: byId('courseLogo'),
        course_description: byId('courseDescription'),
        course_duration: byId('courseDuration')
    })
};

document.getElementById('addCourse').addEventListener('click', addCourse);
// 

const deleteCourse= (id) => {
    courses.child(id).remove()

}

(function() {
    const courseList = document.getElementById('courseList');
    courses.orderByKey().on('value', data => {
        courseList.innerHTML = '';
        Object.entries(data.val()).map((data) => {

            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');
            const img = document.createElement('img');
            const button = document.createElement('button');
            const span = document.createElement('span');
            h2.innerHTML = data[1].course_name;
            p.innerHTML = data[1].course_description;
            img.src = data[1].course_logo;
            span.innerHTML = data[1].course_price;
            button.innerHTML = 'delete';
            div.appendChild(h2);
            div.appendChild(p);
            div.appendChild(span);
            div.appendChild(img);
            div.appendChild(button);
            courseList.appendChild(div);

            button.addEventListener('click', () => {
                deleteCourse(data[0])
            })
        })
    })
})()




