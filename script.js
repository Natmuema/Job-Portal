const sortBtns = document.querySelectorAll(".job-id > *")
const sortItems = document.querySelectorAll(".jobs-container > *")

sortBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        sortBtns.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");

        const targetData = btn.getAttribute("data-target");
        sortItems.forEach((item) => {
            item.classList.add("delete");
            if (item.getAttribute("data-item") === targetData || targetData === "all"){
                item.classList.remove("delete");

            }

        })
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const signInBtn = document.querySelector("#sign-in-btn");
    const signUpBtn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");
  
    // Toggle Between Sign-In and Sign-Up
    signUpBtn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });
  
    signInBtn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  
    // Forms
    const signUpForm = document.querySelector(".sign-up-form");
    const signInForm = document.querySelector(".sign-in-form");
  
    // Sign-Up Form Submission
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const username = document.querySelector("#signup-username").value.trim();
      const email = document.querySelector("#signup-email").value.trim();
      const password = document.querySelector("#signup-password").value;
      const confirmPassword = document.querySelector("#confirm-password").value;
  
      if (!username || !email || !password || !confirmPassword) {
        alert("Please fill out all fields.");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
  
      // Save User to db.json
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to save user.");
          return response.json();
        })
        .then(() => {
          alert("Sign-Up Successful! Please log in.");
          container.classList.remove("sign-up-mode"); // Switch to Sign-In Mode
        })
        .catch((error) => {
          console.error("Error during sign-up:", error);
          alert("An error occurred. Please try again.");
        });
    });
  
    // Sign-In Form Submission
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const username = document.querySelector("#login-username").value.trim();
      const password = document.querySelector("#login-password").value;
  
      if (!username || !password) {
        alert("Please enter both username and password.");
        return;
      }
  
      // Verify User Credentials
      fetch(`http://localhost:3000/users?username=${username}&password=${password}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch users.");
          return response.json();
        })
        .then((users) => {
          if (users.length > 0) {
            alert("Login Successful!");
            window.location.href = "/index.html"; // Redirect to Home Page
          } else {
            alert("Invalid Username or Password.");
          }
        })
        .catch((error) => {
          console.error("Error during sign-in:", error);
          alert("An error occurred. Please try again.");
        });
    });
  });
  
  
  