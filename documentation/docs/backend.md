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