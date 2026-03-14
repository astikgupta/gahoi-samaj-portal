(async () => {
    try {
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'test1@example.com', password: 'password123' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        
        const res = await fetch('http://localhost:5000/api/matrimonial', { 
            headers: { Authorization: 'Bearer ' + token }
        });
        const data = await res.json();
        console.log('PROFILES:', JSON.stringify(data, null, 2));
    } catch(err) {
        console.error(err.message);
    }
})();
