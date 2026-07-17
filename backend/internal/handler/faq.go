package handler

import (
	"net/http"

	"imagine_backend/internal/apperror"
	"imagine_backend/internal/services"

	"github.com/gin-gonic/gin"
)

func GetFAQs(c *gin.Context) {
	response, err := services.GetFAQs()
	if err != nil {
		apperror.InternalServerError.SendError(c)
		return
	}
	c.JSON(http.StatusOK, response)
}
