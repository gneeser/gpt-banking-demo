CREATE DATABASE IF NOT EXISTS banking;
use banking;

CREATE TABLE IF NOT EXISTS customers (
  CustomerID INTEGER PRIMARY KEY,
  FirstName VARCHAR(255) NOT NULL,
  LastName VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Address VARCHAR(255) NOT NULL,
  City VARCHAR(255) NOT NULL,
  State CHAR(2) NOT NULL,
  ZipCode VARCHAR(10) NOT NULL,
  Phone VARCHAR(15) NOT NULL
);

INSERT IGNORE INTO customers (CustomerID, FirstName, LastName, Email, Address, City, State, ZipCode, Phone)
VALUES
  (1, 'John', 'Doe', 'john.doe@example.com', '123 Main St', 'New York', 'NY', '12345', '(123) 456-7890'),
  (2, 'Jane', 'Smith', 'jane.smith@example.com', '456 Market St', 'Los Angeles', 'CA', '98765', '(987) 654-3210'),
  (3, 'Bob', 'Johnson', 'bob.johnson@example.com', '789 Market St', 'Chicago', 'IL', '54321', '(321) 654-0987');

CREATE TABLE IF NOT EXISTS accounts (
  AccountNumber INTEGER PRIMARY KEY,
  CustomerID INTEGER NOT NULL,
  AccountType VARCHAR(255) NOT NULL,
  Balance DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (CustomerID) REFERENCES customers(CustomerID)
);

INSERT IGNORE INTO accounts (AccountNumber, CustomerID, AccountType, Balance)
VALUES
  (1, 1, 'checking', 1000.00),
  (2, 1, 'savings', 5000.00),
  (3, 2, 'checking', 2000.00),
  (4, 3, 'savings', 3000.00);

CREATE TABLE IF NOT EXISTS transactions (
  TransactionID INTEGER PRIMARY KEY,
  AccountNumber INTEGER NOT NULL,
  TransactionType VARCHAR(255) NOT NULL,
  Amount DECIMAL(10, 2) NOT NULL,
  Date DATE NOT NULL,
  FOREIGN KEY (AccountNumber) REFERENCES accounts(AccountNumber)
);

INSERT IGNORE INTO transactions (TransactionID, AccountNumber, TransactionType, Amount, Date)
VALUES
  (1, 1, 'deposit', 500.00, '2022-01-01'),
  (2, 1, 'withdrawal', 250.00, '2022-01-02'),
  (3, 2, 'deposit', 1000.00, '2022-01-03'),
  (4, 3, 'withdrawal', 100.00, '2022-01-04'),
  (5, 4, 'deposit', 2000.00, '2022-01-05');




