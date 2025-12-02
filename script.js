// Use fetch to get the data
function getColorScheme() {
    // Find the input and get its value
    const seedColor = document.getElementById("seedColorPicker").value

    // Remove the hashtag
    const seedColorWithoutHash = seedColor.substring(1)

    // Find the selector and get the value
    const modeSelector = document.getElementById("color-scheme-mode-selector").value.toLowerCase()

    // Build the URL
    const apiURL = `https://www.thecolorapi.com/scheme?hex=${seedColorWithoutHash}&mode=${modeSelector}`
    console.log(apiURL)

    const colorSchemeContainer = document.querySelector(".color-scheme-container")
    colorSchemeContainer.innerHTML = ''

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            colorsArray = data.colors
            console.log(colorsArray)
            colorsArray.forEach((color) => {
                console.log("Hex value:", color.hex.value)
            
            const colorDiv = document.createElement("div")
            colorDiv.style.backgroundColor = color.hex.value
            colorDiv.style.height = "550px"
            colorDiv.style.width = "110px"
            colorSchemeContainer.appendChild(colorDiv)
            })
        })
        .catch(error => {
            console.error("Error fetching the color scheme:", error)
            alert("Failed to fetch color scheme. Check your internet connection or the console for details.")
        })
}


const colorBtn = document.querySelector(".color-btn")
colorBtn.addEventListener("click", getColorScheme)