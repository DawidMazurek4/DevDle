package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/DawidMazurek4/DevDle/handlers"
)

func SetupRouter(frontendURL string) *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{frontendURL},
		AllowMethods: []string{"GET", "POST"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))
	r.POST("/guess", handlers.CompareLanguage)
	r.GET("/game", handlers.NewGame)
	return r
}
