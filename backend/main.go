package main

import (
	"database/sql"
	"log"
	"os"
	"db/db_connection"
	"router/router"
	_ "github.com/lib/pq"
)

func main() {
	frontendURL := os.Getenv("FRONTEND_URL")

	if frontendURL == "" {
		log.Fatal("FRONTEND_URL environment variable not set")
		frontendURL = "http://localhost:3000"
	}
	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("PORT environment variable not set")
		port = "8080"
	}
	
	db_connection.Connect()
	r := router.SetupRouter(frontendURL)
}