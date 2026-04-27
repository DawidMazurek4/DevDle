package models

type Language struct {
	id int `json:"id"`
	year int `json:"year"`
	typing string `json:"typing"`
	paradigm string `json:"paradigm"`
	mainUsage string `json:"mainUsage"`
	executionType string `json:"executionType"`
	languageLevel string `json:"languageLevel"`
}
