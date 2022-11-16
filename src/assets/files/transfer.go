package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

func checkErr(err error){
	if err != nil {
        fmt.Println(err.Error())
		return
    }
}
type Station struct{
	CountryCode string 
	Latitude float64 
	Longitude float64
	PassengerTraffic bool
	StationName string
	StationShortCode string
	StationUICCode float64
	StationType string `json:"type"`
 }
func main() {
	filepath :="src/assets/files/raw.json"
	file,err := os.OpenFile(filepath,os.O_RDONLY, 0600)
	defer file.Close()
	data, err := ioutil.ReadAll(file)
	checkErr(err)
	var stations []Station
	json.Unmarshal(data, &stations)
	// fmt.Println(stations)
	newStations := make(map[string]string, 0)
	for _, station := range stations {
		newStations[station.StationName] = station.StationShortCode 
	}
	json_data, _ := json.Marshal(newStations)
	// fmt.Println(json_data)
	newfilepath := "src/assets/files/cities.json"
	fileobj, err := os.OpenFile(newfilepath, os.O_WRONLY, 0600)
	defer fileobj.Close()
	checkErr(err)
	_, err = fileobj.Write(json_data)
	checkErr(err)
}