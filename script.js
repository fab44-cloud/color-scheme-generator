function copyTextToClipboard(e) {
    let hexValueToCopy

    if (e.target.classList.contains("hex-footer")) {
        hexValueToCopy = e.target.textContent
    } else {
        hexValueToCopy = e.currentTarget.dataset.hex
    }

    navigator.clipboard.writeText(hexValueToCopy).then(() => {
        console.log(`Copied: ${hexValueToCopy}`)
    }).catch(err => {
        console.error("Could not copy text: ", err)
    })
}

function getColorScheme() {
    // Find the input and get its value
    const seedColor = document.getElementById("seedColorPicker").value

    // Remove the hashtag
    const seedColorWithoutHash = seedColor.substring(1)

    // Find the selector and get the value
    const modeSelector = document.getElementById("color-scheme-mode-selector").value.toLowerCase()

    // Build the URL
    const apiURL = `https://www.thecolorapi.com/scheme?hex=${seedColorWithoutHash}&mode=${modeSelector}`

    const colorSchemeContainer = document.querySelector(".color-scheme-container")
    colorSchemeContainer.innerHTML = ''

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            colorsArray = data.colors
            colorsArray.forEach((color) => {
                const hexValue = color.hex.value

                // Create a wrapper for the color block and the text
                const colorWrapper = document.createElement("div")
                colorWrapper.classList.add("color-wrapper")
                colorWrapper.dataset.hex = hexValue

                // Attach click listener to the wrapper
                colorWrapper.addEventListener("click", copyTextToClipboard)
                
                // Create the color block div
                const colorDiv = document.createElement("div")
                colorDiv.style.backgroundColor = hexValue
                colorDiv.style.height = "550px"
                colorDiv.style.width = "110px"

                // Create a text element for the hex number
                const hexText = document.createElement("p")
                hexText.textContent = hexValue
                hexText.classList.add("hex-footer")

                //Append both elements into the wrapper
                colorWrapper.appendChild(colorDiv)
                colorWrapper.appendChild(hexText)

                colorSchemeContainer.appendChild(colorWrapper)
            })
        })
        .catch(error => {
            console.error("Error fetching the color scheme:", error)
            alert("Failed to fetch color scheme. Check your internet connection or the console for details.")
        })
}


const colorBtn = document.querySelector(".color-btn")
colorBtn.addEventListener("click", getColorScheme)