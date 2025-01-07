CREATE TABLE "locations" (
    "locationId" INTEGER NOT NULL UNIQUE,
    "name" VARCHAR(255),
    PRIMARY KEY("locationId" AUTOINCREMENT)
);

CREATE TABLE "products" (
	"productId"	INTEGER NOT NULL UNIQUE,
	"upc"	BIGINT,
	"custom"	BOOLEAN NOT NULL,
	"name"	VARCHAR(255) NOT NULL,
	"description"	TEXT,
	"size"	VARCHAR(50),
	PRIMARY KEY("productId" AUTOINCREMENT)
);

CREATE TABLE "inventory" ( 
    "inventoryId" INTEGER NOT NULL UNIQUE,
    "productId" INT NOT NULL,
    "locationId" INT NOT NULL,
    "added" DATE NOT NULL,
    "expiration" DATE NOT NULL,
    "removed" DATE,
    PRIMARY KEY("inventoryId" AUTOINCREMENT),
    FOREIGN KEY("locationId") REFERENCES "locations"("locationId"),
    FOREIGN KEY("productId") REFERENCES "products"("productId")
);