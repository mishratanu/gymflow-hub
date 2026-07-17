package handler

import (
	"net/http"

	"imagine_backend/internal/apperror"
	"imagine_backend/internal/services"

	"github.com/gin-gonic/gin"
)

func GetPricing(c *gin.Context) {
	response, err := services.GetPricingPlans()
	if err != nil {
		apperror.InternalServerError.SendError(c)
		return
	}
	c.JSON(http.StatusOK, response)
}
