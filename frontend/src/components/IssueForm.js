import React, { useState, useEffect } from 'react';
import { issueService } from '../services/api';

const IssueForm = ({ data, onClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    line: '',
    machine: '',
    problem: '',
    status: 'Pending',
    reportedBy: '',
    resolvedTime: '-',
    deadline: ''
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data) {
        await issueService.update(data.id, formData);
      } else {
        await issueService.create(formData);
      }
      alert('Issue saved successfully!');
      onClose();
    } catch (error) {
      console.error('Error saving issue:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Failed to save issue'}`);
      } else {
        alert('Error: Unable to connect to server');
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{data ? 'Edit Issue' : 'Add Issue'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Line</label>
              <input type="text" name="line" value={formData.line} onChange={handleChange} placeholder="e.g., Line A" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Machine</label>
              <input type="text" name="machine" value={formData.machine} onChange={handleChange} placeholder="e.g., Machine 01" required />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Problem Description</label>
            <textarea name="problem" value={formData.problem} onChange={handleChange} rows="3" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Reported By</label>
              <input type="text" name="reportedBy" value={formData.reportedBy} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Resolved Time</label>
            <input type="text" name="resolvedTime" value={formData.resolvedTime} onChange={handleChange} placeholder="e.g., 2 hours or -" />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Save</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueForm;
