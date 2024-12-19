/*
  # Community Support Application Schema

  1. New Tables
    - `faqs`: Stores predefined Q&A for the chatbot
      - `id` (uuid, primary key)
      - `question` (text)
      - `answer` (text)
      - `created_at` (timestamp)
    
    - `experiences`: Stores community shared experiences
      - `id` (uuid, primary key)
      - `content` (text)
      - `created_at` (timestamp)
    
    - `relaxation_resources`: Stores relaxation techniques and resources
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `type` (text)
      - `created_at` (timestamp)
    
    - `helpful_tips`: Stores useful suggestions
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access for all users
    - Anonymous write access for experiences table
*/

-- FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to FAQs"
  ON faqs
  FOR SELECT
  TO public
  USING (true);

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to experiences"
  ON experiences
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow anonymous write access to experiences"
  ON experiences
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Relaxation Resources Table
CREATE TABLE IF NOT EXISTS relaxation_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE relaxation_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to relaxation resources"
  ON relaxation_resources
  FOR SELECT
  TO public
  USING (true);

-- Helpful Tips Table
CREATE TABLE IF NOT EXISTS helpful_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE helpful_tips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to helpful tips"
  ON helpful_tips
  FOR SELECT
  TO public
  USING (true);

-- Insert some initial data
INSERT INTO faqs (question, answer) VALUES
  ('¿Qué debo hacer primero en caso de emergencia?', 'Mantén la calma y sigue las instrucciones de las autoridades locales. Llama al 112 para emergencias.'),
  ('¿Dónde puedo encontrar refugio?', 'Los centros de evacuación están ubicados en principales instalaciones municipales. Contacta con el ayuntamiento para más información.'),
  ('¿Cómo puedo ayudar?', 'Puedes registrarte como voluntario en el ayuntamiento o donar a través de organizaciones oficiales.');

INSERT INTO relaxation_resources (title, content, type) VALUES
  ('Respiración 4-7-8', 'Inhala por 4 segundos, mantén por 7 segundos, exhala por 8 segundos.', 'breathing'),
  ('Meditación Guiada', 'Encuentra un lugar tranquilo, siéntate cómodamente...', 'meditation'),
  ('Ejercicio de Grounding', 'Nombra 5 cosas que puedes ver, 4 que puedes tocar...', 'grounding');

INSERT INTO helpful_tips (title, content) VALUES
  ('Kit de Emergencia', 'Prepara un kit con agua, alimentos no perecederos, linterna, radio y medicamentos básicos.'),
  ('Plan Familiar', 'Establece un punto de encuentro y asegúrate de que todos conozcan los números de emergencia.'),
  ('Documentación', 'Mantén copias de documentos importantes en un lugar seguro y accesible.');