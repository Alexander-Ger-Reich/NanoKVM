package hid

func (h *Hid) Keyboard(queue <-chan []int) {
	for event := range queue {
		h.kbMutex.Lock()
		h.writeKeyboard(event)
		h.kbMutex.Unlock()
	}
}

func (h *Hid) writeKeyboard(event []int) {
	code := byte(event[0])

	var modifier byte = 0x00
	if code > 0 {
		modifier = byte(event[1]) | byte(event[2]) | byte(event[3]) | byte(event[4])
	}

	data := []byte{modifier, 0x00, code, 0x00, 0x00, 0x00, 0x00, 0x00}
	h.Write(h.g0, data)
}
