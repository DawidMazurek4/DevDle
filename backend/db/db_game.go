package db

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/DawidMazurek4/DevDle/models"
)

func GetAllLanguages() ([]string, error) {
	rows, err := DB.Query("SELECT name FROM languages")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var languages []string
	for rows.Next() {
		var language string
		if err := rows.Scan(&language); err != nil {
			return nil, err
		}
		languages = append(languages, language)
	}
	return languages, nil
}

func GetLanguageIDByGameID(gameID int) (int, string, error) {
	var languageID int
	var sessionKey string
	err := DB.QueryRow("SELECT language_id, session_key FROM games WHERE id = $1", gameID).Scan(&languageID, &sessionKey)
	return languageID, sessionKey, err
}

func FinishGame(gameID int) error {
	_, err := DB.Exec("UPDATE games SET is_finished = true WHERE id = $1", gameID)
	return err
}

func NewGame() (int, string, error) {
	// Generate random game ID between 100000 and 999999, ensure uniqueness
	rand.Seed(time.Now().UnixNano())

	var gameID int
	var sessionKey string
	var err error

	// Try up to 10 times to find a unique ID
	for attempts := 0; attempts < 10; attempts++ {
		gameID = rand.Intn(900000) + 100000

		// Check if ID already exists
		var exists bool
		checkErr := DB.QueryRow("SELECT EXISTS(SELECT 1 FROM games WHERE id = $1)", gameID).Scan(&exists)
		if checkErr != nil {
			return -1, "", checkErr
		}

		if !exists {
			// ID is free, try to insert
			err = DB.QueryRow("INSERT INTO games (id, language_id, session_key) SELECT $1, id, md5(random()::text) FROM languages ORDER BY RANDOM() LIMIT 1 RETURNING session_key;", gameID).Scan(&sessionKey)
			if err == nil {
				// Success!
				return gameID, sessionKey, nil
			}
			// If insert failed for other reasons, continue trying
		}
	}

	return -1, "", fmt.Errorf("failed to generate unique game ID after 10 attempts")
}

func GetLanguageByName(languageName string) (models.Language, error) {
	var language models.Language
	err := DB.QueryRow(
		"SELECT id, year, name, typing, paradigm, main_usage, execution_type, language_level FROM languages WHERE name = $1",
		languageName,
	).Scan(
		&language.Id,
		&language.Year,
		&language.Name,
		&language.Typing,
		&language.Paradigm,
		&language.MainUsage,
		&language.ExecutionType,
		&language.LanguageLevel,
	)
	return language, err
}

func GetLanguageByID(id int) (models.Language, error) {
	var language models.Language
	err := DB.QueryRow(
		"SELECT id, year, name, typing, paradigm, main_usage, execution_type, language_level FROM languages WHERE id = $1",
		id,
	).Scan(
		&language.Id,
		&language.Year,
		&language.Name,
		&language.Typing,
		&language.Paradigm,
		&language.MainUsage,
		&language.ExecutionType,
		&language.LanguageLevel,
	)
	return language, err
}

func GetLanguageByGameID(gameID int) (string, models.Language, error) {
	languageID, sessionKey, err := GetLanguageIDByGameID(gameID)
	if err != nil {
		return "", models.Language{}, err
	}
	lang, err := GetLanguageByID(languageID)
	return sessionKey, lang, err
}
