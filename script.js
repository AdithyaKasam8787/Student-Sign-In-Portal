document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");
    const list = document.getElementById("record-list");
  
    if (form) {
      form.addEventListener("submit", event => {
        event.preventDefault();
  
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
  
        if (!name || !email || !password) {
          alert("Please fill in all fields.");
          return;
        }
  
        const data = { name, email, password };
        let records = JSON.parse(localStorage.getItem("signUpRecords")) || [];
        records.push(data);
        localStorage.setItem("signUpRecords", JSON.stringify(records));
  
        document.getElementById("preview-data").innerHTML = `
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Password:</strong> ${'*'.repeat(password.length)}</li>
        `;
        document.getElementById("preview-modal").style.display = "flex";
  
        form.reset();
      });
    }
  
    if (list) {
      const records = JSON.parse(localStorage.getItem("signUpRecords")) || [];
  
      if (records.length === 0) {
        list.innerHTML = "<li>No sign-up records found.</li>";
      } else {
        records.forEach((record, index) => {
          list.innerHTML += `
            <li>
              <strong>Record ${index + 1}</strong><br>
              Name: ${record.name}<br>
              Email: ${record.email}<br>
              Password: ${'*'.repeat(record.password.length)}
            </li><br>
          `;
        });
      }
  
      const clearBtn = document.getElementById("clear-records-btn");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          if (confirm("Are you sure you want to clear all records?")) {
            localStorage.removeItem("signUpRecords");
            list.innerHTML = "<li>No sign-up records found.</li>";
          }
        });
      }
    }
  });
  