package db

import (
	"github.com/DawidMazurek4/DevDle/models"
)

func GetAllLanguages() ([]models.Language, error) {
	rows, err := DB.Query("SELECT name FROM languages")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var languages []models.Language
	for rows.Next() {
		var language models.Language
		if err := rows.Scan(&language.Name); err != nil {
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
	_, err := DB.Exec("UPDATE games SET finished = true WHERE id = $1", gameID)
	return err
}

func NewGame() (int, string, error) {
	var gameID int
	var sessionKey string
	err := DB.QueryRow("INSERT INTO games (language_id, session_key) SELECT id, md5(random()::text) FROM languages ORDER BY RANDOM() LIMIT 1 RETURNING id, session_key;").Scan(&gameID, &sessionKey)
	if err != nil {
		return -1, "", err
	}
	return gameID, sessionKey, nil
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
