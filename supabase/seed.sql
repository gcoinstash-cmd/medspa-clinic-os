INSERT INTO treatments (name, anatomical_zone, base_price, downtime_hours, dosage_units) VALUES
('Upper Face Neurotoxin Smooth', 'upper', 650.00, 4, '50 Units Botox'),
('Mid-Face Structural High-Cheek Volumization', 'mid', 1400.00, 48, '2 Syringes Voluma'),
('Tear Trough PRF & Under-Eye Rejuvenation', 'mid', 950.00, 48, 'Autologous PRF Matrix'),
('Bespoke Russian Lip Sculpt', 'lower', 850.00, 48, '1.0mL Kysse'),
('Masseter Slimming & Bruxism Relief', 'lower', 750.00, 0, '50 Units Dysport'),
('Morpheus8 Burst RF Microneedling', 'laser', 1250.00, 72, 'Subdermal RF Remodeling')
ON CONFLICT DO NOTHING;

INSERT INTO practitioner_schedules (practitioner_name, medical_credential, consult_fee) VALUES
('Dr. Aria Vance, M.D.', 'Double Board-Certified Facial Plastic Surgeon', 350.00),
('Nicole Sterling, RN, CANS', 'Master Aesthetic Injector & Clinical Faculty', 150.00)
ON CONFLICT DO NOTHING;
