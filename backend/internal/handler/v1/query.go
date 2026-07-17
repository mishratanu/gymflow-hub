package v1

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type queryRequest struct {
	Message   string    `json:"message"`
	KBID      string    `json:"kb_id"`
	SessionID string    `json:"session_id"`
	History   []Message `json:"history"`
}

func Query(c *gin.Context) {
	c.JSON(http.StatusServiceUnavailable, gin.H{"error": "RAG not configured"})
}
