package handler

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"imagine_backend/internal/db"
)

func TestGetPricing_HappyPath(t *testing.T) {
	if db.DB == nil {
		t.Skip("database not available in test environment")
	}

	gin.SetMode(gin.TestMode)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request, _ = http.NewRequest(http.MethodGet, "/api/pricing", nil)

	GetPricing(c)

	if w.Code != http.StatusOK && w.Code != http.StatusInternalServerError {
		t.Fatalf("unexpected status code: %d", w.Code)
	}

	var body map[string]interface{}
	if err := json.Unmarshal(w.Body.Bytes(), &body); err != nil {
		t.Fatalf("response is not valid JSON: %v", err)
	}
}
