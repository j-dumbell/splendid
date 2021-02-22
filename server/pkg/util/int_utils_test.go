package util

import (
	"testing"
)

func TestMinInt(t *testing.T) {
	actual := MinInt(3, 2, 1)
	expected := 1
	if MinInt(3, 2, 1) != expected {
		t.Fatalf("input=3,2,1 \nActual=%v \nExpected=%v", actual, expected)
	}
}
