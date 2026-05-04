package handlers

import (
	"net/http"
	"strings"

	"github.com/DawidMazurek4/DevDle/models"
	"github.com/DawidMazurek4/DevDle/service"
	"github.com/gin-gonic/gin"
)

func CompareLanguage(c *gin.Context) {
	var body struct {
		Language   string `json:"language"`
		GameID     int    `json:"game_id"`
		SessionKey string `json:"session_key"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}
	if body.Language == "" || body.GameID == 0 || body.SessionKey == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload empty fields"})
		return
	}
	body.Language = strings.ToLower(body.Language)

	user, gameResult, err := service.CompareLanguage(body.Language, body.GameID, body.SessionKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, models.GameResponse{
		Language: user,
		Result:   gameResult,
	})
}

func GetAllLanguages(c *gin.Context) {
	languages, err := service.GetAllLanguages()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve languages"})
		return
	}
	c.JSON(http.StatusOK, languages)

}
func NewGame(c *gin.Context) {
	gameID, sessionKey, err := service.NewGame()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create a new game"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"game_id": gameID, "session_key": sessionKey})
}
