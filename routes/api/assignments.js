const router = require("express").Router();
const axios = require("axios");

router.route("/")
    .get(async function(req, res){
        const token = process.env.CANVAS_TOKEN;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const coursesUrl = "https://umd.instructure.com/api/v1/courses/";
        const { data: couresData, status: status } = await axios.get(coursesUrl, config);
        //console.log(couresData);
        //console.log(status);
        if(!couresData){
            res.status(404).send();
        } else {
            console.log(`Getting assignements for ${couresData.length} courses`)
            const getAssignmentsForCourse = async (courseId) => {
                const assignmentsUrl = `https://umd.instructure.com/api/v1/courses/${courseId}/assignments?per_page=100`
                const { data: assignmentsData } = await axios.get(assignmentsUrl, config);
                return assignmentsData;
            }
            // get assignments for each course...
            let assignmentsData = await couresData.flatMap(async (course) => {
                let assignments = await getAssignmentsForCourse(course.id)
                return assignments;
            });
            //console.log(assignmentsData.length);
            //res.json(assignmentsData);
            Promise.all(assignmentsData).then(assignmentsByCourse => {
                function flattenArrayOfObjects(arrays) {
                    return arrays.reduce((acc, currentArray) => acc.concat(currentArray), []);
                }
                function getCourseById(courseId) {
                    console.log(`Getting course: ${courseId}`)
                    return couresData.find(course => course.id === courseId)
                }
                let assignments = flattenArrayOfObjects(assignmentsByCourse);
                let assignmentsWithCourse = assignments.map(assignment => {
                    assignment.course = getCourseById(assignment.course_id);
                    return assignment;
                })
                console.log(assignmentsWithCourse.length);
                res.json(assignmentsWithCourse);
            })
            .catch(error => {
                console.error(error);
                res.status(400).json(error);
            })            
        }
    });

router.route("/course/:id")
    .get(async function(req, res){
        const token = process.env.CANVAS_TOKEN;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const assignmentsUrl = `https://umd.instructure.com/api/v1/courses/${req.params.id}/assignments?per_page=100`
        const { data: assignmentsData } = await axios.get(assignmentsUrl, config);

        if(!assignmentsData){
            res.status(404).send();
        } else {
            res.json(assignmentsData);
        }     
    });

router.route("/:assignmentId/course/:courseId")
    .get(async function(req, res){
        const token = process.env.CANVAS_TOKEN;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const assignmentsUrl = `https://umd.instructure.com/api/v1/courses/${req.params.courseId}/assignments/${req.params.assignmentId}`
        const { data: assignmentsData } = await axios.get(assignmentsUrl, config);

        if(!assignmentsData){
            res.status(404).send();
        } else {
            res.json(assignmentsData);
        }     
    });

module.exports = router;