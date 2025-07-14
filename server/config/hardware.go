package config

import (
	"os"
	"strings"

	log "github.com/sirupsen/logrus"
)

type HWVersion int

const (
	HWVersionAlpha HWVersion = iota
	HWVersionPro
	HWVersionBeta
	HWVersionPcie
	HWVersionATX

	HWVersionFile = "/etc/kvm/hw"
)

var HWAlpha = Hardware{
	Version:      HWVersionAlpha,
	GPIOReset:    "/sys/class/gpio/gpio507/value",
	GPIOPower:    "/sys/class/gpio/gpio503/value",
	GPIOPowerLED: "/sys/class/gpio/gpio504/value",
	GPIOHDDLed:   "/sys/class/gpio/gpio505/value",
}

var HWBeta = Hardware{
	Version:      HWVersionBeta,
	GPIOReset:    "/sys/class/gpio/gpio505/value",
	GPIOPower:    "/sys/class/gpio/gpio503/value",
	GPIOPowerLED: "/sys/class/gpio/gpio504/value",
	GPIOHDDLed:   "",
}

var HWPcie = Hardware{
	Version:      HWVersionPcie,
	GPIOReset:    "/sys/class/gpio/gpio505/value",
	GPIOPower:    "/sys/class/gpio/gpio503/value",
	GPIOPowerLED: "/sys/class/gpio/gpio504/value",
	GPIOHDDLed:   "",
}

var HWPro = Hardware{
	Version:      HWVersionPro,
	GPIOReset:    "/sys/class/gpio/gpio35/value",
	GPIOPower:    "/sys/class/gpio/gpio7/value",
	GPIOPowerLED: "/sys/class/gpio/gpio75/value",
	GPIOHDDLed:   "/sys/class/gpio/gpio74/value",
}

func (h HWVersion) String() string {
	switch h {
	case HWVersionAlpha:
		return "Alpha"
	case HWVersionBeta:
		return "Beta"
	case HWVersionPcie:
		return "PCIE"
	case HWVersionPro:
		return "Pro"
	default:
		return "Unknown"
	}
}

func GetHwVersion() HWVersion {
	content, err := os.ReadFile(HWVersionFile)
	if err != nil {
		return HWVersionAlpha
	}

	version := strings.ReplaceAll(string(content), "\n", "")
	switch version {
	case "alpha":
		return HWVersionAlpha
	case "beta":
		return HWVersionBeta
	case "pcie":
		return HWVersionPcie
	case "atx":
		return HWVersionATX
	case "pro":
		return HWVersionPro
	default:
		return HWVersionAlpha
	}
}

func getHardware() (h Hardware) {
	version := GetHwVersion()

	switch version {
	case HWVersionAlpha:
		h = HWAlpha

	case HWVersionBeta:
		h = HWBeta

	case HWVersionPcie:
		h = HWPcie

	case HWVersionPro:
		h = HWPro

	default:
		h = HWAlpha
		log.Errorf("Unsupported hardware version: %s", version)
	}
	return h
}
