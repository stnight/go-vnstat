package main

// structure for vnstat result
type Date struct {
	Year  int `json:"year"`
	Month int `json:"month"`
	Day   int `json:"day"`
}

type Time struct {
	Hour    int `json:"hour"`
	Minutes int `json:"minutes"`
}

type Created struct {
	DateObj Date `json:"date"`
}

type Updated struct {
	DateObj Date `json:"date"`
	TimeObj Time `json:"time"`
}

type Total struct {
	RX int `json:"rx"`
	TX int `json:"tx"`
}

type Day struct {
	Id      int `json:"id"`
	DateObj Date `json:"date"`
	RX      int `json:"rx"`
	TX      int `json:"tx"`
}

type Month struct {
	Id      int `json:"id"`
	DateObj Date `json:"date"`
	RX      int `json:"rx"`
	TX      int `json:"tx"`
}

type Hour struct {
	Id      int `json:"id"`
	DateObj Date `json:"date"`
	RX      int `json:"rx"`
	TX      int `json:"tx"`
}

type Traffic struct {
	TotalObj  Total `json:"total"`
	DaysArr   []Day `json:"days"`
	MonthsArr []Month `json:"months"`
	HoursArr  []Hour `json:"hours"`
}

type Interfaces struct {
	Id         string `json:"id"`
	Nick       string `json:"nick"`
	CreatedObj Created `json:"created"`
	UpdatedObj Updated `json:"updated"`
	TrafficObj Traffic `json:"traffic"`
}

type VNResult struct {
	VNStatVersion string `json:"vnstatversion"`
	JSONVersion   string `json:"jsonversion"`
	InterfacesObj []Interfaces `json:"interfaces"`
}

// Structure for all network Interfaces
type NetInterface struct {
	Index int `json:"index"`
	MTU   int `json:"mtu"`
	Name  string `json:"name"`
}
