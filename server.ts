/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { dbStore } from './src/backendStore.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // --- API Routes ---
  
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Get departments
  app.get('/api/departments', (req, res) => {
    res.json(dbStore.getDepartments());
  });

  // Get academic programs
  app.get('/api/programs', (req, res) => {
    res.json(dbStore.getPrograms());
  });

  // Get university metrics
  app.get('/api/stats', (req, res) => {
    res.json(dbStore.getStats());
  });

  // Get placement statistics/records
  app.get('/api/placements', (req, res) => {
    res.json(dbStore.getPlacements());
  });

  // List all admissions applications
  app.get('/api/applications', (req, res) => {
    res.json(dbStore.getApplications());
  });

  // Submit a new application
  app.post('/api/applications', (req, res) => {
    const { fullName, email, phone, programId, transcriptGPA, previousSchool, statementOfPurpose } = req.body;
    
    if (!fullName || !email || !programId || !transcriptGPA) {
      return res.status(400).json({ error: 'Missing required application fields.' });
    }

    const app = dbStore.addApplication({
      fullName,
      email,
      phone: phone || '',
      programId,
      transcriptGPA: Number(transcriptGPA),
      previousSchool: previousSchool || '',
      statementOfPurpose: statementOfPurpose || ''
    });

    res.status(201).json(app);
  });

  // Alter application status (for Admin interface workflow)
  app.patch('/api/applications/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['Pending', 'Reviewing', 'Accepted', 'Declined'].includes(status)) {
      return res.status(400).json({ error: 'Invalid or missing status value.' });
    }

    const updated = dbStore.updateApplicationStatus(id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Application not found.' });
    }

    res.json(updated);
  });

  // Delete academic submission
  app.delete('/api/applications/:id', (req, res) => {
    const { id } = req.params;
    const deleted = dbStore.deleteApplication(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Application not found.' });
    }
    res.json({ success: true, message: 'Application successfully deleted.' });
  });

  // --- Serve Static Assets ---

  if (process.env.NODE_ENV !== 'production') {
    // Development mode with Vite Dev Server Middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Full-Stack Server] App serving on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('[Startup Error] Failed to boot full-stack system:', error);
});
