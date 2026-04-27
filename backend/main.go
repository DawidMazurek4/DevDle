package main

import (
	"log"
	"os"

	"github.com/DawidMazurek4/DevDle/db"
	"github.com/DawidMazurek4/DevDle/router"

	_ "github.com/lib/pq"
)

func main() {
	frontendURL := os.Getenv("FRONTEND_URL")

	if frontendURL == "" {
		log.Fatal("FRONTEND_URL environment variable not set")
	}
	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("PORT environment variable not set")
	}

	db.Connect()
	r := router.SetupRouter(frontendURL)
	r.Run(":" + port)
}
