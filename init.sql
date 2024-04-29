-- Create accounts table
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    account VARCHAR(255) NOT NULL
);

-- Create transactions table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    account_id INTEGER REFERENCES accounts(id),
    pool_id UUID,
    transfer_id UUID,
    created TIMESTAMP WITH TIME ZONE,
    amount NUMERIC,
    action VARCHAR(10) CHECK (action IN ('credit', 'debit', 'burn'))
);

-- Create account_balances table
CREATE TABLE account_balances (
    id SERIAL PRIMARY KEY,
    account_id INTEGER REFERENCES accounts(id),
    pool_id UUID,
    balance NUMERIC,
    UNIQUE (account_id, pool_id)
);

-- Create teams table
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    city VARCHAR(50),
    name VARCHAR(100),
    image VARCHAR(100)
);

-- Create games table
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    away_team_id INTEGER REFERENCES teams(id),
    home_team_id INTEGER REFERENCES teams(id),
    away_money_line INTEGER,
    home_money_line INTEGER,
    away_score INTEGER CHECK (away_score >= 0),
    home_score INTEGER CHECK (home_score >= 0),
    started BOOLEAN DEFAULT false,
    finished BOOLEAN DEFAULT false,
    game_time TIMESTAMP,
    on_contract BOOLEAN DEFAULT false
);

-- Create bets table
CREATE TABLE bets (
    id SERIAL PRIMARY KEY,
    contract_id INTEGER,
    account_id INTEGER REFERENCES accounts(id),
    game_id INTEGER REFERENCES games(id),
    team_id INTEGER REFERENCES teams(id),
    amount BIGINT,
    paid BOOLEAN DEFAULT false
);

-- Insert initial team
INSERT INTO teams (city, name, image) VALUES
    ('Arizona', 'Diamondbacks', '109.svg'),
    ('Atlanta', 'Braves', '144.svg'),
    ('Baltimore', 'Orioles', '110.svg'),
    ('Boston', 'Red Sox', '111.svg'),
    ('Chicago', 'Cubs', '112.svg'),
    ('Chicago', 'White Sox', '145.svg'),
    ('Cincinnati', 'Reds', '113.svg'),
    ('Cleveland', 'Guardians', '114.svg'),
    ('Colorado', 'Rockies', '115.svg'),
    ('Detroit', 'Tigers', '116.svg'),
    ('Houston', 'Astros', '117.svg'),
    ('Kansas City', 'Royals', '118.svg'),
    ('Los Angeles', 'Angels', '108.svg'),
    ('Los Angeles', 'Dodgers', '119.svg'),
    ('Miami', 'Marlins', '146.svg'),
    ('Milwaukee', 'Brewers', '158.svg'),
    ('Minnesota', 'Twins', '142.svg'),
    ('New York', 'Mets', '121.svg'),
    ('New York', 'Yankees', '147.svg'),
    ('Oakland', 'Athletics', '133.svg'),
    ('Philadelphia', 'Phillies', '143.svg'),
    ('Pittsburgh', 'Pirates', '134.svg'),
    ('San Diego', 'Padres', '135.svg'),
    ('San Francisco', 'Giants', '137.svg'),
    ('Seattle', 'Mariners', '136.svg'),
    ('St. Louis', 'Cardinals', '138.svg'),
    ('Tampa Bay', 'Rays', '139.svg'),
    ('Texas', 'Rangers', '140.svg'),
    ('Toronto', 'Blue Jays', '141.svg'),
    ('Washington', 'Nationals', '120.svg');

-- Insert game data
INSERT INTO games (away_team_id, home_team_id, away_money_line, home_money_line, game_time) VALUES
    (4, 8, -156, 132, '2024-04-23 13:15:00'), -- "2024-04-23", "CLE 4, BOS 1"
    (21, 7, 198, -240, '2024-04-23 15:45:00'), -- "2024-04-23", "CIN 8, PHI 1"
    (16, 22, -104, 176, '2024-04-23 16:07:00'), -- "2024-04-23", "PIT 2, MIL 1"
    (13, 30, -250, 205, '2024-04-23 18:10:00'), -- "2024-04-23", "LAD 4, WSH 1"
    (10, 27, -132, 112, '2024-04-23 18:40:00'), -- "2024-04-23", "DET 4, TB 2"
    (20, 19, -120, 102, '2024-04-23 18:45:00'), -- "2024-04-23", "NYY 4, OAK 3"
    (15, 2, 156, -132, '2024-04-23 18:50:00'), -- "2024-04-23", "ATL 5, MIA 0"
    (11, 5, -198, 240, '2024-04-23 19:05:00'), -- "2024-04-23", "CHC 7, HOU 2"
    (29, 12, 104, -176, '2024-04-23 19:20:00'), -- "2024-04-23", "KC 3, TOR 2"
    (6, 17, 250, -205, '2024-04-23 19:40:00'), -- "2024-04-23", "MIN 6, CWS 5"
    (1, 26, 132, -112, '2024-04-23 19:40:00'), -- "2024-04-23", "AZ 14, STL 1"
    (25, 28, 120, -102, '2024-04-23 19:40:00'), -- "2024-04-23", "SEA 4, TEX 0"
    (23, 9, -156, 132, '2024-04-24 20:05:00'), -- "2024-04-23", "LIVE"
    (3, 13, 198, -240, '2024-04-24 20:05:00'), -- "2024-04-23", "LIVE"
    (18, 24, -104, 176, '2024-04-24 20:40:00'), -- "2024-04-23", "LIVE"
    (1, 26, -250, 205, '2024-04-24 13:15:00'), -- "2024-04-24", "1:15 PM ET"
    (18, 24, -112, 176, '2024-04-24 15:45:00'), -- "2024-04-24", "3:45 PM ET"
    (3, 13, -132, 198, '2024-04-24 16:07:00'), -- "2024-04-24", "4:07 PM ET"
    (4, 8, 203, -176, '2024-04-24 18:10:00'), -- "2024-04-24", "6:10 PM ET"
    (21, 7, -145, 194, '2024-04-24 18:40:00'), -- "2024-04-24", "6:40 PM ET"
    (16, 22, -275, 135, '2024-04-24 18:40:00'), -- "2024-04-24", "6:40 PM ET"
    (13, 30, 199, -178, '2024-04-24 18:45:00'), -- "2024-04-24", "6:45 PM ET"
    (10, 27, -178, 255, '2024-04-24 18:50:00'), -- "2024-04-24", "6:50 PM ET"
    (20, 19, -188, 157, '2024-04-24 19:05:00'), -- "2024-04-24", "7:05 PM ET"
    (15, 2, 238, -152, '2024-04-24 19:20:00'), -- "2024-04-24", "7:20 PM ET"
    (11, 5, -128, 173, '2024-04-24 19:40:00'), -- "2024-04-24", "7:40 PM ET"
    (29, 12, -239, 304, '2024-04-24 19:40:00'), -- "2024-04-24", "7:40 PM ET"
    (6, 17, 193, -164, '2024-04-24 19:40:00'), -- "2024-04-24", "7:40 PM ET"
    (25, 28, -205, 178, '2024-04-24 20:05:00'), -- "2024-04-24", "8:05 PM ET"
    (23, 9, -203, 176, '2024-04-24 20:40:00'), -- "2024-04-24", "8:40 PM ET"
    (16, 22, 104, -198, '2024-04-25 12:35:00'), -- "2024-04-25", "12:35 PM ET"
    (4, 8, 188, -157, '2024-04-25 13:10:00'), -- "2024-04-25", "1:10 PM ET"
    (21, 7, -238, 152, '2024-04-25 13:10:00'), -- "2024-04-25", "1:10 PM ET"
    (6, 17, -132, 198, '2024-04-25 13:10:00'), -- "2024-04-25", "1:10 PM ET"
    (29, 12, 275, -135, '2024-04-25 14:10:00'), -- "2024-04-25", "2:10 PM ET"
    (11, 5, -120, 102, '2024-04-25 14:20:00'), -- "2024-04-25", "2:20 PM ET"
    (25, 28, -156, 132, '2024-04-25 14:35:00'), -- "2024-04-25", "2:35 PM ET"
    (23, 9, 154, -304, '2024-04-25 15:10:00'), -- "2024-04-25", "3:10 PM ET"
    (13, 30, 145, -199, '2024-04-25 16:05:00'), -- "2024-04-25", "4:05 PM ET"
    (20, 19, -152, 238, '2024-04-25 19:05:00'); -- "2024-04-25", "7:05 PM ET"
