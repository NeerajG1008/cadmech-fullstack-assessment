/**
 * SmartLab Equipment Manager — API Routes
 * CADMech Full Stack Assessment
 *
 * TODO: Implement all the routes below.
 *
 * Each route handler should:
 * 1. Validate input data
 * 2. Perform the database operation
 * 3. Return appropriate HTTP status codes
 * 4. Return meaningful error messages
 *
 * Refer to README.md for request/response examples.
 */

const express = require('express');
const router = express.Router();

// ─── GET /api/equipment ────────────────────────────────────
// List all equipment
// Optional query params: ?search=keyword&type=CNC Machine&status=Active
router.get('/equipment', async (req, res) => {
  try {
    // TODO: Implement — fetch all equipment from database
    // Support search, type filter, and status filter via query params

    // Example placeholder response (remove this and add your implementation):
    res.json({
      message: 'TODO: Implement GET /api/equipment',
      query: req.query,
      data: [],
    });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

// ─── GET /api/equipment/:id ────────────────────────────────
// Get a single equipment item by ID
router.get('/equipment/:id', async (req, res) => {
  try {
    // TODO: Implement — fetch single equipment by req.params.id

    res.json({
      message: 'TODO: Implement GET /api/equipment/:id',
      id: req.params.id,
    });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

// ─── POST /api/equipment ───────────────────────────────────
// Create new equipment
// Required fields: name, type, status
// Optional fields: location, serial_number, description, installed_date
router.post('/equipment', async (req, res) => {
  try {
    const { name, type, status, location, serial_number, description, installed_date } = req.body;

    // TODO: Validate required fields
    if (!name || !type || !status) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'name, type, and status are required fields',
      });
    }

    // TODO: Insert into database and return the created record

    res.status(201).json({
      message: 'TODO: Implement POST /api/equipment',
      received: req.body,
    });
  } catch (error) {
    console.error('Error creating equipment:', error);
    res.status(500).json({ error: 'Failed to create equipment' });
  }
});

// ─── PUT /api/equipment/:id ────────────────────────────────
// Update an existing equipment item
router.put('/equipment/:id', async (req, res) => {
  try {
    // TODO: Implement — update equipment by req.params.id with req.body

    res.json({
      message: 'TODO: Implement PUT /api/equipment/:id',
      id: req.params.id,
      updates: req.body,
    });
  } catch (error) {
    console.error('Error updating equipment:', error);
    res.status(500).json({ error: 'Failed to update equipment' });
  }
});

// ─── DELETE /api/equipment/:id ─────────────────────────────
// Delete an equipment item
router.delete('/equipment/:id', async (req, res) => {
  try {
    // TODO: Implement — delete equipment by req.params.id

    res.json({
      message: 'TODO: Implement DELETE /api/equipment/:id',
      id: req.params.id,
    });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
});

// ─── GET /api/stats ────────────────────────────────────────
// Get dashboard statistics
// Should return: total count, active count, maintenance count, decommissioned count
router.get('/stats', async (req, res) => {
  try {
    // TODO: Implement — query database for counts by status

    res.json({
      message: 'TODO: Implement GET /api/stats',
      stats: {
        total: 0,
        active: 0,
        underMaintenance: 0,
        decommissioned: 0,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
