package models

type GameResponse struct {
	Language Language       `json:"language"`
	Result   LanguageResult `json:"result"`
}

type Language struct {
	Id            int    `json:"id"`
	Year          int    `json:"year"`
	Name          string `json:"name"`
	Typing        string `json:"typing"`
	Paradigm      string `json:"paradigm"`
	MainUsage     string `json:"mainUsage"`
	ExecutionType string `json:"executionType"`
	LanguageLevel string `json:"languageLevel"`
}
type LanguageResult struct {
	Year          int `json:"year"`
	Typing        int `json:"typing"`
	Paradigm      int `json:"paradigm"`
	MainUsage     int `json:"mainUsage"`
	ExecutionType int `json:"executionType"`
	LanguageLevel int `json:"languageLevel"`
}
