Liam Moynihan
Wellframe Sample API

Instalation:
1. This API is written in node.js that can be downloaded from https://nodejs.org/en/download/
2. With node.js installed, navigate to the api directory
3. Run the command "npm install"
4. Run the command "node index"
5. The API can now be accessed at port 3000

Design:
A Medication is defined as:
{
	id: Int,
	brand: String,
	description: String
}

A Patient is defined as:
{
	id: Int,
	full_name: String,
	insurance: String,
	medications: List-of Medication
}

Routes:
GET 	api/v1/medications
POST	api/v1/medications
GET 	api/v1/medications/:id
DELETE	api/v1/medications/:id

GET	api/v1/patients
POST	api/v1/patients
GET	api/v1/patients/:id
DELETE	api/v1/patients/:id
POST	api/v1/patients/:id/medicine
DELETE	api/v1/patients/:id/medicine/:med_id