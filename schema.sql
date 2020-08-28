BEGIN;

CREATE TABLE "Categories" (
  "ID" int   UNIQUE NOT NULL,
  "Display" varchar (64)   NOT NULL,
  "URL" varchar (256)   NOT NULL,
  "Image" varchar (256)   NOT NULL,
  CONSTRAINT "pk_Categories" PRIMARY KEY (
      "ID"
   )
);

CREATE TABLE "Products" (
  "PID" int  UNIQUE NOT NULL,
  "Category" varchar (64)   NOT NULL,
  "Description" varchar (256)   NOT NULL,
  "DescriptionLarge" varchar (512) NOT NULL,
  "Display" varchar (64)   NOT NULL,
  "Price" int   NOT NULL,
  "Image_One" varchar (256)   NOT NULL,
  "Image_Two" varchar (256)   NOT NULL,
  "Image_Three" varchar (256)   NOT NULL,
  "Image_Four" varchar (256)   NOT NULL,
  "Stock" int   NOT NULL,
  CONSTRAINT "pk_Products" PRIMARY KEY (
      "PID"
   )
);

CREATE TABLE "Users" (
  "UID" int   UNIQUE NOT NULL,
  "UName" varchar (32)   NOT NULL,
  "PassHash" varchar (256)   NOT NULL,
  "Admin" boolean   NOT NULL,
  CONSTRAINT "pk_Users" PRIMARY KEY (
      "UID"
   )
);

CREATE TABLE "Orders" (
  "Ref" int   UNIQUE NOT NULL,
  "PinPay" varchar (256) NOT NULL,
  "PID" integer ARRAY   NOT NULL,
  "Address" varchar (256)   NOT NULL,
  "Email" varchar (64)   NOT NULL,
  "Phone" int   NOT NULL,
  "Comment" varchar (256)   NOT NULL,
  "Date" timestamp   NOT NULL,
  "FName" varchar (32)   NOT NULL,
  "LName" varchar (32)   NOT NULL,
  "Bumped" boolean   NOT NULL,
  CONSTRAINT "pk_Orders" PRIMARY KEY (
      "Ref"
   )
);

CREATE TABLE "Changes" (
  "ID" int   UNIQUE NOT NULL,
  "User" int   NOT NULL,
  "Action" varchar (256)   NOT NULL,
  "Date" timestamp   NOT NULL,
  CONSTRAINT "pk_Changes" PRIMARY KEY (
      "ID"
   )
);

COMMIT;