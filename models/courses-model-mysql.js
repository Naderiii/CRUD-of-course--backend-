const pool = require('../utilities/mysql_database');

class CoursesModel {

    // Get all courses
    static getCourses = async () => {
        const [result] = await pool.query("SELECT * FROM course");
        return result;
    };

    // Get a single course by ID
    static getCourse = async (id) => {
        const [result] = await pool.query("SELECT * FROM course WHERE id = ?", [id]);
        return result[0];
    };

    // Insert a new course
    static insertCourse = async (title) => {
        const [result] = await pool.query("INSERT INTO course (title) VALUES (?)", [title]);
        // Use 'this' to call the static method getCourse
        return this.getCourse(result.insertId);
    };

    // Update an existing course by ID
    static updateCourse = async (id, title) => {
        await pool.query("UPDATE course SET title = ? WHERE id = ?", [title, id]);
        // Use 'this' to call the static method getCourse
        return this.getCourse(id);
    };

    // Delete a course by ID
    static deleteCourse = async (id) => {
        await pool.query("DELETE FROM course WHERE id = ?", [id]);
        return id;
    };

    // Call a stored procedure
    static callStoredProcedure = async (id) => {
        const [result] = await pool.query('CALL sp_select (?)', [id]);
        return result[0];
    };
}

module.exports = CoursesModel;
