const form = document.getElementById('signupForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const address = document.getElementById('address').value;
  const telephone = document.getElementById("telephone").value;
  const birthday = document.getElementById("birthday").value;
  const sex = document.getElementById("sex").value;
  const maritalStatus = document.getElementById("maritalStatus").value;
  const dateRegistered = document.getElementById("dateRegistered").value;

  const data = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    telephone: telephone,
    birthday: birthday,
    sex: sex,
    maritalStatus: maritalStatus,
    dateRegistered: dateRegistered,
  };

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error registering patient: ${response.statusText}`);
    }

    console.log('Patient registration successful!');
   
  } catch (error) {
    console.error('Error:', error);
    
  }
});
