SELECT * FROM Product;

SELECT * FROM Product WHERE price > 10000;

SELECT * FROM Product WHERE description IS NOT NULL ORDER BY title ASC;

CREATE DATABASE ProductsApplication
USE ProductsApplication

CREATE TABLE products(
product_id VARCHAR(36) NOT NULL,
title VARCHAR(255) NOT NULL,
PRIMARY KEY (product_id)
)

ALTER TABLE products ADD description VARCHAR(255)
ALTER TABLE products ADD price DECIMAL(10,2)

INSERT INTO products
(product_id, title, description, price)
VALUES
(
'88a3f826-9c3d-4f7c-a56e-156d7c3f3b28',
'Phone X',
'A sleek and powerful smartphone with the latest features.',
'8499.99'
);

INSERT INTO products (product_id, title, description, price) VALUES
('5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c', 'Nova 8i', 'A mid-range smartphone with a large display and great camera.', 11999.50),
('36239a24-f71d-4f11-a93e-506775f882e9', 'Pixel 6', 'A high-end smartphone with cutting-edge technology.', 56999.00),
('e144947e-3af7-4d3c-8327-ecf39255617d', 'Zenfone 8', 'A compact smartphone with premium features.', 25999.75),
('4f4b4f16-77cb-4c24-bcae-238cde406fb3', 'Reno6', 'A stylish smartphone with advanced camera capabilities.', 25999.50),
('34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06', 'Galaxy A52', 'A mid-range smartphone with a large battery and display.', 17999.25),
('efd82d85-8dd6-4979-bf5c-96933d9c2f7d', 'Redmi Note 11', 'A budget-friendly smartphone with a powerful processor.', 7999.00),
('6f1a6b96-6cd2-439c-a648-88b9f287f7d2', 'Moto G60', 'A reliable and durable smartphone with a long-lasting battery.', 15999.00),
('9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c', 'iPhone SE', 'A compact and affordable iPhone with great performance.', 38999.50),
('a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58', 'Galaxy Z Flip 3', 'A foldable smartphone with a unique design.', 79999.00);



CREATE TABLE images(
image_id VARCHAR(36) NOT NULL,
url TEXT NOT NULL,
product_id VARCHAR(36) NOT NULL,
PRIMARY KEY (image_id),
FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO images
(image_id, url, product_id)
VALUES
(
'2010c73e-e446-11ed-b5ea-0242ac120002',
'https://unsplash.com/photos/0VGG7cqTwCo',
'6f1a6b96-6cd2-439c-a648-88b9f287f7d2'
),
(
'2010c964-e446-11ed-b5ea-0242ac120002',
'https://unsplash.com/photos/Uae7ouMw91A',
'6f1a6b96-6cd2-439c-a648-88b9f287f7d2'
),
(
'2010cc20-e446-11ed-b5ea-0242ac120002',
'https://unsplash.com/photos/uCz5tX1P620',
'6f1a6b96-6cd2-439c-a648-88b9f287f7d2'
);

ALTER TABLE images ADD main BOOL NOT NULL;

UPDATE images SET main = 1 WHERE image_id = '2010c194-e446-11ed-b5ea-0242ac120002';

SELECT COUNT(product_id)
FROM products
WHERE

SELECT p.product_id, p.title, p.description, p.price, GROUP_CONCAT(i.url SEPARATOR ',') AS images
FROM products AS p
LEFT JOIN images AS i ON p.product_id = i.product_id
WHERE p.title LIKE '%Moto%'
GROUP BY p.product_id;

INSERT INTO images (image_id, url, product_id, main) VALUES
('ca84686e-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/leqrylJNYUQ', '5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c', 1),
('ca846b8e-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/_HB3Y1wGlxw', '5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c', 0),
('ca846df0-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/wJQPr0iQpK4', '5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c', 0),
('ca846fb2-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/nP5YBhsbqB4', '5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c', 0),

('708886dc-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/52H5Nfi5WiE', 'a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58', 1),
('708889f2-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/rscN8ZdL_r4', 'a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58', 0),
('70888b46-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/vfanNM5NtuQ', 'a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58', 0),
('70888c90-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/Pvck4ScQH9E', 'a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58', 0),

('a0f2a9a6-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/sgNc8aY6Z7E', '9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c', 1),
('a0f2ae9c-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/mw6Onwg4frY', '9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c', 0),
('a0f2afd2-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/5m1BDvDbjZY', '9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c', 0),
('a0f2b0fe-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/cqFKhqv6Ong', '9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c', 0),

('c65bb9f8-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/8Syeat16I-g', 'efd82d85-8dd6-4979-bf5c-96933d9c2f7d', 1),
('c65bc984-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/_8S9nEmCZK0', 'efd82d85-8dd6-4979-bf5c-96933d9c2f7d', 0),
('c65bd136-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/NEv65ZXjuLg', 'efd82d85-8dd6-4979-bf5c-96933d9c2f7d', 0),
('c65bd316-e45b-11ed-b5ea-0242ac120002', 'https://unsplash.com/photos/Ayx2M0iiVFQ', 'efd82d85-8dd6-4979-bf5c-96933d9c2f7d', 0)


SELECT COUNT(DISTINCT p.product_id) AS num_products
FROM products p
INNER JOIN images i ON p.product_id = i.product_id;

SELECT DISTINCT p.title, p.price FROM products p
INNER JOIN images ON p.product_id = images.product_id;

CREATE TABLE comments(
comment_id VARCHAR(36) NOT NULL,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
body VARCHAR(255) NOT NULL,
product_id VARCHAR(36) NOT NULL,
PRIMARY KEY (comment_id),
FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO comments (comment_id, name, email, body, product_id) VALUES
(
 "dc698fee-e47b-11ed-b5ea-0242ac120002",
 "id labore ex et quam laborum",
 "Eliseo@gardner.biz",
 "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
 "5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c"
),
(
 "dc699412-e47b-11ed-b5ea-0242ac120002",
 "quo vero reiciendis velit similique earum",
 "Jayne_Kuhic@sydney.com",
 "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
 "5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c"
),
(
 "dc69b7b2-e47b-11ed-b5ea-0242ac120002",
 "eaque et deleniti atque tenetur ut quo ut",
 "Carmen_Keeling@caroline.name",
 "voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis",
 "a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58"
);

SELECT p.title AS product_title, COUNT(c.comment_id) AS comments_count
FROM products p
LEFT JOIN comments c ON p.product_id = c.product_id
GROUP BY p.title
HAVING COUNT(c.comment_id) > 0;