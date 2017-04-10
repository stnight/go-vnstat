package main

import (
	"gopkg.in/gin-gonic/gin.v1"
	"net/http"
)

func main() {
	router := gin.Default()
	// Set statics
	router.Static("/assets", "./assets")
	// Load templates globally
	router.LoadHTMLGlob("templates/*")
	// Router
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Go VnStat",
		})
	})
	router.GET("/VNStat/:interface", func(c *gin.Context) {
		c.JSON(200, VN(c.Param("interface")))
	})
	router.GET("/AllInterfaces", func(c *gin.Context) {
		c.JSON(200, GetAllNetInterfaces())
	})
	// Listen and serve
	router.Run(":8000")
}