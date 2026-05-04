package service

import (
	"fmt"
	"strings"

	"github.com/DawidMazurek4/DevDle/db"
	"github.com/DawidMazurek4/DevDle/models"
)

func NewGame() (int, string, error) {
	return db.NewGame()
}
func GetAllLanguages() ([]string, error) {
	return db.GetAllLanguages()
}
func CompareLanguage(languageName string, gameID int, sessionKey string) (models.Language, models.LanguageResult, error) {

	userLanguage, err := db.GetLanguageByName(languageName)
	if err != nil {
		return models.Language{}, models.LanguageResult{}, err
	}

	correct_sessionKey, correctLanguage, err := db.GetLanguageByGameID(gameID)
	if err != nil {
		return models.Language{}, models.LanguageResult{}, err
	}

	if sessionKey != correct_sessionKey {
		return models.Language{}, models.LanguageResult{}, fmt.Errorf("invalid session key")
	}

	user_main_usage_list := strings.Split(userLanguage.MainUsage, "/")
	correct_main_usage_list := strings.Split(correctLanguage.MainUsage, "/")

	user_paradigm_list := strings.Split(userLanguage.Paradigm, "/")
	correct_paradigm_list := strings.Split(correctLanguage.Paradigm, "/")
	result := models.LanguageResult{}

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
	if userLanguage.Paradigm == correctLanguage.Paradigm {
		result.Paradigm = 1
	} else {
		result.Paradigm = 0
		for _, paradigm := range user_paradigm_list {
			for _, correct_paradigm := range correct_paradigm_list {
				if paradigm == correct_paradigm {
					result.Paradigm = 2
					break
				}
			}
		}
	}

	// main usage
	if userLanguage.MainUsage == correctLanguage.MainUsage {
		result.MainUsage = 1
	} else {
		result.MainUsage = 0
		for _, usage := range user_main_usage_list {
			for _, correct_usage := range correct_main_usage_list {
				if usage == correct_usage {
					result.MainUsage = 2
					break
				}
			}
		}
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
