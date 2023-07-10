# JustStreamIt


## Description:
Project 6 of OpenClassrooms Path: Developer Python - JustStreamIt -- create a website with HTML, CSS, Vanilla JavaScript with an API, including a carousel

The website is a Netflix inspired web application, with navigation, an image carousel and modal window shown details fetched by an API.

The navigation has the logo and a link to all categories. The first section display the best rated movie of the API. The second section are the seven best rated movies. And the next sections displays seven movies of categories of my choice. The details of each movie is on a modal window. 


## Create a folder for the project and the API:
open terminal
1. `mkdir project_folder`
2. `cd project_folder`

### Installation of the API:
open terminal and navigate to project_folder
1. `git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git`
2. `cd OCMovies-API-EN-FR`
3. `python -m venv venv`
4. `. venv/bin/activate` (on MacOS/Linux) `venv\Scripts\activate` (on Windows)
5. `pip install -r requirements.txt`
6. `python manage.py create_db`
7. `python3 manage.py runserver`

access the API with http://localhost:8000/api/v1/titles/

### Installation of the project:
open termial and navigate to project_folder
1. `git clone https://github.com/DoriDoro/JustStreamIt.git`
2. `cd JustStreamIt`
3. open the `index.html` file to display the website

### Open the website
Once all the installation is done and the API is working. You can navigate to the index.html file inside the JustStreamIt project. And open the file in your browser. 
I have developed this website on Mozilla Firefox Version 113.0.2 on Linux environment. 


## Visualisation of the project:
![home page](/image_Readme/Homepage.png)
a modal view: <br>
![modal](/image_Readme/Modal.png)
the carousel: <br>
![carousel](/image_Readme/Carousel.png)
