document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const button = this.querySelector('.btn');
    button.classList.add('loading');

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}&_embed=employee`);
        const users = await response.json();

        if (users.length > 0) {
            const user = users[0];
            const employee = user.employee;

            if (employee) {
                const loggedInUser = {
                    username: user.username,
                    employeeId: employee.employeeId,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    role: user.role
                };

                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                if (user.role == 'Admin') {
                    window.location.href = '/Admin';
                }
                else if (user.role == 'Employee') {
                    window.location.href = '/Employee/leaveRequest';
                }
                else if (user.role == 'Manager' || 'CEO') {
                    window.location.href = '/Manager/leaveRequest';
                }
                
                // window.location.href = 'leaves/managerLeaveManagement.html';
            } else {
                alert('Employee data not found.');
            }
        } else {
            alert('Invalid username or password.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in.');
    } finally {
        button.classList.remove('loading');
    }
});
