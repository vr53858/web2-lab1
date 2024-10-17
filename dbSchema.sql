CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- UUID as the primary key
    vatin VARCHAR(50) NOT NULL,                    -- OIB
    first_name VARCHAR(100) NOT NULL,              -- First name of the ticket holder
    last_name VARCHAR(100) NOT NULL,                -- Last name of the ticket holder
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Store the creation timestamp
);