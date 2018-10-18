package main

import (
	"io"
	"log"
	"net/http"
)

//handle CORS
func apiHandler(w http.ResponseWriter, r *http.Request) {
	response, err := http.Get("http://www.json-generator.com/api/json/get/cfdlYqzrfS")
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
	}
	io.Copy(w, response.Body)
	response.Body.Close()
}

func main() {

	fs := http.FileServer(http.Dir("public"))
	http.Handle("/", fs)
	http.HandleFunc("/api", apiHandler)
	log.Println("Listening...")
	http.ListenAndServe(":3000", nil)
}
