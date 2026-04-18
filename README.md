# ToDo List Fullstack Project 📝

A clean, modern, and fully functional Task Management application. Built with a decoupled architecture using a **C# ASP.NET Core Web API** backend and a **React** frontend.

## ✨ Key Features
- **Complete CRUD Operations:** Create, Read, Update, and Delete tasks.
- **Real-time Updates:** UI stays in sync with the database after every action.
- **Database Persistence:** Uses MySQL to store tasks reliably.
- **Modern UI:** Responsive design with a polished card-based interface.
- **API Documentation:** Integrated Swagger for easy testing of backend endpoints.

## 🛠️ Tech Stack

### Backend (Server)
- **Framework:** .NET 8.0 (Minimal APIs)
- **ORM:** Entity Framework Core
- **Database:** MySQL (via Pomelo.EntityFrameworkCore.MySql)
- **Features:** Swagger UI, CORS integration.

### Frontend (Client)
- **Library:** React.js
- **HTTP Client:** Axios with Interceptors (for global error handling)
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Styling:** Custom CSS3.

## 📁 Project Structure
- `/Server`: Contains the C# Web API project.
- `/Client`: Contains the React application.
- `MyProject.sln`: Visual Studio solution file.

## 🚀 Getting Started

### Prerequisites
- .NET 8.0 SDK
- Node.js & npm
- MySQL Server

### Backend Setup
1. Navigate to the `Server` folder.
2. Update the connection string in `appsettings.json`:
```csharp
"ConnectionStrings": { 
    "ToDoDB": "server=localhost;database=todo_db;user=root;password=your_password" 
}
Run the project:

```
dotnet run
Access Swagger UI at: http://localhost:5000
Frontend Setup
Navigate to the Client folder.

Install dependencies:

```
npm install
Start the application:

```
npm start
The app will open at: http://localhost:3000

Developed with ❤️ by Rut 💻
