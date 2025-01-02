CREATE TABLE locations (
    locationId INT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE products (
    productId INT PRIMARY KEY,
    upc BIGINT,
    custom BOOLEAN NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    size VARCHAR(50)
);

CREATE TABLE inventory (
    inventoryId INT PRIMARY KEY,
    productId INT NOT NULL,
    locationId INT NOT NULL,
    added DATE NOT NULL,
    expiration DATE NOT NULL,
    removed DATE,
    FOREIGN KEY (productId) REFERENCES products(productId),
    FOREIGN KEY (locationId) REFERENCES locations(locationId)
);
