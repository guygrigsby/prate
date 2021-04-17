package prate

import "context"

type Response struct {
	Text string
}

func Process(ctx context.Context, msg string) (*Response, error) {
	r := Response{"testing"}
	return &r, nil
}
