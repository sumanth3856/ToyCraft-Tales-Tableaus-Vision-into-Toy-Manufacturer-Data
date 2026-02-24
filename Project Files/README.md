# 💻 Project Files

This folder contains the complete source code for the interactive web frontend of the **ToyCraft Tales** application.

## Architecture

The application is built to serve user-friendly Tableau insights using the following tech stack:

- **Flask Engine (`app.py`)**: The lightweight Python backend driving the routing and serving static files.
- **Frontend Templates (`templates/`)**: HTML files (like the dashboard view, about page, and story) utilizing a modular base structure (`base.html`).
- **Static Assets (`static/`)**: Centralized repository for all CSS styling, client-side JavaScript, and images.

## Deployment Setup

- **`vercel.json`**: This project is configured to deploy seamlessly to Vercel, allowing for high availability and performant global hosting.
- **`requirements.txt`**: Declares all the Python dependencies necessary to run the Flask application securely via WSGI.

## Getting Started

To launch the web application locally:

```bash
# Ensure you are within the "Project Files" directory
python -m venv venv
source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
pip install -r requirements.txt

# Start the application
python app.py
```
