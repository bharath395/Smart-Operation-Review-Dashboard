import React, { useState, useEffect } from 'react';
import { productionService } from '../services/api';

const ProductionForm = ({ data, onClose }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    line: '',
    machine: '',
    totalIssued: '',
    totalProduction: '',
    defective: '',
    oee: '',
    powerUtilize: ''
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
        await productionService.update(data.id, formData);
      } else {
        await productionService.create(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{data ? 'Edit Production Data' : 'Add Production Data'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Line</label>
              <select name="line" value={formData.line} onChange={handleChange} required>
                <option value="">Select Line</option>
                <option value="Line A">Line A</option>
                <option value="Line B">Line B</option>
                <option value="Line C">Line C</option>
                <option value="Line D">Line D</option>
                <option value="Line E">Line E</option>
                <option value="Line F">Line F</option>
              </select>
            </div>
            <div className="form-group">
              <label>Machine</label>
              <select name="machine" value={formData.machine} onChange={handleChange} required>
                <option value="">Select Machine</option>
                <option value="Machine A">Machine A</option>
                <option value="Machine B">Machine B</option>
                <option value="Machine C">Machine C</option>
                <option value="Machine D">Machine D</option>
                <option value="Machine E">Machine E</option>
                <option value="Machine F">Machine F</option>
                <option value="Machine G">Machine G</option>
                <option value="Machine H">Machine H</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Total Issued</label>
              <input type="number" name="totalIssued" value={formData.totalIssued} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Total Production</label>
              <input type="number" name="totalProduction" value={formData.totalProduction} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Defective</label>
              <input type="number" name="defective" value={formData.defective} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>OEE %</label>
              <input type="number" step="0.1" name="oee" value={formData.oee} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Power Utilize (kW)</label>
            <input type="number" step="0.1" name="powerUtilize" value={formData.powerUtilize} onChange={handleChange} required />
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

export default ProductionForm;
