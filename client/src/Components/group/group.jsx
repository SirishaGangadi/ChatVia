import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './group.css';
export function GroupForm() {
  const [formData, setFormData] = useState({
    name: "",
    members: [],
    description: ""
  });
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function fetchContactUsers() {
      try {
        const res = await axios.get("http://localhost:5000/user");
        setAllUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchContactUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add members
  const handleAddMember = (contact) => {
    const updatedMembers = [...formData.members, contact];
    setFormData({
      ...formData,
      members: updatedMembers
    });
  };

  // Remove members
  const handleRemoveMember = (contact) => {
    const updatedMembers = formData.members.filter(member => member._id !== contact._id);
    setFormData({
      ...formData,
      members: updatedMembers
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/group", formData);
      navigate("/home")
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f9',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px 40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h2 style={{
          marginBottom: '20px',
          color: '#333'
        }}>Create New Group</h2>
        <form >
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }} htmlFor="name">Group Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              placeholder="Enter Group Name"
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }} htmlFor="groupMembers">Group Members</label>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {formData.members.map(member => (
                <div key={member._id} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '5px' }}> ({member.email})</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member)}
                    style={{ backgroundColor: '#d9534f', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '10px' }}>
              <select
                id="contactsDropdown"
                onChange={(e) => handleAddMember(JSON.parse(e.target.value))}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              >
                <option value="">Select Contact to Add</option>
                {allUsers.map(contact => (
                  <option key={contact._id} value={JSON.stringify(contact)}>
                    {contact._id} ({contact.email})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }} htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', resize: 'vertical', height: '100px' }}
              placeholder="Enter Description"
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <button onClick={handleSubmit} type="submit" style={{ backgroundColor: '#5cb85c', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Create Group</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GroupForm;
