package handler

import (
	"net/http"

	"imagine_backend/internal/apperror"
	"imagine_backend/internal/services"

	"github.com/gin-gonic/gin"
)

func GetTestimonials(c *gin.Context) {
	response, err := services.GetTestimonials()
	if err != nil {
		apperror.InternalServerError.SendError(c)
		return
	}
	c.JSON(http.StatusOK, response)
}
