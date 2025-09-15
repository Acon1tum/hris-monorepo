// Simple test script to verify user management API
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api/admin/users';

async function testUserAPI() {
  console.log('🧪 Testing User Management API...\n');

  try {
    // Test 1: Get all users
    console.log('1. Testing GET /users');
    const getUsersResponse = await axios.get(API_BASE_URL);
    console.log('✅ GET /users - Status:', getUsersResponse.status);
    console.log('   Response:', JSON.stringify(getUsersResponse.data, null, 2));
    console.log('');

    // Test 2: Create a new user
    console.log('2. Testing POST /users');
    const newUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      role: 'Employee'
    };
    
    const createUserResponse = await axios.post(API_BASE_URL, newUser);
    console.log('✅ POST /users - Status:', createUserResponse.status);
    console.log('   Created User:', JSON.stringify(createUserResponse.data, null, 2));
    console.log('');

    const createdUserId = createUserResponse.data.data.id;

    // Test 3: Get user by ID
    console.log('3. Testing GET /users/:id');
    const getUserResponse = await axios.get(`${API_BASE_URL}/${createdUserId}`);
    console.log('✅ GET /users/:id - Status:', getUserResponse.status);
    console.log('   User Details:', JSON.stringify(getUserResponse.data, null, 2));
    console.log('');

    // Test 4: Update user
    console.log('4. Testing PUT /users/:id');
    const updateData = {
      username: 'updateduser',
      email: 'updated@example.com',
      role: 'Manager'
    };
    
    const updateUserResponse = await axios.put(`${API_BASE_URL}/${createdUserId}`, updateData);
    console.log('✅ PUT /users/:id - Status:', updateUserResponse.status);
    console.log('   Updated User:', JSON.stringify(updateUserResponse.data, null, 2));
    console.log('');

    // Test 5: Toggle user status
    console.log('5. Testing PATCH /users/:id/toggle-status');
    const toggleResponse = await axios.patch(`${API_BASE_URL}/${createdUserId}/toggle-status`);
    console.log('✅ PATCH /users/:id/toggle-status - Status:', toggleResponse.status);
    console.log('   Toggled User:', JSON.stringify(toggleResponse.data, null, 2));
    console.log('');

    // Test 6: Delete user
    console.log('6. Testing DELETE /users/:id');
    const deleteUserResponse = await axios.delete(`${API_BASE_URL}/${createdUserId}`);
    console.log('✅ DELETE /users/:id - Status:', deleteUserResponse.status);
    console.log('   Delete Response:', JSON.stringify(deleteUserResponse.data, null, 2));
    console.log('');

    console.log('🎉 All tests passed! User Management API is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Run the test
testUserAPI();
