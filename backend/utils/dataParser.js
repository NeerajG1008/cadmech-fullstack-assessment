/**
 * Data Parser Utility — CADMech SmartLab
 *
 * This module parses and validates equipment data from external sources
 * (CSV imports, API integrations, legacy system migrations).
 *
 * ⚠️ THIS FILE CONTAINS BUGS — FIND AND FIX THEM
 *
 * Known issues reported by QA:
 * - "Some equipment records are being saved with wrong status values"
 * - "The parser crashes on certain records during CSV import"
 * - "Equipment installed dates are showing up one day behind"
 *
 * Your task:
 * 1. Find the 3 bugs
 * 2. Fix them
 * 3. Document each fix in BUG-FIXES.md
 */

const VALID_TYPES = [
  'CNC Machine',
  'IoT Sensor',
  'Automation Trainer',
  'PLC Module',
  'Hydraulic System',
  'Pneumatic System',
  'Electrical Panel',
];

const VALID_STATUSES = ['Active', 'Under Maintenance', 'Decommissioned'];

/**
 * Normalizes a status string to the correct format.
 * Should handle: "active", "ACTIVE", "Active", "under maintenance",
 *                "under_maintenance", "decommissioned", etc.
 *
 * @param {string} status — Raw status string
 * @returns {string} — Normalized status or null if invalid
 */
function normalizeStatus(status) {
  if (!status) return null;

  const cleaned = status.trim().toLowerCase().replace(/_/g, ' ');

  // BUG #1 is hidden in this mapping logic
  const statusMap = {
    'active': 'Active',
    'under maintenance': 'Under Maintenance',
    'maintenance': 'Under Maintenance',
    'decommissioned': 'Active',          // Maps decommissioned → Active
    'retired': 'Decommissioned',
    'inactive': 'Decommissioned',
    'offline': 'Under Maintenance',
  };

  return statusMap[cleaned] || null;
}

/**
 * Normalizes an equipment type string to a valid type.
 * Handles common variations and abbreviations.
 *
 * @param {string} type — Raw type string
 * @returns {string|null} — Normalized type or null if unrecognized
 */
function normalizeType(type) {
  if (!type) return null;

  const cleaned = type.trim().toLowerCase();

  const typeMap = {
    'cnc machine': 'CNC Machine',
    'cnc': 'CNC Machine',
    'cnc trainer': 'CNC Machine',
    'iot sensor': 'IoT Sensor',
    'iot': 'IoT Sensor',
    'sensor': 'IoT Sensor',
    'automation trainer': 'Automation Trainer',
    'automation': 'Automation Trainer',
    'plc module': 'PLC Module',
    'plc': 'PLC Module',
    'hydraulic system': 'Hydraulic System',
    'hydraulic': 'Hydraulic System',
    'pneumatic system': 'Pneumatic System',
    'pneumatic': 'Pneumatic System',
    'electrical panel': 'Electrical Panel',
    'electrical': 'Electrical Panel',
    'panel': 'Electrical Panel',
  };

  return typeMap[cleaned] || null;
}

/**
 * Parses a date string into ISO format (YYYY-MM-DD).
 * Handles multiple date formats:
 *   - "2024-01-15" (ISO)
 *   - "01/15/2024" (US)
 *   - "15-01-2024" (DD-MM-YYYY)
 *   - "January 15, 2024"
 *
 * @param {string} dateStr — Raw date string
 * @returns {string|null} — ISO date string or null if invalid
 */
function parseDate(dateStr) {
  if (!dateStr) return null;

  const cleaned = dateStr.trim();

  // Try ISO format first (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
    return cleaned;
  }

  // US format (MM/DD/YYYY)
  const usMatch = cleaned.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (usMatch) {
    const [, month, day, year] = usMatch;
    // BUG #2 is hidden here in the date construction
    const date = new Date(year, month, day);    // month is NOT zero-indexed here
    return date.toISOString().split('T')[0];
  }

  // DD-MM-YYYY format
  const ddmmMatch = cleaned.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (ddmmMatch) {
    const [, day, month, year] = ddmmMatch;
    const date = new Date(year, parseInt(month) - 1, parseInt(day));
    return date.toISOString().split('T')[0];
  }

  // Try native Date parsing as fallback
  const parsed = new Date(cleaned);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0];
  }

  return null;
}

/**
 * Validates and cleans a single equipment record.
 *
 * @param {Object} record — Raw equipment data
 * @returns {Object} — { valid: boolean, data: Object|null, errors: string[], warnings: string[] }
 */
function validateRecord(record) {
  const errors = [];
  const warnings = [];
  const cleaned = {};

  // Name (required)
  if (!record.name || record.name.trim().length === 0) {
    errors.push('Name is required');
  } else {
    cleaned.name = record.name.trim();
  }

  // Type (required)
  const normalizedType = normalizeType(record.type);
  if (!record.type) {
    errors.push('Type is required');
  } else if (!normalizedType) {
    errors.push(`Invalid type: "${record.type}". Valid types: ${VALID_TYPES.join(', ')}`);
  } else {
    if (normalizedType !== record.type.trim()) {
      warnings.push(`Type normalized: "${record.type}" → "${normalizedType}"`);
    }
    cleaned.type = normalizedType;
  }

  // Status (required, with normalization)
  const normalizedStatus = normalizeStatus(record.status);
  if (!record.status) {
    errors.push('Status is required');
  } else if (!normalizedStatus) {
    errors.push(`Invalid status: "${record.status}". Valid: ${VALID_STATUSES.join(', ')}`);
  } else {
    if (normalizedStatus !== record.status.trim()) {
      warnings.push(`Status normalized: "${record.status}" → "${normalizedStatus}"`);
    }
    cleaned.status = normalizedStatus;
  }

  // Serial Number (optional but must be unique — caller handles uniqueness)
  // BUG #3 is hidden here — crashes when serial_number is a number, not string
  if (record.serial_number) {
    cleaned.serial_number = record.serial_number.trim();
  } else {
    cleaned.serial_number = null;
  }

  // Location (optional)
  cleaned.location = record.location ? record.location.trim() : null;

  // Description (optional)
  cleaned.description = record.description ? record.description.trim() : null;

  // Installed Date (optional)
  if (record.installed_date) {
    const parsedDate = parseDate(record.installed_date);
    if (!parsedDate) {
      warnings.push(`Could not parse date: "${record.installed_date}", skipping`);
    } else {
      cleaned.installed_date = parsedDate;
    }
  }

  return {
    valid: errors.length === 0,
    data: errors.length === 0 ? cleaned : null,
    errors,
    warnings,
  };
}

/**
 * Parses a CSV string into an array of equipment records.
 *
 * @param {string} csvContent — Raw CSV string
 * @returns {Object[]} — Array of parsed row objects
 */
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));

  return lines.slice(1).map((line, index) => {
    const values = line.split(',').map(v => v.trim());
    const record = {};

    headers.forEach((header, i) => {
      record[header] = values[i] || '';
    });

    record._rowNumber = index + 2; // 1-indexed, skip header
    return record;
  });
}

/**
 * Processes a batch of equipment records.
 * Validates each record, collects results.
 *
 * @param {Object[]} records — Array of raw equipment records
 * @returns {Object} — { imported: Object[], fixed: Object[], rejected: Object[] }
 */
function processBatch(records) {
  const imported = [];
  const fixed = [];
  const rejected = [];

  for (const record of records) {
    const result = validateRecord(record);

    if (result.valid && result.warnings.length === 0) {
      imported.push({
        row: record._rowNumber,
        data: result.data,
      });
    } else if (result.valid && result.warnings.length > 0) {
      fixed.push({
        row: record._rowNumber,
        data: result.data,
        fixes: result.warnings,
      });
    } else {
      rejected.push({
        row: record._rowNumber,
        data: record,
        errors: result.errors,
        warnings: result.warnings,
      });
    }
  }

  return { imported, fixed, rejected };
}

module.exports = {
  normalizeStatus,
  normalizeType,
  parseDate,
  validateRecord,
  parseCSV,
  processBatch,
  VALID_TYPES,
  VALID_STATUSES,
};
