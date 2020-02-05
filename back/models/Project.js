/* eslint-disable quotes */

const connection = require('../db/config');

const Project = {};


// Project.getCinemaCategory = (cb) => {
// 	const q = `
// 	SELECT p.id AS id, p.title AS title, p.year AS year, s.name AS subcategory, i.url AS imgurl FROM project p JOIN subcategory s ON p.subcategory_id=s.id JOIN project_img i ON p.id=i.project_id WHERE p.category_id=1 AND p.main_img_id = i.id ORDER BY year DESC lIMIT 11
// 	`;
// 	connection.query(q, (err, results) => {
// 		cb(err, results);
// 	});
// };



module.exports = Project;