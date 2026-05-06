## DevDle API Documentation
This is the backend service for DevDle. It handles game creation, language lists, and the comparison logic for guesses.

### Base Endpoints
1. Start a New Game
**GET** `/game`

Used to initialize a session and get a unique ID for the current secret language.

*   **Success Response:** `200 OK`

*   **Payload:**

    ```JSON
    {
    "game_id": 123,
    "session_key": "b4a43b404e4bd0d1a7086ec1d8357447"
    }
    ```


---

2. Get All Languages
**GET** `/languages`

Returns a list of all available programming languages in the database (useful for search dropdowns/autocomplete).

*   **Success Response:** `200 OK`
*   **Payload:** `["Go", "Python", "Rust", ...]`

---

3. Submit a Guess
**POST** `/guess`

Compare a user's guess against the secret language of a specific game.

*   **Request Body:**
    ```json
    {
      "language": "JavaScript",
      "game_id": 123,
      "session_key": "b4a43b404e4bd0d1a7086ec1d8357447"
    }
    ```
*   **Success Response:** `200 OK`
*   **Payload:**
    ```json
    {
      "language": {
        "executionType": "Interpreted",
        "id": 3,
        "languageLevel": "High-level",
        "mainUsage": "Web Development",
        "name": "JavaScript",
        "paradigm": "Event-driven",
        "typing": "Dynamic",
        "year": 1995,
      },
      "result": {
        "executionType": 0,
        "languageLevel": 1,
        "mainUsage": 0,
        "paradigm": 0,
        "typing": 0,
        "year": -1
      }
    }
    ```
*   **Special fields:**
    *   `year`: -1 when year is too low, 0 when year is too big and 1 when it is equal
    *   `paradigm`: 0 when wrong 1 when correct 2 when partly correct
    *   `mainUsage`: 0 when wrong 1 when correct 2 when partly correct

*   **Error Responses:**
    *   `400 Bad Request`: Missing fields or invalid JSON.
    *   `500 Internal Server Error`: Database or comparison logic failure.

---

## Technical Details
*   **CORS:** Enabled for the frontend URL defined in environment variables.
*   **Methods Allowed:** `GET`, `POST`.

## Backend Flow

This section describes how the backend application initializes and how requests are processed throughout the system.

### 1. Application Startup

The application starts in `main.go`. During initialization:

* A database connection is established
* Application dependencies are initialized
* The HTTP router is configured and started

### 2. HTTP Layer

The `router.go` module is responsible for:

* Defining HTTP routes
* Listening for incoming requests
* Routing requests to the appropriate handlers

### 3. Request Handling

Handlers (e.g. `game_handler.go`) are responsible for:

* Validating incoming requests
* Parsing request data
* Delegating execution to the service layer
* Returning JSON responses

### 4. Service Layer

The `game_service.go` module contains the core business logic:

* Implements game rules and logic
* Coordinates application behavior
* Acts as an intermediary between handlers and the data layer

### 5. Data Access Layer

The `db_game.go` module handles:

* Executing database queries
* Persisting and retrieving data
* Mapping database results to application models

### Summary Flow

`main.go` → `router.go` → `game_handler.go` → `game_service.go` → `db_game.go` → database
