/**
 * Update employee comment for givern ids
 * @param {number} commentId 
 * @param {number} employeeId 
 * @returns 
 */
function updateComment(commentId, employeeId) {
    return $.ajax({
        method: "put",
        url: `/comments/${employeeId}/${commentId}`,
        contentType: "application/json",
        cache: false,
        error: (error) => {
            console.error(error);
        },
    });
}

/**
 * Delete employee comment by given ids
 * @param {number} commentId 
 * @param {number} employeeId 
 * @returns 
 */
function deleteComment(commentId, employeeId) {
    return $.ajax({
        method: "delete",
        url: `/comments/${employeeId}/${commentId}`,
        contentType: "application/json",
        cache: false,
        success: () => {
            location.reload();
        },
        error: (error) => {
            console.error(error);
        },
    });
}

/**
 * Get search text from element and redirect to search page with proper search query string
 */
function searchEmployees() {
    const searchText = document.getElementById('searchText').value;
    window.location = `/search?text=${searchText}`;
}