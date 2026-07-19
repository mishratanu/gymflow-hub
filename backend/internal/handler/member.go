package handler

import (
	"errors"
	"net/http"
	"strconv"

	"imagine_backend/internal/dto"
	"imagine_backend/internal/services"

	"github.com/gin-gonic/gin"
)

// ListMembers handles GET /api/members
func ListMembers(c *gin.Context) {
	members, err := services.ListMembers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, members)
}

// CreateMember handles POST /api/members
func CreateMember(c *gin.Context) {
	var req dto.MemberRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	member, err := services.CreateMember(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, member)
}

// UpdateMember handles PUT /api/members/:id
func UpdateMember(c *gin.Context) {
	idStr := c.Param("id")
	id64, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid member id"})
		return
	}

	var req dto.MemberRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	member, err := services.UpdateMember(uint(id64), req)
	if err != nil {
		if errors.Is(err, services.ErrMemberNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, member)
}

// DeleteMember handles DELETE /api/members/:id
func DeleteMember(c *gin.Context) {
	idStr := c.Param("id")
	id64, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid member id"})
		return
	}
	if err := services.DeleteMember(uint(id64)); err != nil {
		if errors.Is(err, services.ErrMemberNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusNoContent, nil)
}
