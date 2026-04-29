package service

import (
	"log"

	"github.com/DawidMazurek4/DevDle/db"
	"github.com/DawidMazurek4/DevDle/models"
)

func NewGame() (int, error) {
	return db.NewGame()
}
func GetAllLanguages() ([]models.Language, error) {
	return db.GetAllLanguages()
}
func CompareLanguage(languageName string, gameID int) (models.Language, models.LanguageResult, error) {

	userLanguage, err := db.GetLanguageByName(languageName)
	if err != nil {
		return models.Language{}, models.LanguageResult{}, err
	}

	correctLanguage, err := db.GetLanguageByGameID(gameID)
	if err != nil {
		return models.Language{}, models.LanguageResult{}, err
	}

	result := models.LanguageResult{}

	// win condition
	log.Printf("Comparing user language ID: %d with correct language ID: %d", userLanguage.Id, correctLanguage.Id)
	if userLanguage.Id == correctLanguage.Id {
		_ = db.FinishGame(gameID)

		result := models.LanguageResult{
			Year:          1,
			Typing:        1,
			Paradigm:      1,
			MainUsage:     1,
			ExecutionType: 1,
			LanguageLevel: 1,
		}

		return userLanguage, result, nil
	}

	// year comparison
	if userLanguage.Year == correctLanguage.Year {
		result.Year = 1
	} else if userLanguage.Year < correctLanguage.Year {
		result.Year = -1
	} else {
		result.Year = 0
	}

	// typing
	if userLanguage.Typing == correctLanguage.Typing {
		result.Typing = 1
	} else {
		result.Typing = 0
	}

	// paradigm
	log.Printf("User language paradigm: %s, Correct language paradigm: %s", userLanguage.Paradigm, correctLanguage.Paradigm)
	if userLanguage.Paradigm == correctLanguage.Paradigm {
		result.Paradigm = 1
	} else {
		result.Paradigm = 0
	}

	// main usage
	if userLanguage.MainUsage == correctLanguage.MainUsage {
		result.MainUsage = 1
	} else {
		result.MainUsage = 0
	}

	// execution type
	if userLanguage.ExecutionType == correctLanguage.ExecutionType {
		result.ExecutionType = 1
	} else {
		result.ExecutionType = 0
	}

	// language level
	if userLanguage.LanguageLevel == correctLanguage.LanguageLevel {
		result.LanguageLevel = 1
	} else {
		result.LanguageLevel = 0
	}

	return userLanguage, result, nil
}
